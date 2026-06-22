import { createTheme } from '@mui/material/styles';

// ---- Design tokens -------------------------------------------------------
// Pulled from the shield crest: deep navy ground, bronze/gold ink,
// parchment ground for content (echoes an official document, not a
// generic "warm cream" template — it's paired with navy + bronze, a
// seal-and-ledger palette, not a terracotta one).
export const tokens = {
  navyInk: '#13203A', // primary — shield ground
  navyDeep: '#0B1426', // footer / scrolled nav
  navyLine: '#24365C', // hairlines on navy
  bronze: '#A9824C', // crest lettering / protea
  bronzeLight: '#CBA86B', // hover state
  parchment: '#F6F3EA', // section ground
  parchmentDeep: '#EDE7D6', // card ground
  ink: '#1B1B1A', // body text
  inkSoft: '#5B5B57', // secondary text
  hairline: 'rgba(19,32,58,0.12)',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: tokens.navyInk, dark: tokens.navyDeep, light: tokens.navyLine },
    secondary: { main: tokens.bronze, light: tokens.bronzeLight },
    background: { default: tokens.parchment, paper: '#FFFFFF' },
    text: { primary: tokens.ink, secondary: tokens.inkSoft },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
    overline: {
      fontFamily: '"IBM Plex Mono", monospace',
      letterSpacing: '0.18em',
      fontWeight: 600,
    },
  },
  shape: { borderRadius: 4 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 2, paddingInline: '1.6rem', paddingBlock: '0.8rem' },
      },
    },
  },
});

export default theme;
