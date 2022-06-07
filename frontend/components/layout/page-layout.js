/**************************************************************************************************
PAGE LAYOUT
**************************************************************************************************/
import { AppBar, Toolbar } from "@mui/material"
import { useTheme, useMediaQuery } from '@mui/material';
import { Button } from "@mui/material"


function NavBar(props) {
    return (
        <>
            NavBar
        </>
    );
}

function PageLayout(props) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {isMobile && 
                <div>
                    <AppBar position='sticky'>
                        <Toolbar>
                            <Button variant="outlined" color="inherit" >
                                Button 1
                            </Button>
                            <Button variant="outlined" color="inherit">
                                Button 2
                            </Button>
                        </Toolbar>
                    </AppBar>
                </div> 
            }
            {!isMobile && 
                <div>
                    desktop
                </div> 
            }

            { props.children }
        </>
    );
}

export default PageLayout;
