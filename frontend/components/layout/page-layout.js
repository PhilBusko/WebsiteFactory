/**************************************************************************************************
PAGE LAYOUT
**************************************************************************************************/
import { Box } from '@mui/material';
import MobileNav from './mobile-nav.js';
import DesktopNav from './desktop-nav.js';

function PageLayout(props) {
    return (
        <>
            <Box name='mobile' sx={{ display: { xs: 'block', md: 'none' }}} >
                <Box display='flex' flexDirection='column' >
                    <MobileNav></MobileNav>
                    <Box>{ props.children }</Box>
                </Box>
            </Box>
            <Box name='desktop' sx={{ display: { xs: 'none', md: 'block' }}} >
                <Box display='flex' flexDirection='row' >
                    <DesktopNav name='navigation'></DesktopNav>
                    <Box name='content' width='100%'>{ props.children }</Box>
                </Box>
            </Box>
        </>
    );
}

export default PageLayout;
