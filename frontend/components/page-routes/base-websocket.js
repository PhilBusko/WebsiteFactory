/**************************************************************************************************
BASE WEBSOCKET PAGE
**************************************************************************************************/
import React, { useState } from 'react';
import axios from 'axios';
import PageLayout from '../layout/page-layout.js'

function BaseWebsocket(props) {

    const [inputVal, setInput] = useState(0);

    const handleClick = (e) => {
        //console.log('button clicked')


    }

    return (
        <PageLayout>
            <div style={{'padding': '10px'}}>
                base websocket
            </div>
        </PageLayout>
    );

}

export default BaseWebsocket;
