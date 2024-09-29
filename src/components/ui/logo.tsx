import * as React from 'react';
import AILogo from "@/assets/AILOGO.svg";

interface LogoProps {
  src?: string | React.ComponentType;
  alt?: string;
  width?: string;
  height?: string;
  text?: string;
}

const Logo: React.FC<LogoProps> = ({ src = AILogo, alt = '', width = '8', height = '8', text = '' }) => {
  const imgSrc = typeof src === 'string' ? src : AILogo;

  return (
    <div className='flex gap-2 items-center'>
      <img src={imgSrc} alt={alt} className={`w-${width} h-${height}`} />
      <p className='text-lg font-medium'>{text}</p>
    </div>
  );
};

export default Logo;