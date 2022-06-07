/**************************************************************************************************
BASE AXIOS PAGE
**************************************************************************************************/
import React, { useState } from 'react';
import axios from 'axios';
import PageLayout from '../layout/page-layout.js'

function BaseAxios(props) {

    const [inputVal, setInput] = useState(0);

    const handleClick = (e) => {
        //console.log('button clicked')

        axios({
            method: 'put',      // must use put to send data
            url: 'base-axios/dummy/',
            data: { 'inputVal': inputVal },
        }).then( success => {
            //console.log('received: ', success.data);
            setInput(success.data.dummyVal);
        }).catch( error => {
            console.log(error);
        });
    }

    return (
        <PageLayout>
            <div style={{'padding': '10px'}}>
                base axios
            </div>
            <div style={{'padding': '10px'}}>
                <button onClick={ handleClick }>Test Button</button>
            </div>
            <div style={{'padding': '10px'}}>
                <input value={ inputVal } disabled={ true } ></input>
            </div>
        </PageLayout>
    );

}

export default BaseAxios;
