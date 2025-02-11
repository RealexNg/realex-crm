import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cva, type VariantProps } from "class-variance-authority";

import { Loader, LoaderSizeTypes } from "./loader";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-white text-primary hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 sm:text-sm",
        sm: "h-9 px-4 text-sm sm:text-xs",
        xs: "h-8 px-3 text-sm sm:text-xs",
        lg: "h-11 rounded-md px-6  text-base",
        icon: "size-10",
        xl: "px-7 text-base h-12",
      },
      icon: {
        true: "aspect-square w-auto p-0",
        false: "",
      },
    },
    // compoundVariants: [
    //   {
    //     variant: 'default',
    //     size: 'sm',
    //     class: 'aspect-square p-2',
    //   },
    // ],
    defaultVariants: {
      variant: "default",
      size: "default",
      icon: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      asChild = false,
      isLoading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, icon, className }),
          isLoading && "pointer-events-none relative"
        )}
        ref={ref}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <>
            {/* trick to have exact button width when button is loading */}
            <span className="invisible opacity-0">{children}</span>
            <span
              className={cn(
                "absolute inset-0 flex h-full w-full items-center justify-center"
              )}
            >
              <Loader size={size as LoaderSizeTypes} className="scale-75" />
            </span>
          </>
        ) : (
          <>{children}</>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
