import { MuiThemeProvider, ThemeProvider } from '@material-ui/core/styles';

import { customTheme } from '../src/theme';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <MuiThemeProvider theme={customTheme}>
      <Component {...pageProps} />
    </MuiThemeProvider>
  );
}

export default MyApp;
