import { useRive } from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minDuration?: number;
}

const LoadingScreen = ({ onLoadingComplete, minDuration = 2500 }: LoadingScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  const { RiveComponent } = useRive({
    src: 'https://public.rive.app/community/runtime-files/4770-9445-animated-icon-loading.riv',
    autoplay: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onLoadingComplete, 500);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [onLoadingComplete, minDuration]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-flutter-dark-blue transition-opacity duration-500 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-64 h-64 md:w-80 md:h-80">
        <RiveComponent />
      </div>
      
      <div className="mt-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-flutter-blue via-flutter-light-blue to-flutter-teal bg-clip-text text-transparent">
          Zyad Wael
        </h2>
        <p className="mt-2 text-gray-400 text-sm md:text-base">Flutter Developer</p>
      </div>

      <div className="mt-8 flex space-x-2">
        <div className="w-2 h-2 bg-flutter-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-flutter-light-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-flutter-teal rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
};

export default LoadingScreen;
