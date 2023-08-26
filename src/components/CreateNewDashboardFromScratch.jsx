import React from 'react';
import {StyledLayout, StyledChart, ExpenseChartTitle} from './CreateNewDashboard.styled';

const CreateNewDashboardFromScratch = () => {
    return (
        <StyledLayout>
            <span>
                <ExpenseChartTitle
                    required
                    id="outlined-chart-title"
                    label="Required"
                    defaultValue="Untitled"
                    focused
                    sx={{ input: { color: 'white' } }}
                />
            </span>
            <br/>
            <StyledChart
                sx={{ boxShadow: 5, borderRight: 0, borderLeft: 0, borderTop: 1, borderBottom: 1 }}
            >
                HELLO
            </StyledChart>
        </StyledLayout>
    )
}

export default CreateNewDashboardFromScratch;