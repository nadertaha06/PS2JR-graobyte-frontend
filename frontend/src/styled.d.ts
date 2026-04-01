// Declara o formato do tema para o TypeScript.
// Sem este arquivo, styled-components não sabe o que existe dentro de "theme"
// e todos os acessos a props.theme geram erros de tipo.

import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string
      cta: string
      ctaHover: string
      secondary: string
      accent: string
      background: string
      surface: string
      surfaceAlt: string
      textPrimary: string
      textSecondary: string
      textMuted: string
      success: string
      successBg: string
      successText: string
      error: string
      errorBg: string
      errorText: string
      warning: string
      border: string
      borderFocus: string
    }
    fonts: {
      display: string
      body: string
    }
    fontSizes: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
      '4xl': string
    }
    fontWeights: {
      regular: number
      medium: number
      semibold: number
      bold: number
    }
    spacing: {
      xs: string
      sm: string
      md: string
      lg: string
      xl: string
      '2xl': string
      '3xl': string
    }
    radii: {
      sm: string
      md: string
      lg: string
      full: string
    }
    shadows: {
      sm: string
      md: string
      lg: string
    }
    transitions: {
      fast: string
      base: string
      slow: string
    }
    breakpoints: {
      sm: string
      md: string
      lg: string
      xl: string
    }
  }
}
