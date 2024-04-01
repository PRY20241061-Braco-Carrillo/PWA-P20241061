// categoryButtonStyles.ts

import { cva, type VariantProps } from "class-variance-authority";

const categoryButtonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-lg transition-colors", 
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50",
    "p-8", // Aumentamos el padding para hacerlo más grande.
    "min-w-[250px] min-h-[150px]", // Dimensiones mínimas para que parezca una tarjeta.
    "md:min-w-[300px] md:min-h-[200px]", // Ajustes para vistas más grandes.
  ].join(' '),
  {
    variants: {
      iconPosition: {
        top: "flex-col space-y-4", // Espacio vertical entre el ícono y el texto.
        bottom: "flex-col-reverse space-y-4 space-y-reverse",
        right: "flex-row space-x-4", // Espacio horizontal entre el ícono y el texto.
        left: "flex-row-reverse space-x-4 space-x-reverse",
      },
    },
    defaultVariants: {
      iconPosition: "top", // Cambié la variante por defecto a 'top' para coincidir con tu diseño.
    },
  }
);

export type CategoryButtonVariantProps = VariantProps<typeof categoryButtonVariants>;
export { categoryButtonVariants };
