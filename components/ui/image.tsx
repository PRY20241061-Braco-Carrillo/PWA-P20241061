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
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src as string);
  const handleError = () => setImgSrc(fallbackSrc);

  return (
    <div className="relative w-full h-0 pb-[56.25%]"> {}
      <Image
        {...rest}
        src={imgSrc}
        alt={alt}
        layout="fill" 
        objectFit="cover" 
        className=" rounded-br-xl rounded-bl-xl rounded-tl-xl rounded-tr-xl"
        onError={handleError}
      />
    </div>
  );
};

export default ImageWithFallback;
