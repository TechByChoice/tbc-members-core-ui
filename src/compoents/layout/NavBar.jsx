import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';

const StyledLink = styled(Link)(({ theme: { breakpoints, spacing, palette } }) => ({
    fontFamily: 'Space Mono',
    color: palette.common.black,
    transition: 'all .2s',
    '&:hover': {
        color: palette.primary.main,
        letterSpacing: '1px',
    },
}));

const StyledMuiLink = styled(MuiLink)(({ theme: { breakpoints, spacing, palette } }) => ({
    fontFamily: 'Space Mono',
    color: palette.common.black,
    transition: 'all .2s',
    textDecorationColor: palette.common.black,
    '&:hover': {
        color: palette.primary.main,
        letterSpacing: '1px',
    },
}));
export default function NavBar() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const open = Boolean(anchorEl);
    const history = useNavigate();
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handelLogout = event => {
        event.preventDefault();
        navigate('/dashboard', { replace: true });
        auth.logout();
    };
    return (
        <AppBar elevation={0} position="static" color="transparent">
            {/* Top row with logo */}
            <Toolbar style={{ display: 'flex', justifyContent: 'center' }} justify="center" id="hey" display="flex">
                <Grid alignItems="center">
                    <Grid item justifyContent="center">
                        <StyledLink to="/dashboardd">
                            <img
                                alt="Tech by Choice Logo"
                                height="50px"
                                src="https://uploads-ssl.webflow.com/5fc123904bcd576087dd38e2/6071eb46472b5c02f7dbd662_tbc-logo.svg"
                            />
                        </StyledLink>
                    </Grid>
                </Grid>
            </Toolbar>

            {/* Bottom row with links and buttons */}
            <Toolbar>
                <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
                    <Grid item justify="left" alignItems="center">
                        {/* Links */}
                        <Grid container spacing={2} alignItems="center" justify="center">
                            {auth.isAuthenticated && (
                                <Grid item>
                                    <StyledLink to="/dashboard">Dashboard</StyledLink>
                                </Grid>
                            )}
                            <Grid item>
                                <StyledMuiLink target="_blank" href="">
                                    About Us
                                </StyledMuiLink>
                            </Grid>
                            <Grid item>
                                <StyledMuiLink target="_blank" href="">
                                    Programs
                                </StyledMuiLink>
                            </Grid>
                            <Grid item>
                                <StyledLink to="/event/all">Events</StyledLink>
                            </Grid>
                            <Grid item>
                                <StyledLink to="/member/all">Members</StyledLink>
                            </Grid>
                            <Grid item>
                                <StyledMuiLink target="_blank" href="https://www.techbychoice.org/blog">
                                    Blog
                                </StyledMuiLink>
                            </Grid>
                            <Grid item>
                                <StyledMuiLink target="_blank" href="">
                                    Get Involved
                                </StyledMuiLink>
                            </Grid>

                            {/*<Grid  style={{ display: 'flex', justifyContent: 'center'}}>*/}
                            <Grid item>
                                <Button variant="contained" color="primary">
                                    Donate
                                </Button>
                            </Grid>
                            {/*</Grid>*/}
                            {auth.isAuthenticated ? (
                                <>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ ml: 2 }}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}>
                                            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        anchorEl={anchorEl}
                                        id="account-menu"
                                        open={open}
                                        onClose={handleClose}
                                        onClick={handleClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                                        <MenuItem onClick={handleClose}>
                                            <Avatar />
                                            <div onClick={() => history('/profile')}>Profile</div>
                                        </MenuItem>
                                        <Divider />
                                        <MenuItem onClick={handleClose}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            <div onClick={handelLogout}>Logout</div>
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <StyledLink to="/">Login</StyledLink>
                                    <StyledLink to="/new">Create Account</StyledLink>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}
