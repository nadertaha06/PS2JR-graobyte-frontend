// theme.js
// Aqui ficam TODAS as variáveis visuais do projeto.
// Importamos este objeto no ThemeProvider lá no main.jsx,
// e qualquer styled-component pode acessar via props.theme.

const theme = {
  colors: {
    // Paleta principal — tons de café + creme
    primary:     '#4A2C2A', // marrom escuro (café torrado)
    cta:         '#6F4E37', // espresso — botões de ação primária
    ctaHover:    '#5C3A21', // espresso escuro — hover de botões CTA
    secondary:   '#C8832A', // âmbar (café com leite)
    accent:      '#E8B86D', // dourado suave (crema do espresso)

    // Fundos
    background:  '#FDF6EE', // creme quente
    surface:     '#FFFAF3', // branco-creme para cards e navbar
    surfaceAlt:  '#F5EDE0', // bege para inputs e áreas secundárias

    // Textos
    textPrimary:   '#1E1008', // quase preto, levemente marrom
    textSecondary: '#7A5C44', // marrom médio para subtítulos
    textMuted:     '#B09A86', // cinza-bege para placeholders

    // Feedbacks
    success:     '#4CAF50',
    successBg:   '#D1FAE5',
    successText: '#065F46',
    error:       '#E53935',
    errorBg:     '#FEE2E2',
    errorText:   '#991B1B',
    warning:     '#FF9800',

    // Bordas
    border:       '#E0D0BC',
    borderFocus:  '#C8832A',
  },

  fonts: {
    // Display: usado em títulos grandes e logo
    display: "'Playfair Display', Georgia, serif",
    // Body: usado em textos e botões
    body:    "'DM Sans', system-ui, sans-serif",
  },

  fontSizes: {
    xs:   '0.75rem',  // 12px
    sm:   '0.875rem', // 14px
    md:   '1rem',     // 16px
    lg:   '1.125rem', // 18px
    xl:   '1.25rem',  // 20px
    '2xl':'1.5rem',   // 24px
    '3xl':'2rem',     // 32px
    '4xl':'2.5rem',   // 40px
  },

  fontWeights: {
    regular: 400,
    medium:  500,
    semibold:600,
    bold:    700,
  },

  spacing: {
    xs:  '0.25rem',  // 4px
    sm:  '0.5rem',   // 8px
    md:  '1rem',     // 16px
    lg:  '1.5rem',   // 24px
    xl:  '2rem',     // 32px
    '2xl':'3rem',    // 48px
    '3xl':'4rem',    // 64px
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

  // Tokens de transição — referenciados por todos os componentes interativos
  transitions: {
    fast: '150ms ease',
    base: '200ms ease',
    slow: '300ms ease',
  },

  // Breakpoints para responsividade
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
};

export default theme;
