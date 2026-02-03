import { useEffect } from 'react';
import { ChatLayout } from './features/chat/ChatLayout';
import { useContextResolver } from './hooks/useContextResolver';
import './index.css';

function App() {
  // Initialize context-aware routing
  const { contextId } = useContextResolver();

  // Dynamic Favicon Logic
  useEffect(() => {
    const updateFavicon = (e: MediaQueryListEvent | MediaQueryList) => {
      const isDark = e.matches;
      const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      if (favicon) {
        // Light Mode: Black Circle
        // Dark Mode: Black Half
        favicon.href = isDark
          ? '/brands/twin3-black-half.png'
          : '/brands/twin3-black-circle.png';
      }
    };

    const matcher = window.matchMedia('(prefers-color-scheme: dark)');
    updateFavicon(matcher); // Initial check

    matcher.addEventListener('change', updateFavicon);
    return () => matcher.removeEventListener('change', updateFavicon);
  }, []);

  return (
    <div className="h-screen w-full bg-[#0f111a] text-[#e6e8f0] overflow-hidden">
      <ChatLayout contextId={contextId} />
    </div>
  );
}

export default App;

