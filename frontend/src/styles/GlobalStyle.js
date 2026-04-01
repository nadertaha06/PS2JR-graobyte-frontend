// GlobalStyle.js
// createGlobalStyle é uma função do styled-components que aplica
// CSS para o documento inteiro (não para um componente específico).

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Importa as fontes do Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');

  /* Reset universal — zera margin/padding e usa box-sizing consistente */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Define a fonte e cor base em todo o documento */
  html, body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 16px;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased; /* Deixa o texto mais nítido no Mac */
  }

  /* Remove o estilo padrão de listas */
  ul, ol {
    list-style: none;
  }

  /* Remove o sublinhado de links */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Imagens nunca ultrapassam o container */
  img {
    max-width: 100%;
    display: block;
  }

  /* Botões herdam a fonte do documento */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  /* Inputs herdam a fonte do documento */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
  }
`;

export default GlobalStyle;
