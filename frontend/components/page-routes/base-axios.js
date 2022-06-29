/**************************************************************************************************
BASE AXIOS PAGE
**************************************************************************************************/
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Autocomplete, FormHelperText } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FormControlLabel, Checkbox } from '@mui/material';
import { Card } from '@mui/material';
import { Grid } from '@mui/material';
import Image from 'mui-image';

import PageLayout from '../layout/page-layout.js'
import * as ST from '../layout/styled-elements.js'
import { StackForm, FormItem } from '../elements/stack-form.js'


function BaseAxios(props) {

    // user name

    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState(null);
    const handleUserName = (evt) => {
        setUserName(evt.target.value);
    }

    // select lego theme

    const [themeGroup, setThemeGroup] = useState('');
    const [themeOptions, setThemeOptions] = useState([]);

    useEffect(() => {
        axios({
            url: 'base-axios/theme-groups',
        }).then( success => {
            //console.log('received: ', success.data);
            setThemeOptions(success.data);
        }).catch( error => {
            console.log(error);
        });
    }, [])

    const handleThemeGroup = (event) => {
        setThemeGroup(event.target.value);
    }

    // option checkbox

    const [optionChecked, setOptionChecked] = useState(false);
    const handleOption = (evt) => {
        setOptionChecked(evt.target.checked);
    };

    // autocomplete

    const [setName, setSetName] = useState(null);
    //const [setInput, setSetInput] = useState('');
    const [nameOptions, setNameOptions] = useState([]);

    useEffect(() => {
        axios({
            url: 'base-axios/set-names',
        }).then( success => {
            //console.log('received: ', success.data);
            setNameOptions(success.data);
        }).catch( error => {
            console.log(error);
        });
    }, [])

    const handleSetName = (event, newValue) => {
        console.log('setname', newValue)
        setSetName(newValue);
    }; 

    // submit button

    const [formResult, setFormResult] = useState(null);

    function validateForm() {
        var hasError = false;

        if (userName == '') {
            setUserNameError('Can\'t be blank');
            hasError = true;
        }
        else if (userName.indexOf(' ') >= 0) {
            setUserNameError('Can\'t have white spaces');
            hasError = true;
        }
        else {
            setUserNameError(null);
        }

        return hasError;
    }

    const handleSubmit = (event) => {
        console.log('submit clicked');
        event.preventDefault();
        setFormResult(null);

        var hasError = validateForm();
        if (hasError) {
            return;
        }

        axios({
            method: 'put',      // must use put to send data
            url: 'base-axios/lego-form',
            data: { 'variable': 'dummy-val' },
        }).then( success => {
            //console.log('received: ', success.data);
            setFormResult(success.data.message);
        }).catch( error => {
            console.log(error);
            setFormResult(error);
        });
    }

    // render

    return (
        <PageLayout>
            <Grid container spacing={2} 
                sx={{ 'padding': ['0px 10px', '0px 20px', '0px 200px 0px 20px'] }} >

                <Grid item xs={12}>
                    <ST.PageTitle>Base Axios</ST.PageTitle>
                </Grid>

                <ST.GridPanel item xs={12} lg={6}>
                    <Card elevation={3}> 
                        <StackForm width='260px'>

                            <FormItem >
                                <TextField 
                                    value={ userName } error={ !!userNameError } helperText={ userNameError }
                                    onChange={ handleUserName }  
                                    variant='outlined' label='User Name' size='small'/>
                            </FormItem>

                            <FormItem >
                                <FormControl fullWidth size='small'>
                                    <InputLabel id='themeSelect'>Theme Group</InputLabel>
                                    <Select 
                                        value={themeGroup} onChange={handleThemeGroup} 
                                        labelId='themeSelect' label='Theme Group' size='small' >
                                        <MenuItem key={0} value=''><em>None</em></MenuItem>
                                        { themeOptions.map((group, idx) => (
                                            <MenuItem key={idx+1} value={group}>
                                                {group}
                                            </MenuItem>
                                        )) }
                                    </Select>
                                </FormControl>
                            </FormItem>

                            <FormItem>
                                <FormControlLabel label='Option One' labelPlacement='end'
                                    control={<Checkbox checked={optionChecked} onChange={handleOption}
                                            sx={{ 'padding': '0 8px' }} />} 
                                />
                            </FormItem>

                            <FormItem>
                                <Autocomplete
                                    options={nameOptions} 
                                    value={setName} onChange={handleSetName} 
                                    //inputValue={setInput} onInputChange={handleSetInput} 
                                    //open={ setInput.length > 2 } 
                                    renderInput={(params) => <TextField {...params} label='Set Name'  />}
                                    sx={{ width: '100%' }} size='small' /> 
                            </FormItem>

                            <FormItem sx={{ 'display': 'flex', 'justifyContent': 'space-between' }}>

                                <FormHelperText value={formResult}>{formResult}</FormHelperText>
                                <Button type='submit' onClick={ handleSubmit } variant='contained'>Send Form</Button>
                            </FormItem>

                        </StackForm>
                    </Card>
                </ST.GridPanel>

                <ST.GridPanel item xs={12} lg={6}>
                    <Card elevation={3} sx={{ 'padding': '16px' }} > 
                        <Image src={require('../assets/lego-set.jpg')} 
                            width={340} duration={0} />
                    </Card>
                </ST.GridPanel>

            </Grid>
        </PageLayout>
    );
}

export default BaseAxios;
