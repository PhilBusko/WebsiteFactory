/**************************************************************************************************
DUMMY TEST PAGE
**************************************************************************************************/
import React from 'react';
//import * as axios from './axios-config.js';
import axios from 'axios';

class BaseAxios extends React.Component {

    state = {
        'labelVal': 0,
    };

    componentDidMount() {

        console.log(process.env.NODE_ENV);
    }

    handleClick = () => {
        //console.log('button clicked')

        axios({
            method: 'put',      // must use put to send data
            url: 'base-axios/dummy/',
            data: { 'inputVal': this.state.labelVal },
        }).then( success => {
            //console.log('received: ', success.data);
            this.setState({ 'labelVal': success.data.dummyVal });
        }).catch( error => {
            console.log(error);
        });

    }

    render() {
        return (
            <>
                <div>
                    base axios
                </div>
                <div>
                    <button onClick={this.handleClick}>Test Button</button>
                </div>
                <div>
                    <input value={ this.state.labelVal } disabled={ true } ></input>
                </div>
            </>
        );
    }
}

export default BaseAxios;
