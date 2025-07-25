/**************************************************************************************************
WEBSOCKET PAGE
**************************************************************************************************/
import { useState } from 'react';
import { Grid, Box } from '@mui/material';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import * as TK from '../app-main/token-storage';
import PageLayout from '../layout/page-layout';
import * as ST from '../elements/styled-elements';
import FormStack from '../elements/controls/form-stack';
import { ReadOnlyLabel } from '../elements/display/read-only';
import { ButtonGeneral } from '../elements/controls/button-family';


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 16,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

function WebsocketPage(props) {

    // websocket

    const [progressVal, setProgressVal] = useState(0);

    let refreshToken = TK.retrieveRefreshToken();
    let host = 'ws://localhost:8000';
    if (window.location.host.includes('localhost') == false) 
        host = 'wss://website-factory.herokuapp.com';
    // const socketUrl = `${host}/ws-connect/${refreshToken}/`;         // needs closing slash 
    const socketUrl = `${host}/ws-connect/`;

    const { sendJsonMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        onOpen: (event) => {
            console.log('ws open');
        },
        onMessage: (event) => {
            const messageDx = JSON.parse(event.data);
            console.log('ws message', messageDx);

            if (messageDx['functionType'] == 'update')
                setProgressVal(messageDx['payload']);
        },
        onClose: (event) => {
            console.log('ws close', event);
        },
        onError: (event) => {
            console.log('ws error', event);
        },
    });

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    const handleStart = (event) => {
        event.preventDefault();

        let wsMessage = {
            'functionType': 'start-process',
            'payload': null,
        }
        sendJsonMessage(wsMessage);
    }

    
    return (
        <PageLayout>
            <ST.GridPage container spacing={'16px'}>

                <Grid item xs={12}>
                    <ST.TitleGroup>
                        <ST.TitleText>Websocket Page</ST.TitleText>
                    </ST.TitleGroup>
                </Grid>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <ST.ContentCard elevation={3}> 
                        <FormStack width='300px'>

                            <ST.TitleText>Backend Processing</ST.TitleText>

                            <ReadOnlyLabel label={ 'Websocket' } value={ connectionStatus } />

                                <ButtonGeneral
                                    buttonLabel='Start'
                                    onClick={ handleStart }
                                />

                            <Box sx={{ width: '100%' }}>
                                <BorderLinearProgress variant='determinate' value={ progressVal } />
                            </Box>

                        </FormStack>
                    </ST.ContentCard>
                </ST.GridItemCenter>


                <ST.GridItemCenter item xs={12} lg={6}>
                    <ST.ContentCard elevation={3}> 
                        <FormStack width='400px'>

                            <ST.TitleText>Font Test</ST.TitleText>

                            <ST.BaseText>
                                Lego is a line of plastic construction toys manufactured by the Lego Group, 
                                a privately held company based in Billund, Denmark. 
                                Lego consists of variously coloured interlocking plastic bricks made of 
                                acrylonitrile butadiene styrene (ABS) that accompany an array of gears, 
                                figurines called minifigures, and various other parts. 
                                Its pieces can be assembled and connected in many ways to construct objects, 
                                including vehicles, buildings, and working robots. 
                                Assembled Lego models can be taken apart, and their pieces can be reused 
                                to create new constructions.                           
                            </ST.BaseText>

                        </FormStack>
                    </ST.ContentCard>
                </ST.GridItemCenter>


            </ST.GridPage>
        </PageLayout>
    );

}

export default WebsocketPage;
