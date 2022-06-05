/**************************************************************************************************
BASE AXIOS PAGE
**************************************************************************************************/
import React from 'react';
import axios from 'axios';
import './_page-styles.scss'


class BaseAxios extends React.Component {

    state = {
        'labelVal': 'my value',
        'selectKey': 0,
        'inputVal': '',
        'numberVal': '',
        'tabular': [],
    };

    selectOptions = [
        {'key': 0, 'value': 'Value A'}, 
        {'key': 1, 'value': 'Value B'},
        {'key': 2, 'value': 'Value C'},
    ];


    componentDidMount() {
        // axios({
        //     url: 'api/base-module/tabular/',
        // }).then( success => {
        //     //console.log(success.data);
        //     this.setState({ 'tabular': success.data.legoSets });
        // }).catch( error => {
        //     console.log(error);
        // });
    }

    handleNumber = (payload) => {
        let newState = { 'numberVal': payload };
        this.setState(newState);
    }

    render() {
        return (
            <div>
                base axios
            </div>
        );
    }
}

export default BaseAxios;
