import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const StyledLayout = styled.div`
    margin-top: 25px;
`
const ExpenseChartTitle = styled(TextField)`
    margin-left: 64px;
    margin-bottom: 25px;
    font-family: 'kailasa';
    font-weight: bold;
    font-size: larger;
    color: white;
    & label.Mui-focused {
        color: white;
    }
    & .MuiOutlinedInput-root {
        &.Mui-focused fieldset {
            border-color: white;
        }
    }
`
const StyledChart = styled(Box)`
    background-color: white;
    margin-left: 64px;
    height: 500px;
    width: 70%;
    box-shadow: 3;
`;

const StyledOptionOne = styled(Box)`
    height: 600px;
    width: 500px;
    margin-top: 20%;
    margin-left: 15%;
    float: left;
`
const StyledOptionTwo = styled(Box)`
    height: 600px;
    width: 500px;
    margin-top: 20%;
    margin-left: 10%;
    float: left;
`

const StyledButtton = styled(Button)`
    padding-left: 5px;
`

export {StyledLayout, StyledChart, ExpenseChartTitle, StyledOptionOne, StyledOptionTwo, StyledButtton}