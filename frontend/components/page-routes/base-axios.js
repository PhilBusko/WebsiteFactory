/**************************************************************************************************
BASE AXIOS PAGE
**************************************************************************************************/
import { useState, useEffect } from 'react';
import { Button, TextField, Autocomplete, FormHelperText } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FormControlLabel, Checkbox } from '@mui/material';
import { Grid, Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import AxiosConfig from '../app-main/axios-config';
import PageLayout from  '../layout/page-layout';
import * as ST from  '../elements/styled-elements';
import StackForm from '../elements/stack-form';
import PaginatedTable from '../elements/paginated-table';
import DisplayDict from '../elements/display-dict';


const AxiosImage = styled('img')(({ theme }) => ({
    width: '350px',
    [theme.breakpoints.down('md')]: {width: '280px'},
}));

function BaseAxios(props) {

    // form submission

    const [userName, setUserName] = useState('');
    const [userNameError, setUserNameError] = useState(null);
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

    const handleThemeGroup = (event) => {
        const legoTheme = event.target.value;
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
                        <ST.SpecialText>BASE AXIOS</ST.SpecialText>
                    </ST.TitleGroup>
                </Grid>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <ST.ContentCard elevation={3}> 
                        <StackForm width='260px'>

                            <TextField 
                                value={ userName } error={ !!userNameError } helperText={ userNameError }
                                onChange={(event) => { setUserName(event.target.value); }}
                                variant='outlined' label='Text Entry' size='small'/>

                            <FormControlLabel label='Option One' labelPlacement='end'
                                control={<Checkbox checked={optionChecked} 
                                            onChange={(event) => { setOptionChecked(event.target.checked); }}
                                            sx={{ 'padding': '0 8px' }} 
                                        />} 
                            />

                            <ST.SmallButton onClick={ () => { alert('Button Effect'); }}>
                                <ST.BaseText>Small Button</ST.BaseText>
                            </ST.SmallButton>

                            <ST.BoxSpaceBetween sx={{ alignItems: 'flex-start' }}>
                                <Box sx={{ paddingRight: '6px' }}>
                                    <FormHelperText value={formResult}>{formResult}</FormHelperText>
                                </Box>
                                <Box>
                                    <Button type='submit' onClick={ handleSubmit } variant='contained'>Send Form</Button>
                                </Box>
                            </ST.BoxSpaceBetween>

                        </StackForm>
                    </ST.ContentCard>
                </ST.GridItemCenter>

                <ST.GridItemCenter item xs={12} lg={6}>
                    <ST.ContentCard elevation={3}> 
                        <AxiosImage src={require('../assets/lego-set.jpg')} />
                    </ST.ContentCard>
                </ST.GridItemCenter>

                <ST.GridItemCenter item xs={12} lg={8}>
                    <ST.ContentCard elevation={3}> 
                        <Stack spacing='16px'>

                            <FormControl size='small' sx={{ width: '200px' }}>
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

                            <PaginatedTable dataLs={setsByTheme}>
                            </PaginatedTable>

                        </Stack>
                    </ST.ContentCard>
                </ST.GridItemCenter>



                <ST.GridItemCenter item xs={12} lg={4}>
                    <ST.ContentCard elevation={3}> 
                        <Stack spacing='16px'>

                            <Autocomplete
                                options={nameOptions} 
                                value={setName} 
                                onChange={handleSetName}
                                //inputValue={setInput} onInputChange={handleSetInput} 
                                //open={ setInput.length > 2 } 
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} label='Set Name'/>}
                                sx={{ width: '300px' }} size='small' /> 

                            <DisplayDict infoDx={setInfo}>
                            </DisplayDict>

                        </Stack>
                    </ST.ContentCard>
                </ST.GridItemCenter>

            </ST.GridPage >
        </PageLayout>
    );
}

export default BaseAxios;
