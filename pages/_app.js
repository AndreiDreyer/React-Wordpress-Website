import { ThemeProvider } from '@material-ui/core/styles';

import { customTheme } from '../src/theme';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
