import { useTheme } from 'next-themes';

export default function InlineSwitch() {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const handleToggle = () => {
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDarkMode}
      onClick={handleToggle}
      className={`${
        isDarkMode ? 'bg-[#D2532B]' : 'bg-slate-700'
      } relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#D2532B] focus:ring-offset-2`}
    >
      <span className="sr-only">Toggle dark mode</span>
      <span
        className={`${
          isDarkMode ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
}