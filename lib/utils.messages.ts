import { TranslatableSize } from '@/src/constants/size_units.types';
import { useTranslations } from 'next-intl';


export function translateSizeUnit(size: TranslatableSize): { label: string; ariaLabel: string, abbreviation?: string } {
    const t = useTranslations();
    const sizePrefix = 'SizeUnit.';
    let labelKey =  sizePrefix + size.type + '.label';
    let ariaLabelKey = sizePrefix + size.type + '.ariaLabel' ;
    let abbreviation = '';
    if (size.info && size.info.type === 'GRAMS') {
        abbreviation = t(sizePrefix + size.info.unit + '.abbreviation');
    }
    else if (size.info && size.info.type === 'VOLUME') {
        abbreviation =  t(sizePrefix + size.info.unit + '.abbreviation');
    }
    else if (size.info && size.info.type === 'DESCRIPTION') {
        abbreviation = t(sizePrefix + size.info.description + '.abbreviation');
    }
    else if (size.info && size.info.type === 'PIECES') {
        abbreviation =  t(sizePrefix + size.info.description + '.abbreviation');
    }
    
    
    const label = t(labelKey);
    const ariaLabel = t(ariaLabelKey);
  
    return { label, ariaLabel, abbreviation };
}