import { extendTheme, theme as baseTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    main: baseTheme.colors.blue,
    herolo: baseTheme.colors.purple,
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
});
