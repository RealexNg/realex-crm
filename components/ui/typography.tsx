import React from "react";
import { cn } from "@/lib/utils";

export const H1 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-4xl",
      className,
    )}
    {...props}
  >
    {children}
  </h1>
));
H1.displayName = "Typography H1";

export const H2 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      " text-3xl font-semibold tracking-tight transition-colors first:mt-0",
      className,
    )}
    {...props}
  >
    {children}
  </h2>
));
H2.displayName = "Typography H2";

export const H3 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-tight tracking-tight",
      className,
    )}
    {...props}
  >
    {children}
  </h3>
));
H3.displayName = "Typography H1";

export const H4 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-xl font-semibold tracking-tight", className)}
    {...props}
  >
    {children}
  </h4>
));
H4.displayName = "Typography H4";

export const H5 = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "scroll-m-20 text-lg font-semibold tracking-tight",
      className,
    )}
    {...props}
  >
    {children}
  </h5>
));
H5.displayName = "Typography H5";

export const P = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p ref={ref} className={cn("text-base leading-6", className)} {...props}>
    {children}
  </p>
));
P.displayName = "Typography P";

export const Span = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => (
  <span ref={ref} className={cn("leading-tight", className)} {...props}>
    {children}
  </span>
));
Span.displayName = "Typography Span";

export const Blockquote = React.forwardRef<
  HTMLQuoteElement,
  React.HTMLAttributes<HTMLQuoteElement>
>(({ className, children, ...props }, ref) => (
  <blockquote
    ref={ref}
    className={cn("mt-6 border-l-2 pl-6 italic", className)}
    {...props}
  >
    {children}
  </blockquote>
));
Blockquote.displayName = "Typography H1";
