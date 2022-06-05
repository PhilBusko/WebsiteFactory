/**************************************************************************************************
DUMMY TEST PAGE
**************************************************************************************************/
import React from 'react';
import axios from 'axios';


class BaseAxios extends React.Component {

    state = {
        'labelVal': 0,
    };

    componentDidMount() {
        // axios({
        //     url: 'api/base-module/tabular/',
        // }).then( success => {
        //     //console.log(success.data);
        //     this.setState({ 'tabular': success.data.legoSets });
        // }).catch( error => {
        //     console.log(error);
        // });

        console.log(process.env.NODE_ENV);
    }

    handleClick = (payload) => {
        console.log('button clicked')
        let newState = { 'labelVal': 100 };
        this.setState(newState);
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
