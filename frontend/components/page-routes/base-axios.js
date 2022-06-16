/**************************************************************************************************
BASE AXIOS PAGE
**************************************************************************************************/
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Autocomplete } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FormControlLabel, Checkbox } from '@mui/material';
import { Card } from '@mui/material';
import { Grid } from '@mui/material';

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
            url: 'base-axios/theme-groups/',
        }).then( success => {
            //console.log('received: ', success.data);
            setThemeOptions(success.data);
            setNameOptions(success.data);
        }).catch( error => {
            console.log(error);
        });
    }, [])

    const handleThemeGroup = (evt) => {
        setThemeGroup(evt.target.value);
    }

    // option checkbox

    const [optionChecked, setOptionChecked] = useState(false);
    const handleOption = (evt) => {
        setOptionChecked(evt.target.checked);
    };

    // autocomplete

    const [setName, setSetName] = useState(null);
    const [setInput, setSetInput] = useState('');
    const [nameOptions, setNameOptions] = useState([]);

    const handleSetName = (event, newValue) => {
        console.log('setname', newValue)
        setSetName(newValue);
    };
    const handleSetInput = (event, newValue) => {
        console.log('inputval', newValue)
        setSetInput(newValue);
    };



    const options = ['Option 1', 'Option 2'];
    const [value, setValue] = useState(options[0]);
    const [inputValue, setInputValue] = useState('');
    



    // submit button

    const handleSubmit = (evt) => {
        console.log('submit clicked');
        evt.preventDefault();

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

        if (hasError) {
            return;
        }

        // axios({
        //     method: 'put',      // must use put to send data
        //     url: 'base-axios/dummy/',
        //     data: { 'inputVal': inputVal },
        // }).then( success => {
        //     //console.log('received: ', success.data);
        //     setInput(success.data.dummyVal);
        // }).catch( error => {
        //     console.log(error);
        // });
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
                        <StackForm>

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
                                    inputValue={setInput} onInputChange={handleSetInput} 
                                    //open={ setInput.length > 2 } 
                                    renderInput={(params) => <TextField {...params} label='Set Name'  />}
                                    sx={{ width: '100%' }} size='small' /> 
                            </FormItem>

                            <FormItem>
                                <Autocomplete
                                    value={value}
                                    onChange={(event, newValue) => {setValue(newValue);}}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {setInputValue(newInputValue);}}
                                    id="controllable-states-demo"
                                    options={options}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Controllable" />}
                                />
                            </FormItem>


                            <FormItem sx={{ 'textAlign': 'right' }}>
                                <Button type='submit' onClick={ handleSubmit } variant='contained'>Send Form</Button>
                            </FormItem>

                        </StackForm>
                    </Card>
                </ST.GridPanel>

                <ST.GridPanel item xs={12} lg={6}>
                    <Card elevation={3}> 
                        island 2
                    </Card>
                </ST.GridPanel>

            </Grid>
        </PageLayout>
    );
}

export default BaseAxios;
