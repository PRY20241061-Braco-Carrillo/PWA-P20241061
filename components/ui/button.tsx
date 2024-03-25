import { forwardRef}  from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  " inline-flex items-center justify-center  rounded-md text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: " px-4 py-2 mb-2 mt-2 bg-primary text-primary-foreground shadow-sm hover:bg-primaryHover hover:shadow-md",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondaryHover hover:shadow-md",
        ghost: "bg-ghost text-ghost-foreground shadow-sm hover:bg-ghostHover hover:shadow-md",
      },
      size: {
        default: "h-12 ",
        icon: "h-12 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
