/**************************************************************************************************
PAGE LAYOUT
**************************************************************************************************/
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/system';

import MobileNav from './mobile-nav.js';
import DesktopNav from './desktop-nav.js';
//import * as TH from './themes.js';

//import {lightTheme, darkTheme} from './themes.js';

import { createTheme } from '@mui/system';

const lightTheme = createTheme({
    palette: {
        primary: {
          main: '#1976d2',
          contrastText: 'white',
        },
    },
});


function PageLayout(props) {
    return (
        <ThemeProvider theme={lightTheme}>
            <Box name='mobile' sx={{ display: { xs: 'block', md: 'none' }}} >
                <MobileNav></MobileNav>
                <Box>{ props.children }</Box>
            </Box>
            <Box name='desktop' sx={{ display: { xs: 'none', md: 'block' }}} >
                <Box display='flex' flexDirection='row' >
                    <DesktopNav name='navigation'></DesktopNav>
                    <Box name='content' width='100%'>{ props.children }</Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default PageLayout;
