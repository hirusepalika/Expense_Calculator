import React, {useEffect, useState} from 'react';
import {StyledOptionOne, StyledOptionTwo, StyledButtton} from './CreateNewDashboard.styled';
import { Box, Button, Card, CardContent, CardActions, Typography } from '@mui/material';
import {FileUpload }from '@mui/icons-material';
import { useNavigate } from "react-router-dom";

const CreateNewDashboard = () => {
    console.log("am i even hereeee")
    const [showOptions, setShowOptions] = useState(true);
    const history = useNavigate();

    const handleUploadFileClick = () => {
        history("/UploadNewDashboard")
        setShowOptions(false);
    };

    const handleCreateNewDashboard = () => {
        history("/CreateNewDashboard")
        setShowOptions(false);
    };

    return (
        showOptions ? (
            <>  
                <div>
                    <StyledOptionOne>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Option 1
                                </Typography>
                                <Typography variant="h5" component="div">
                                Create Expense Dashboard from Scratch
                                </Typography>
                                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    adjective
                                </Typography> */}
                                <Typography variant="body2">
                                Through this option, you can add/remove expense items and generate bar chart for easy visualization of your spending.
                                </Typography>
                            </CardContent>
                                <CardActions>
                                <Button variant="outlined" onClick={handleCreateNewDashboard}>Create New Dashboard</Button>
                                </CardActions>
                        </Card>
                    </StyledOptionOne>
                </div>
                <div>
                    <StyledOptionTwo>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Option 2
                                </Typography>
                                <Typography variant="h5" component="div">
                                Import Dashboard from File
                                </Typography>
                                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    adjective
                                </Typography> */}
                                <Typography variant="body2">
                                    Through this option, you can generate expense chart and visualize expense table using an existing sheet.
                                </Typography>
                            </CardContent>
                                <CardActions>
                                    <StyledButtton variant="outlined" onClick={handleUploadFileClick}><FileUpload/>Import from File</StyledButtton>
                                </CardActions>
                        </Card>
                    </StyledOptionTwo>
                </div>
            </>
        ) : null
    ); 
}

export default CreateNewDashboard;