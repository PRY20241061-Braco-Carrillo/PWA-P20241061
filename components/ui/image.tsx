"use client";

import { translateSizeUnit } from "@/lib/utils.messages";
import { SizeInfo, TranslatableSize } from "@/src/constants/size_units.types";
import Image, { ImageProps, StaticImageData } from "next/image";
import React, { useState } from "react";
import { LabelType } from "../common/menu-card/types/menu-label.types";
import { Label } from "../common/menu-card/types/menu-card.types";


interface ImageWithFallbackProps extends ImageProps {
  fallbackSrc: string;
  imageLabels?: string[];
  imageLabelsAria?: string[];
  imageLabelsTypes?: LabelType[];
  primaryImageLabels?: Label[];
}
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackSrc,
  alt,
  className,
  priority = false,
  imageLabels,
  imageLabelsAria,
  imageLabelsTypes,
  primaryImageLabels,
  ...rest
}) => {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src as string);
  const handleError = () => setImgSrc(fallbackSrc);
  const imageClassName = `relative block w-full h-auto ${className} rounded-xl object-cover`;
  

  const renderLabel = (label: Label, index: number) => {
    const { type, value, priority } = label;
    let content = '', ariaLabel = '';
    const labelDescription = imageLabels ? imageLabels[index] : '';
    const ariaLabelDescription = imageLabelsAria ? imageLabelsAria[index] : '';
  
    if (type === "SIZE" && 'type' in value) {
      const sizeInfo: TranslatableSize = { type: value.type, info: value as SizeInfo };
      const translation = translateSizeUnit(sizeInfo);
      
      if (value.type === 'GRAMS' && 'weight' in value && 'unit' in value) {
        content = `${labelDescription} ${value.weight}${translation.abbreviation || ''}`;
      } else if (value.type === 'VOLUME' && 'volume' in value && 'unit' in value) {
        content = `${labelDescription} ${value.volume}${translation.abbreviation || ''}`;
      }
      ariaLabel = translation.ariaLabel || ariaLabelDescription;
      
    } else if (type === "DISCOUNT" && 'amount' in value && 'unit' in value) {
      content = `${labelDescription} ${value.amount}${value.unit}`;
      ariaLabel = ariaLabelDescription;
    }
  
    return (
      <span
        key={index}
        className={`text-xs mr-2 mb-2 p-1 rounded-lg ${type === "DISCOUNT" ? 'bg-red-500' : 'bg-blue-500'}`}
        aria-label={ariaLabel}
      >
        {content}
      </span>
    );
  };
  

  return (
    <div className="relative w-full h-0 pb-[56.25%]">
      <Image
        {...rest}
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        className={imageClassName}
        onError={handleError}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 flex flex-wrap">
        {primaryImageLabels?.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0)).map(renderLabel)}
      </div>
    </div>
  );
};

export default ImageWithFallback;