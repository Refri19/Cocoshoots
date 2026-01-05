import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function GET() {
  let browser;
  try {
    // 1. Launch with flags to help bypass basic detection
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled'],
    });

    const page = await browser.newPage();

    // 2. Pretend to be a real Chrome browser
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
    await page.setViewport({ width: 1280, height: 800 });

    const targetUrl = "https://www.facebook.com/profile.php?id=61580797117569";
    
    // 3. Go to page and wait for images to actually load
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    // 4. Robust Image Extraction Logic
    const imageUrl = await page.evaluate(() => {
      // Facebook usually puts post images in these role/aria attributes
      const postImages = Array.from(document.querySelectorAll('img'))
        .filter(img => {
          const src = img.src || "";
          // Filter for 'scontent' (FB CDN) and ignore small icons/profile pics
          return src.includes('scontent') && img.width > 300;
        })
        .map(img => img.src);

      return postImages[0] || null; // Return the first large post image found
    });

    await browser.close();

    if (!imageUrl) {
      return NextResponse.json({ error: "No post image found" }, { status: 404 });
    }

    return NextResponse.json({ imageUrl });

  } catch (error: any) {
    if (browser) await browser.close();
    console.error("Scraper Error:", error.message);
    return NextResponse.json({ error: "Failed to scrape Facebook", details: error.message }, { status: 500 });
  }
}