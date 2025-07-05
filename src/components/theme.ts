// theme.ts
export const theme = {
  container: {
    center: true,
    padding: '2rem',
    screens: {
      '2xl': '1400px'
    }
  },
  extend: {
    colors: {
      // Base colors - using your existing palette
      background: 'hsl(281, 89%, 98%)', // lavender.100 - very light background
      foreground: 'hsl(210, 17%, 18%)', // softblack.DEFAULT - main text
      
      // Card colors
      card: 'hsl(0, 0%, 100%)', // pure white for cards
      'card-foreground': 'hsl(210, 17%, 18%)', // softblack.DEFAULT
      
      // Popover colors
      popover: 'hsl(0, 0%, 100%)', // pure white
      'popover-foreground': 'hsl(210, 17%, 18%)', // softblack.DEFAULT
      
      // Muted colors - using lavender tones
      muted: 'hsl(281, 83%, 96%)', // lavender.200
      'muted-foreground': 'hsl(210, 17%, 44%)', // softblack.600
      
      // Accent colors - using soap tones
      accent: {
        DEFAULT: 'hsl(268, 77%, 93%)', // soap.200
        foreground: 'hsl(210, 17%, 18%)', // softblack.DEFAULT
      },
      
      // Destructive colors - keeping red but using your palette for foreground
      destructive: {
        DEFAULT: 'hsl(0, 84%, 60%)', // keeping the red
        foreground: 'hsl(0, 0%, 100%)', // white for contrast
      },
      
      // Border and input - using lavender tones
      border: 'hsl(281, 77%, 94%)', // lavender.300
      input: 'hsl(281, 77%, 94%)', // lavender.300
      ring: 'hsl(262, 52%, 73%)', // primary.DEFAULT
      
      // Sidebar - using your palette
      sidebar: {
        DEFAULT: 'hsl(281, 89%, 98%)', // lavender.100
        foreground: 'hsl(210, 17%, 31%)', // softblack.700
        primary: 'hsl(262, 52%, 73%)', // primary.DEFAULT
        'primary-foreground': 'hsl(0, 0%, 100%)', // white
        accent: 'hsl(268, 77%, 93%)', // soap.200
        'accent-foreground': 'hsl(210, 17%, 18%)', // softblack.DEFAULT
        border: 'hsl(281, 77%, 94%)', // lavender.300
        ring: 'hsl(262, 52%, 73%)', // primary.DEFAULT
      },
      
      // Your main palette - simplified with fewer variants
      primary: {
        DEFAULT: 'hsl(262, 52%, 73%)',
        50: 'hsl(262, 89%, 97%)',
        100: 'hsl(262, 83%, 95%)',
        200: 'hsl(262, 77%, 90%)',
        300: 'hsl(262, 71%, 84%)',
        400: 'hsl(262, 65%, 78%)',
        500: 'hsl(262, 52%, 73%)', // DEFAULT
        600: 'hsl(262, 45%, 66%)',
        700: 'hsl(262, 38%, 59%)',
        800: 'hsl(262, 31%, 52%)',
        900: 'hsl(262, 24%, 45%)',
        foreground: 'hsl(0, 0%, 100%)'
      },
      
      secondary: {
        DEFAULT: 'hsl(268, 65%, 84%)',
        50: 'hsl(268, 89%, 98%)',
        100: 'hsl(268, 83%, 97%)',
        200: 'hsl(268, 77%, 93%)',
        300: 'hsl(268, 71%, 88%)',
        400: 'hsl(268, 65%, 86%)',
        500: 'hsl(268, 65%, 84%)', // DEFAULT
        600: 'hsl(268, 58%, 77%)',
        700: 'hsl(268, 51%, 70%)',
        800: 'hsl(268, 44%, 63%)',
        900: 'hsl(268, 37%, 56%)',
        foreground: 'hsl(210, 17%, 18%)'
      },
      
      // Neutral colors - using softblack as the main neutral
      neutral: {
        DEFAULT: 'hsl(210, 17%, 56%)',
        50: 'hsl(210, 17%, 97%)',
        100: 'hsl(210, 17%, 94%)',
        200: 'hsl(210, 17%, 87%)',
        300: 'hsl(210, 17%, 81%)',
        400: 'hsl(210, 17%, 69%)',
        500: 'hsl(210, 17%, 56%)', // DEFAULT
        600: 'hsl(210, 17%, 44%)',
        700: 'hsl(210, 17%, 31%)',
        800: 'hsl(210, 17%, 25%)',
        900: 'hsl(210, 17%, 18%)',
        foreground: 'hsl(0, 0%, 100%)'
      },
      
      // Accent colors - keeping lavender as a softer accent
      accent2: {
        DEFAULT: 'hsl(281, 82%, 91%)',
        50: 'hsl(281, 89%, 98%)',
        100: 'hsl(281, 83%, 96%)',
        200: 'hsl(281, 77%, 94%)',
        300: 'hsl(281, 71%, 92%)',
        400: 'hsl(281, 82%, 91%)', // DEFAULT
        500: 'hsl(281, 75%, 86%)',
        600: 'hsl(281, 68%, 81%)',
        700: 'hsl(281, 61%, 76%)',
        800: 'hsl(281, 54%, 71%)',
        900: 'hsl(281, 47%, 66%)',
        foreground: 'hsl(210, 17%, 18%)'
      },
    },
    borderRadius: {
      lg: '0.5rem',
      md: 'calc(0.5rem - 2px)',
      sm: 'calc(0.5rem - 4px)'
    },
  },
  fonts: {
    bold: 'Quicksand-Bold',
    light: 'Quicksand-Light',
    medium: 'Quicksand-Medium',
    regular: 'Quicksand-Regular',
    semibold: 'Quicksand-SemiBold',
  },
};

// Simplified color usage guide
export const colorUsageGuide = {
  // Primary actions and branding
  primary: 'primary.500', // Main brand color
  primaryHover: 'primary.600',
  primaryLight: 'primary.100',
  
  // Secondary actions
  secondary: 'secondary.500',
  secondaryHover: 'secondary.600',
  secondaryLight: 'secondary.100',
  
  // Text colors
  textPrimary: 'foreground', // Main text
  textSecondary: 'neutral.600', // Secondary text
  textMuted: 'muted-foreground', // Muted text
  
  // Background colors
  bgPrimary: 'background', // Main background
  bgSecondary: 'card', // Card/content background
  bgMuted: 'muted', // Muted background
  bgAccent: 'accent2.100', // Subtle accent background
  
  // Interactive elements
  border: 'border',
  borderHover: 'primary.300',
  input: 'input',
  inputFocus: 'ring',
  
  // Status colors
  success: 'primary.500', // Using primary for success
  warning: 'secondary.600', // Using secondary for warning
  error: 'destructive.DEFAULT',
  info: 'accent2.500',
};

// Type definitions for better TypeScript support
export type Theme = typeof theme;
export type ThemeColors = typeof theme.extend.colors;

// Helper function to get color values
export const getColor = (colorPath: string): string => {
  const keys = colorPath.split('.');
  let result: any = theme.extend.colors;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return '';
    }
  }
  
  return typeof result === 'string' ? result : result?.DEFAULT || '';
};

// Helper function to get border radius values
export const getBorderRadius = (size: 'sm' | 'md' | 'lg'): number => {
  const radiusMap = {
    sm: 4, // calc(0.5rem - 4px) ≈ 4px
    md: 6, // calc(0.5rem - 2px) ≈ 6px
    lg: 8, // 0.5rem ≈ 8px
  };
  return radiusMap[size] || 8;
};

// Helper function to get container styles for React Native
export const getContainerStyles = () => {
  return {
    paddingHorizontal: 32, // 2rem ≈ 32px
    alignSelf: 'center' as const, // center: true
    width: '100%', // Full width
    maxWidth: 1400, // screens.2xl: '1400px'
  };
};

// Helper function to get shadow styles for React Native
export const getShadowStyles = (size: 'sm' | 'md' | 'lg' | 'xl' | '2xl') => {
  const shadowMap = {
    sm: {
      shadowColor: getColor('neutral.300'),
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.01,
      shadowRadius: 2,
      elevation: 4,
    },
    md: {
      shadowColor: getColor('neutral.900'),
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: getColor('neutral.900'),
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 6,
    },
    xl: {
      shadowColor: getColor('neutral.900'),
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
    '2xl': {
      shadowColor: getColor('neutral.900'),
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 12,
      elevation: 12,
    },
  };
  return shadowMap[size] || shadowMap.sm;
};

// Helper function to get border styles for React Native
export const getBorderStyles = (size: 'sm' | 'md' | 'lg' = 'sm', color: string = 'border') => {
  const borderWidthMap = {
    sm: 1,
    md: 2,
    lg: 3,
  };
  return {
    borderWidth: borderWidthMap[size] || 1,
    borderColor: getColor(color),
  };
};

// Usage examples with the new simplified palette:
// getColor('primary') => 'hsl(262, 52%, 73%)'
// getColor('neutral.600') => 'hsl(210, 17%, 44%)'
// getColor('accent2.100') => 'hsl(281, 83%, 96%)'
// Use colorUsageGuide.textPrimary for consistent text colors
// Use colorUsageGuide.bgPrimary for consistent background colors

export default theme;