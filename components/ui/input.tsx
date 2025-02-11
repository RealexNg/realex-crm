"use client";

import * as React from "react";

import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useInteractiveEvent } from "@/hooks/use-interactive-event";

const inputVariants = cva(
  "flex items-center peer w-full transition duration-200 border border-input [&.is-focus]:ring-[0.5px] [&.is-hover]:border-primary [&.is-focus]:border-primary [&.is-focus]:ring-primary [&.is-focus]:outline-none [&_input::placeholder]:opacity-60 rounded-md",
  {
    variants: {
      size: {
        default: "h-10 px-3.5 sm:text-sm",
        sm: "h-9 px-2  text-sm sm:text-xs",
        xs: "h-8 px-2  text-xs",
        lg: "h-11  px-4 text-base",
        xl: "px-5  text-base h-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const inputFieldStyles = {
  base: "w-full border-0  px-0.5 focus:outline-none focus:ring-0 bg-transparent",
  reset:
    "[&::-ms-clear]:hidden [&::-ms-reveal]:hidden [&::-webkit-search-cancel-button]:auto [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none",
  disabled: "cursor-not-allowed placeholder:text-muted-foreground",
  clearable:
    "[&:placeholder-shown~.input-clear-btn]:opacity-0 [&:placeholder-shown~.input-clear-btn]:invisible [&:not(:placeholder-shown)~.input-clear-btn]:opacity-100 [&:not(:placeholder-shown)~.input-clear-btn]:visible",
  prefix: {
    size: {
      sm: "ps-1.5",
      default: "ps-2.5",
      lg: "ps-3.5",
      xl: "ps-4",
    },
  },
  suffix: {
    size: {
      sm: "pe-1.5",
      default: "pe-2.5",
      lg: "pe-3.5",
      xl: "pe-4",
    },
  },
};

export const errorStyle =
  "!border-destructive [&.is-hover]:!border-destructive [&.is-focus]:!border-destructive !ring-destructive !bg-transparent";

export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "prefix" | "suffix"
    >,
    VariantProps<typeof inputVariants> {
  /** This Input component only support these types */
  // type?:
  //   | 'text'
  //   | 'email'
  //   | 'number'
  //   | 'tel'
  //   | 'search'
  //   | 'url'
  //   | 'time'
  //   | 'date'
  //   | 'week'
  //   | 'month'
  //   | 'datetime-local';
  error?: boolean;
  prefix?: React.ReactNode;
  prefixClassName?: string;
  suffix?: React.ReactNode;
  suffixClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      size,
      prefix,
      suffix,
      error,
      placeholder,
      disabled,
      type,
      readOnly,
      onBlur,
      onFocus,
      prefixClassName,
      suffixClassName,
      ...props
    },
    ref
  ) => {
    const {
      isFocus,
      isHover,
      handleOnBlur,
      handleOnFocus,
      handleOnMouseEnter,
      handleOnMouseLeave,
    } = useInteractiveEvent({
      readOnly,
      onBlur,
      onFocus,
    });

    return (
      <div
        data-focus={isFocus}
        data-hover={isHover}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className={cn(
          inputVariants({ size, className }),
          isHover && "is-hover", // must have is-hover class based on mouse enter
          disabled && "[&.is-hover]:border-input",
          isFocus && "is-focus", // must have is-focus class based on onFocus event
          error && errorStyle
        )}
      >
        {prefix ? (
          <span
            className={cn(
              "whitespace-nowrap leading-normal [&>svg]:text-gray-500",
              prefixClassName
            )}
          >
            {prefix}
          </span>
        ) : null}
        <input
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          readOnly={readOnly}
          type={type}
          className={cn(
            inputFieldStyles.base,
            inputFieldStyles.reset,
            // it's important we are using placeholder-shown pseudo class to control input clear icon btn
            !placeholder && "placeholder:opacity-0",
            disabled && inputFieldStyles.disabled,
            prefix &&
              inputFieldStyles.prefix.size[
                size as keyof typeof inputFieldStyles.prefix.size
              ],
            suffix &&
              inputFieldStyles.suffix.size[
                size as keyof typeof inputFieldStyles.suffix.size
              ]
          )}
          style={{ fontSize: "inherit" }}
          {...props}
        />
        {suffix ? (
          <span
            className={cn(
              "whitespace-nowrap leading-normal [&>svg]:text-gray-500",
              suffixClassName
            )}
          >
            {suffix}
          </span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input, inputVariants, inputFieldStyles };
