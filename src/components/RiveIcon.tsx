import { useRive } from '@rive-app/react-canvas';
import { useEffect, useState } from 'react';

interface RiveIconProps {
  src: string;
  className?: string;
  autoplay?: boolean;
  playOnHover?: boolean;
}

const RiveIcon = ({ src, className = 'w-16 h-16', autoplay = true, playOnHover = false }: RiveIconProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const { rive, RiveComponent } = useRive({
    src,
    autoplay: playOnHover ? false : autoplay,
  });

  useEffect(() => {
    if (playOnHover && rive) {
      if (isHovered) {
        rive.play();
      } else {
        rive.pause();
      }
    }
  }, [isHovered, rive, playOnHover]);

  return (
    <div 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <RiveComponent />
    </div>
  );
};

export default RiveIcon;
