import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const ExpenseReporterHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const open = Boolean(menuOpen);
    const handleClick = (event) => {
        setMenuOpen(event.currentTarget);
    };
    const handleClose = () => {
        setMenuOpen(null);
    };

    // Render menu items when hamburger menu is clicked
    const renderMenuItems = () => {
        return (
            <Menu
                id="header-menu-button" 
                aria-labelledby="header-menu-button"
                anchorEl={menuOpen}
                open={open}
                onClose={handleClose}
                // anchorOrigin={{
                //     vertical: 'top',
                //     horizontal: 'left',
                // }}
                // transformOrigin={{
                //     vertical: 'top',
                //     horizontal: 'left',
                // }}
            >
                <MenuItem>
                    Show Dashboards
                </MenuItem>
                <MenuItem>
                    Create New Dashboard 
                </MenuItem>
            </Menu>
        );
    }

    return (
        <Box > 
            <AppBar position="static">
                <Toolbar variant="dense" sx={{backgroundColor: '#2D313C', boxShadow: 3}}>
                <IconButton
                    id="menu-icon-button" 
                    edge="start" 
                    color="inherit" 
                    aria-label="menu" 
                    sx={{ mr: 2 }} 
                    onClick={handleClick}
                    aria-controls={open ? 'menu-icon-button' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <MenuIcon/>
                </IconButton>
                {renderMenuItems()}
                <Typography variant="h6" className='header-title-style' component="div">
                    Expense Reporter
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default ExpenseReporterHeader;