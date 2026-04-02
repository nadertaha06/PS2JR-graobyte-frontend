const theme = {
  colors: {
    primary:     '#4A2C2A',
    cta:         '#6F4E37',
    ctaHover:    '#5C3A21',
    secondary:   '#C8832A',
    accent:      '#E8B86D',

    background:  '#FDF6EE',
    surface:     '#FFFAF3',
    surfaceAlt:  '#F5EDE0',

    textPrimary:   '#1E1008',
    textSecondary: '#7A5C44',
    textMuted:     '#B09A86',

    success:     '#4CAF50',
    successBg:   '#D1FAE5',
    successText: '#065F46',
    error:       '#E53935',
    errorBg:     '#FEE2E2',
    errorText:   '#991B1B',
    warning:     '#FF9800',

    border:       '#E0D0BC',
    borderFocus:  '#C8832A',
  },

  fonts: {
    display: "'Playfair Display', Georgia, serif",
    body:    "'DM Sans', system-ui, sans-serif",
  },

  fontSizes: {
    xs:   '0.75rem',
    sm:   '0.875rem',
    md:   '1rem',
    lg:   '1.125rem',
    xl:   '1.25rem',
    '2xl':'1.5rem',
    '3xl':'2rem',
    '4xl':'2.5rem',
  },

  fontWeights: {
    regular: 400,
    medium:  500,
    semibold:600,
    bold:    700,
  },

  spacing: {
    xs:  '0.25rem',
    sm:  '0.5rem',
    md:  '1rem',
    lg:  '1.5rem',
    xl:  '2rem',
    '2xl':'3rem',
    '3xl':'4rem',
  },

  radii: {
    sm:   '6px',
    md:   '12px',
    lg:   '20px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 3px rgba(74,44,42,0.08)',
    md: '0 4px 16px rgba(74,44,42,0.12)',
    lg: '0 8px 32px rgba(74,44,42,0.16)',
  },

  transitions: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '300ms ease',
  },

  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
}

export default theme
