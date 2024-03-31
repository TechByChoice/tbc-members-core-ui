import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material';

const StyledLink = styled(Link)(({ theme: { breakpoints, spacing, palette } }) => ({
    fontFamily: 'Space Mono',
    color: palette.common.black,
    transition: 'all .2s',
    margin: spacing(1),
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
    margin: spacing(1),
    '&:hover': {
        color: palette.primary.main,
        letterSpacing: '1px',
    },
}));

const StyledButtonDropdown = styled(Button)(({ theme: { breakpoints, spacing, palette } }) => ({
    fontFamily: 'Space Mono',
    color: palette.common.black,
    transition: 'all .2s',
    textDecorationColor: palette.common.black,
    margin: spacing(1),
    fontWeight: 'normal',
    textTransform: 'capitalize',
    textDecoration: 'underline',
    fontSize: '1rem',
    '&:after': {
        content: '"\\2304"',
        position: 'relative',
        top: '-5px',
        left: '4px',
        fontSize: '1.2rem',
        textDecoration: 'none',
    },
    '&:hover': {
        color: palette.primary.main,
        textDecoration: 'underline',
        backgroundColor: 'rgba(73, 86, 203, 0)',
        letterSpacing: '1px',
    },
}));

const StyledMenuItemLink = styled(MuiLink)(({ theme }) => ({
    // Add your styling here
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        '&::after': {
            content: '""',
            display: 'block',
            height: '3px',
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        },
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        '&::after': {
            content: '""',
            display: 'block',
            height: '5px',
            backgroundColor: theme.palette.primary.main,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        },
    },
}));

export default function NavBar() {
    const auth = useAuth();
    const navigate = useNavigate();
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const open = Boolean(anchorEl);
    const history = useNavigate();
    const [ menuStates, setMenuStates ] = useState({
        about: null,
        programs: null,
        getInvolved: null,
        resources: null,
    });

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const menuItems = {
        about: [
            { label: 'Mission & Vision', href: 'https://www.techbychoice.org/mission-values' },
            { label: 'Team', href: 'https://www.techbychoice.org/team' },
            { label: 'TBC DAO', href: 'https://www.techbychoice.org/dao' },
            { label: 'Code of Conduct', href: 'https://www.techbychoice.org/code-of-conduct' },
        ],
        programs: [
            { label: 'Talent Choice', href: 'https://www.techbychoice.org/talent-choice' },
            { label: "Tech's Advocates", href: 'https://www.techbychoice.org/techs-advocates' },
            { label: 'TBC Online', href: 'https://www.techbychoice.org/programs/tbc-online' },
            { label: 'Paid Source', href: 'https://www.techbychoice.org/programs/tbc-together' },
        ],
        getInvolved: [
            { label: 'Become a Speaker', href: 'https://www.techbychoice.org/teach' },
            { label: 'Volunteer', href: 'https://www.techbychoice.org/volunteer' },
            { label: 'Become a Mentor', href: '/mentor/create', isInternal: true },
        ],
        resources: [{ label: 'Tech Role Quiz', href: 'https://www.quiz.techbychoice.org' }],
        // ... other menus
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleOpenMenu = menu => event => {
        setMenuStates({ ...menuStates, [menu]: event.currentTarget });
    };

    const handleCloseMenu = menu => () => {
        setMenuStates({ ...menuStates, [menu]: null });
    };

    const renderMenuButton = (label, items) => (
        <>
            <StyledButtonDropdown aria-haspopup="true" onClick={handleOpenMenu(label.toLowerCase())}>
                {label}
            </StyledButtonDropdown>
            <Menu anchorEl={menuStates[label.toLowerCase()]} open={Boolean(menuStates[label.toLowerCase()])} onClose={handleCloseMenu(label.toLowerCase())}>
                {items.map((item, index) => (
                    <StyledMenuItem key={index} onClick={handleCloseMenu(label.toLowerCase())}>
                        {item.isInternal ? (
                            <>
                                <StyledLink to={item.href}>{item.label}</StyledLink>
                            </>
                        ) : (
                            <>
                                <StyledMuiLink href={item.href} target="_blank" rel="noopener noreferrer">
                                    {item.label}
                                </StyledMuiLink>
                            </>
                        )}
                    </StyledMenuItem>
                ))}
            </Menu>
        </>
    );
    const handelLogout = event => {
        event.preventDefault();
        navigate('/dashboard', { replace: true });
        auth.logout();
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar elevation={0} position="static" color="transparent">
            {/* Top row with logo */}
            <Toolbar style={{ display: 'flex', justifyContent: 'center' }} justify="center" id="hey" display="flex">
                <Grid alignItems="center">
                    <Grid item justifyContent="center">
                        <StyledLink to="/dashboard">
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
                {isMobile ? (
                    // Mobile view with hamburger menu
                    <>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            KeepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}>
                            {auth.isAuthenticated && (
                                <MenuItem onClick={handleClose}>
                                    <StyledLink to="/dashboard">Dashboard</StyledLink>
                                </MenuItem>
                            )}
                            <MenuItem onClick={handleClose}>
                                <StyledMuiLink target="_blank" href="">
                                    About Us
                                </StyledMuiLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <StyledMuiLink target="_blank" href="">
                                    Programs
                                </StyledMuiLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <StyledLink to="/event/all">Events</StyledLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <StyledLink to="/member/all">Members</StyledLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <StyledMuiLink target="_blank" href="https://www.techbychoice.org/blog">
                                    Blog
                                </StyledMuiLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <StyledMuiLink target="_blank" href="">
                                    Get Involved
                                </StyledMuiLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Button variant="contained" color="primary">
                                    Donate
                                </Button>
                            </MenuItem>
                            {auth.isAuthenticated ? (
                                <>
                                    <MenuItem
                                        onClick={() => {
                                            handleClose();
                                            history('/profile');
                                        }}>
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={handelLogout}>Logout</MenuItem>
                                </>
                            ) : (
                                <>
                                    <MenuItem onClick={handleClose}>
                                        <StyledLink to="/">Login</StyledLink>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <StyledLink to="/new">Create Account</StyledLink>
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                    </>
                ) : (
                    <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
                        <Grid item justify="left" alignItems="center">
                            {/* Links */}
                            <Grid container spacing={2} alignItems="center" justify="center">
                                {auth.isAuthenticated && (
                                    <Grid item>
                                        <StyledLink to="/dashboard">Dashboard</StyledLink>
                                    </Grid>
                                )}
                                <Grid item>{renderMenuButton('About Us', menuItems.about)}</Grid>
                                <Grid item>{renderMenuButton('Programs', menuItems.programs)}</Grid>
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
                                <Grid item>{renderMenuButton('Get Involved', menuItems.getInvolved)}</Grid>
                                <Grid item>{renderMenuButton('Get Resources', menuItems.resources)}</Grid>

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
                                            sx={{
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
                )}
            </Toolbar>
        </AppBar>
    );
}
