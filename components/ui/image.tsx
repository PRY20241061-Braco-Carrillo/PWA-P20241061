"use client";

import React, { useState, useRef } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";

interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  className,
  priority = false,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src as string);
  const handleError = () => setImgSrc(fallbackSrc);
  const imageClassName = `relative block w-full h-auto ${className} rounded-br-xl rounded-bl-xl rounded-tl-xl rounded-tr-xl object-cover`;


  return (
    <div className="relative w-full h-0 pb-[56.25%]"> {}
      <Image
        {...rest}
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        className={imageClassName}
        onError={handleError}
      />
    </div>
  );
};

export default ImageWithFallback;
