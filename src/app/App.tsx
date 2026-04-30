import { useState, useEffect } from 'react';
import InteractiveHomeDesktop from './components/InteractiveHomeDesktop';
import InteractiveHomeMobile from './components/InteractiveHomeMobile';

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="size-full">
      {isMobile ? <InteractiveHomeMobile /> : <InteractiveHomeDesktop />}
    </div>
  );
}
