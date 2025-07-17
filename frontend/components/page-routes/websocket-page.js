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
import StackForm from '../elements/controls/stack-form';
import ReadOnlyLabel from '../elements/controls/read-only-label';
import Canvas from '../elements/custom/canvas';


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


    // canvas

    function circlePulse(ctx, frameCount) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = 'crimson'
        ctx.beginPath()
        ctx.arc(50, 50, 20*Math.sin(frameCount*0.03)**2, 0, 2*Math.PI)
        ctx.fill()
    }

    return (
        <PageLayout>
            <ST.GridPage container spacing={'16px'}>

                <Grid item xs={12}>
                    <ST.TitleGroup>
                        <ST.TitleText>WEBSOCKET PAGE</ST.TitleText>
                    </ST.TitleGroup>
                </Grid>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <ST.ContentCard elevation={3}> 
                        <StackForm width='300px'>

                            <ST.TitleText>Backend Processing</ST.TitleText>

                            <ReadOnlyLabel label={ 'Websocket' } value={ connectionStatus } />

                            <Box>
                                <Button type='submit' onClick={ handleStart } variant='contained'>
                                    <ST.BaseText>Start</ST.BaseText>
                                </Button>
                            </Box>

                            <Box sx={{ width: '100%' }}>
                                <BorderLinearProgress variant='determinate' value={ progressVal } />
                            </Box>

                        </StackForm>
                    </ST.ContentCard>
                </ST.GridItemCenter>

            </ST.GridPage>
        </PageLayout>
    );

}

export default WebsocketPage;
