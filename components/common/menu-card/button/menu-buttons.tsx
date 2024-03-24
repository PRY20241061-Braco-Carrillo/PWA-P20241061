import React from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { buttonConfig } from './button-config';
import { ButtonsConfig, IconComponents } from './menu-button.types';
import { useTranslations } from 'next-intl';

interface MenuButtonProps {
    typeStyle: keyof ButtonsConfig;
}

const MenuButton: React.FC<MenuButtonProps> = ({ typeStyle }) => {
    const t = useTranslations('MenuCard');
    
    const label = t(`buttons.${typeStyle}.label`);
    const ariaLabel = t(`buttons.${typeStyle}.ariaLabel`);
    
    const config = buttonConfig[typeStyle];
    if (!config) {
        console.error(`No configuration found for button type: ${typeStyle}`);
        return null;
    }

    const Icon = config.icon ? IconComponents[config.icon as keyof typeof IconComponents] : null;

    return (
        <Button
          aria-label={ariaLabel}
          aria-pressed={config.ariaPressed}
          aria-expanded={config.ariaExpanded}
          disabled={config.disabled}
          variant={config.variant}
          className={buttonVariants({ variant: config.variant })}
        >
            {label}
          {Icon && <Icon className="ml-2 h-5 w-5" />}
        </Button>
    );
};

export default MenuButton;