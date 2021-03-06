/**************************************************************************************************
BASE AXIOS PAGE
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { Button, TextField, Autocomplete, FormHelperText } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FormControlLabel, Checkbox } from '@mui/material';
import { Card } from '@mui/material';
import { Grid } from '@mui/material';
import Image from 'mui-image';

import AxiosConfig from '../app-main/axios-config'
import PageLayout from  '../layout/page-layout'
import * as ST from  '../elements/styled-elements'
import { StackForm, FormItem } from '../elements/stack-form'


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
        AxiosConfig({
            url: 'base-axios/theme-groups',
        }).then(responseData => {
            setThemeOptions(responseData);
        }).catch(errorLs => {
            console.log(errorLs);
        });
    }, [])

    const handleThemeGroup = (event) => {
        const legoTheme = event.target.value;
        setThemeGroup(legoTheme);

        // also send the practice get query with params 

        AxiosConfig({
            url: `base-axios/lego-params/${legoTheme}`,
        }).then(responseData => {
            console.log(responseData);
        }).catch(errorLs => {
            console.log(errorLs);
        });
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
        AxiosConfig({
            url: 'base-axios/set-names',
        }).then(responseData => {
            setNameOptions(responseData);
        }).catch(errorLs => {
            console.log(errorLs);
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

        AxiosConfig({
            method: 'POST',      // must use post to send data
            url: 'base-axios/lego-form',
            data: { 'variable': 'dummy-val' },
        }).then(responseData => {
            setFormResult(responseData.message);
        }).catch(errorLs => {
            setFormResult(errorLs);
        });
    }

    // render

    return (
        <PageLayout>
            <ST.GridPage container spacing={'16px'}>

                <Grid item xs={12}>
                    <ST.TitleGroup>
                        <ST.SpecialText>Base Axios</ST.SpecialText>
                    </ST.TitleGroup>
                </Grid>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <Card elevation={3}> 
                        <StackForm width='260px'>

                            <FormItem>
                                <TextField 
                                    value={ userName } error={ !!userNameError } helperText={ userNameError }
                                    onChange={ handleUserName }  
                                    variant='outlined' label='User Name' size='small'/>
                            </FormItem>

                            <FormItem>
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
                </ST.GridItemCenter>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <Card elevation={3} sx={{ 'padding': '16px' }} > 
                        <Image src={require('../assets/lego-set.jpg')} 
                            width={320} duration={0} />
                    </Card>
                </ST.GridItemCenter>

            </ST.GridPage >
        </PageLayout>
    );
}

export default BaseAxios;
