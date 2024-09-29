import * as React from 'react';
import AILogo from "@/assets/AILOGO.svg";

interface LogoProps {
  src?: string | React.ComponentType;
  alt?: string;
  width?: string;
  height?: string;
  text?: string;
}

const Logo: React.FC<LogoProps> = ({ src = AILogo, alt = '', width = '', height = '', text = '' }) => {
  const imgSrc = typeof src === 'string' ? src : AILogo;

  return (
    <>
      {text !== "" ? (
        <div className="flex gap-2 items-center">
          <p className="text-sm font-medium">{text}</p>
          <img src={imgSrc} alt={alt} className={`w-${width} h-${height}`} />
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <img src={imgSrc} alt={alt} className={`w-${width} h-${height}`} />
        </div>
      )}
    </>
  );
};

export default Logo;