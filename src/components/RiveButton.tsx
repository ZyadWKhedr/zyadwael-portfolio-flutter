import { useRive } from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface RiveButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  riveSrc?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const RiveButton = ({ 
  children, 
  onClick, 
  className = '',
  riveSrc = 'https://public.rive.app/community/runtime-files/2244-4463-animated-send-button.riv',
  disabled = false,
  type = 'button'
}: RiveButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const { rive, RiveComponent } = useRive({
    src: riveSrc,
    autoplay: false,
  });

  useEffect(() => {
    if (rive) {
      if (isHovered) {
        rive.play();
      } else {
        rive.reset();
        rive.pause();
      }
    }
  }, [isHovered, rive]);

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity">
        <RiveComponent />
      </div>
      <span className="relative z-10 flex items-center">{children}</span>
    </Button>
  );
};

export default RiveButton;
