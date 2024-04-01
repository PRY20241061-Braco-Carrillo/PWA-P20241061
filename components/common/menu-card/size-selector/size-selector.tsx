import React from 'react';
import { SizeInfo } from '@/src/constants/size_units.types';
import { SizeDishesIcon } from '@/components/icons';

const IconPlaceholder = ({ size }: { size: string }) => (
  <SizeDishesIcon className={`${size} fill-current text-gray-500`} />
);

type DynamicSizeSelectorProps = {
  sizes: SizeInfo[];
};

const DynamicSizeSelector: React.FC<DynamicSizeSelectorProps> = ({ sizes }) => {
  const iconContainerHeight = 'h-12';

  const calculateIconSize = (value: number) => {
    const baseSize = 6;
    const scaleFactor = 0.5;
    const calculatedSize = baseSize + value * scaleFactor;
    return `h-${Math.min(Math.max(Math.round(calculatedSize), 6), 24)} w-${Math.min(Math.max(Math.round(calculatedSize), 6), 24)}`;
  };

  const getDescriptionAndSize = (size: SizeInfo) => {
    switch (size.type) {
      case 'PIECES':
        return { description: size.description, size: calculateIconSize(size.portion) };
      case 'GRAMS':
        return { description: `Weight: ${size.weight}${size.unit}`, size: calculateIconSize(size.weight / 100) };
      case 'VOLUME':
        return { description: `Volume: ${size.volume}${size.unit}`, size: calculateIconSize(size.volume / 10) };
      case 'DESCRIPTION':
        return { description: size.description, size: 'h-12 w-12' };
      default:
        return { description: '', size: 'h-6 w-6' };
    }
  };

  return (
    <div className="flex justify-center w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
        {sizes.map((size, index) => {
          const { description, size: iconSize } = getDescriptionAndSize(size);
          return (
            <div key={index} className="flex flex-col items-center justify-center px-3">
              <div className={`${iconContainerHeight} flex items-center justify-center`}>
                <IconPlaceholder size={iconSize} />
              </div>
              <div className="text-sm font-medium text-center">{description}</div>
              {size.type === 'PIECES' && <div className="text-xs">Piezas: {size.portion}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DynamicSizeSelector;
