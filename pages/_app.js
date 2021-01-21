import { MuiThemeProvider } from '@material-ui/core/styles';
import CartContextProvider from '../src/contexts/CartContext';

import { customTheme } from '../src/theme';

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <CartContextProvider>
      <MuiThemeProvider theme={customTheme}>
        <Component {...pageProps} />
      </MuiThemeProvider>
    </CartContextProvider>
  );
}

export default MyApp;
