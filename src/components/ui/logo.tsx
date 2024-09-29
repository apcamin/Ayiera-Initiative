import * as React from 'react';
import AILogo from "@/assets/AILOGO.svg";

interface LogoProps {
  alt?: string;
  width?: string;
  height?: string;
  text?: string;
}

const Logo: React.FC<LogoProps> = ({ alt = '', width = '8', height = '8', text= '' }) => {
  return (
    <div className='flex gap-2 items-center'>
      <img src={AILogo} alt={alt} className={`w-${width} h-${height}`} />
      <p className='text-lg font-medium'>{text}</p>
    </div>
  );
};

export default Logo;