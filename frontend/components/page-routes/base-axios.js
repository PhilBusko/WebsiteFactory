/**************************************************************************************************
BASE AXIOS PAGE
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import { Grid, Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

import AxiosConfig from '../app-main/axios-config';
import PageLayout from  '../layout/page-layout';
import * as ST from  '../elements/styled-elements';

import StackForm from '../elements/controls/stack-form';
import TextInput from '../elements/controls/text-input';
// import NumberInput from '../elements/controls/number-input';
import SelectMultiple from '../elements/controls/select-multiple';
import FullCheckbox from '../elements/controls/full-checkbox';
import FormSubmit from '../elements/controls/form-submit';

import SelectSingle from '../elements/controls/select-single';
import PaginatedTable from '../elements/display/paginated-table';
import DisplayDict from '../elements/display/display-dict';


const AxiosImage = styled('img')(({ theme }) => ({
    width: '320px',
    [theme.breakpoints.down('md')]: {width: '420px'},
    cursor: 'pointer',
    border: '2px solid white',
    '&:hover': {border: '2px solid black'},
}));

function BaseAxios(props) {

    // form submission

    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState(null);
    const [multiVal, setMultiVal] = useState([]);
    const [optionChecked, setOptionChecked] = useState(false);
    const [formResult, setFormResult] = useState(null);

    function submitForm() {
        var hasError = false;

        if (userName == '') {
            setUserNameError('Can\'t be blank');
            hasError = true;
        }
        else if (userName.indexOf(' ') >= 0) {
            setUserNameError('Can\'t have white spaces');
            hasError = true;
        }

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

    const handleSubmit = (event) => {
        event.preventDefault();
        setUserNameError(null);
        setFormResult(null);

        setTimeout(submitForm, 500);
    }

    // select lego theme

    const [themeGroup, setThemeGroup] = useState('');
    const [themeOptions, setThemeOptions] = useState([]);
    const [setsByTheme, setSetsTheme] = useState([]);

    useEffect(() => {
        AxiosConfig({
            url: 'base-axios/theme-groups',
        }).then(responseData => {
            setThemeOptions(responseData);
        }).catch(errorLs => {
            console.log(errorLs);
        });
    }, [])

    const handleThemeGroup = (legoTheme) => {
        // const legoTheme = event.target.value;
        setThemeGroup(legoTheme);

        AxiosConfig({
            url: `base-axios/sets-by-theme/${legoTheme}`,
        }).then(responseData => {
            console.log(responseData);
            setSetsTheme(responseData.setsByTheme);
        }).catch(errorLs => {
            console.log(errorLs);
        });
    }

    // autocomplete

    const [setName, setSetName] = useState(null);
    //const [setInput, setSetInput] = useState('');
    const [nameOptions, setNameOptions] = useState([]);
    const [setInfo, setSetInfo] = useState({});

    useEffect(() => {
        AxiosConfig({
            url: 'base-axios/set-names',
        }).then(responseData => {
            setNameOptions(responseData);
        }).catch(errorLs => {
            console.log(errorLs);
        });
    }, [])

    const handleSetName = (event, value) => {
        setSetName(value);
        setSetInfo({});

        AxiosConfig({
            url: `base-axios/set-info/${value}`,
        }).then(responseData => {
            console.log(responseData);
            setSetInfo(responseData);
        }).catch(errorLs => {
            console.log(errorLs);
        });
    }

    // render

    return (
        <PageLayout>
            <ST.GridPage container spacing={'16px'}>

                <Grid item xs={12}>
                    <ST.TitleGroup>
                        <ST.SpecialText>AXIOS PAGE</ST.SpecialText>
                    </ST.TitleGroup>
                </Grid>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <ST.ContentCard elevation={3}> 
                        <StackForm width='260px'>

                            <ST.HighlightText>HTML Form</ST.HighlightText>

                            <TextInput 
                                label='Free Text' 
                                value={ userName } onChange={ setUserName }
                                errorMsg={ userNameError } />

                            <SelectMultiple 
                                label={ 'Multiple Choice' } optionLs={ themeOptions } 
                                value={ multiVal } onChange={ setMultiVal } /> 

                            <FullCheckbox
                                label={ 'Option One' }
                                isChecked={ optionChecked } 
                                onChange={ setOptionChecked } /> 

                            <ST.SmallButton onClick={() => { alert('Button Effect'); }}>
                                <ST.BaseText>Small Button</ST.BaseText>
                            </ST.SmallButton>

                            <FormSubmit message={ formResult } 
                                onSubmit={ handleSubmit }/>

                        </StackForm>
                    </ST.ContentCard>
                </ST.GridItemCenter>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <ST.ContentCard elevation={3}> 
                        <Stack spacing='16px'>

                            <ST.HighlightText>Display Dict</ST.HighlightText>

                            <Autocomplete
                                options={nameOptions} 
                                value={setName} 
                                onChange={handleSetName}
                                //inputValue={setInput} onInputChange={handleSetInput} 
                                //open={ setInput.length > 2 } 
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label='Set Name'/>}
                                sx={{ width: '300px' }} size='small' /> 

                            <DisplayDict infoDx={setInfo} height={'206px'}>
                            </DisplayDict>

                        </Stack>
                    </ST.ContentCard>
                </ST.GridItemCenter>

                <ST.GridItemCenter item xs={12} lg={8}>
                    <ST.ContentCard elevation={3}> 
                        <Stack spacing='16px'>

                            <ST.HighlightText>Data Table</ST.HighlightText>

                            <SelectSingle
                                label={ 'Theme Group' } width={ '180px' } hasNone={ true }
                                optionLs={ themeOptions } value={ themeGroup } 
                                onChange={ handleThemeGroup } />

                            <PaginatedTable
                                width={ '675px' } 
                                dataLs={setsByTheme} />

                        </Stack>
                    </ST.ContentCard>
                </ST.GridItemCenter>

                <ST.GridItemCenter item xs={12} lg={4}>
                    <ST.ContentCard elevation={3}> 
                        <Stack spacing='16px'>

                            <ST.HighlightText>Image</ST.HighlightText>

                            <AxiosImage src={require('../assets/lego-set.jpg')} />

                        </Stack>
                    </ST.ContentCard>
                </ST.GridItemCenter>


            </ST.GridPage >
        </PageLayout>
    );
}

export default BaseAxios;
