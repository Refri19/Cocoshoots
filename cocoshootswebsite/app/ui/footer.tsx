export default function Footer() {
    return (
        <footer className="w-full bg-[#253939] text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} CocoShoots. All rights reserved.</p>
            </div>
        </footer>
    );
}
