/**************************************************************************************************
THEMES
**************************************************************************************************/
import { createTheme } from '@mui/system';

const lightTheme = createTheme({
    palette: {
        primary: {
          main: '#1976d2',
          contrastText: 'white',
        },
    },
});

const darkTheme = createTheme({
});

export {lightTheme, darkTheme}

