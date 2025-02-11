import { tailwindColors } from "./colors/tailwind-colors";

export const extendedTheme = {
  colors: {
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
   ...tailwindColors
  },
  fontWeight: {
    thin: '300',
    extralight: '400',
    light: '500',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  fontSize: {
    base: [
      'var(--text-body-size-medium)',
      {
        lineHeight: 'var(--text-body-lineHeight-medium)',
      },
    ],
    display: [
      'var(--text-display-size)',
      {
        lineHeight: 'var(--text-display-lineHeight)',
        fontWeight: 'var(--text-display-weight)',
      },
    ],
    'title-large': [
      'var(--text-title-size-large)',
      {
        lineHeight: 'var(--text-title-lineHeight-large)',
        fontWeight: 'var(--text-title-weight-large)',
      },
    ],
    'title-medium': [
      'var(--text-title-size-medium)',
      {
        lineHeight: 'var(--text-title-lineHeight-medium)',
        fontWeight: 'var(--text-title-weight-medium)',
      },
    ],
    'title-small': [
      'var(--text-title-size-small)',
      {
        lineHeight: 'var(--text-title-lineHeight-small)',
        fontWeight: 'var(--text-title-weight-small)',
      },
    ],
    subtitle: [
      'var(--text-subtitle-size)',
      {
        lineHeight: 'var(--text-subtitle-lineHeight)',
        fontWeight: 'var(--text-subtitle-weight)',
      },
    ],
    'body-large': [
      'var(--text-body-size-large)',
      {
        lineHeight: 'var(--text-body-lineHeight-large)',
      },
    ],
    'body-medium': [
      'var(--text-body-size-medium)',
      {
        lineHeight: 'var(--text-body-lineHeight-medium)',
      },
    ],
    'body-small': [
      'var(--text-body-size-small)',
      {
        lineHeight: 'var(--text-body-lineHeight-small)',
      },
    ],
    caption: [
      'var(--text-caption-size)',
      {
        lineHeight: 'var(--text-caption-lineHeight)',
        fontWeight: 'var(--text-caption-weight)',
      },
    ],
    'code-block': [
      'var(--text-codeBlock-size)',
      {
        lineHeight: 'var(--text-codeBlock-lineHeight)',
        fontWeight: 'var(--text-codeBlock-weight)',
      },
    ],
    'code-inline': [
      'var(--text-codeBlock-size)',
      {
        lineHeight: 'var(--text-codeInline-lineHeight)',
        fontWeight: 'var(--text-codeInline-weight)',
      },
    ],
  } satisfies Record<
    string,
    | string
    | [fontSize: string, lineHeight: string]
    | [
        fontSize: string,
        configuration: Partial<{
          lineHeight: string;
          letterSpacing: string;
          fontWeight: string | number;
        }>,
      ]
  >,
  containers: {
    xxl: '16rem',
  },
  borderRadius: {
    '2xl': 'calc(var(--radius) + 4px)',
    xl: 'calc(var(--radius) + 2px)',
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)',
  },

  keyframes: {
    'accordion-down': {
      from: {height: '0'},
      to: {height: 'var(--radix-accordion-content-height)'},
    },
    'accordion-up': {
      from: {height: 'var(--radix-accordion-content-height)'},
      to: {height: '0'},
    },
    'collapsible-down': {
      from: {height: '0'},
      to: {height: 'var(--radix-collapsible-content-height)'},
    },
    'collapsible-up': {
      from: {height: 'var(--radix-collapsible-content-height)'},
      to: {height: '0'},
    },
    shimmer: {
      '100%': {
        transform: 'translateX(100%)',
      },
    },
    'caret-blink': {
      '0%,70%,100%': {opacity: '1'},
      '20%,50%': {opacity: '0'},
    },
  },
  animation: {
    'accordion-down': 'accordion-down 0.2s ease-out',
    'accordion-up': 'accordion-up 0.2s ease-out',
    'collapsible-down': 'collapsible-down 0.2s ease-out',
    'collapsible-up': 'collapsible-up 0.2s ease-out',
    'caret-blink': 'caret-blink 1.25s ease-out infinite',
  },
};
