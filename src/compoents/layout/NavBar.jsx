import React, { useState } from 'react';
import { AppBar, Toolbar, ListItemIcon, IconButton, Menu, MenuItem, Grid, Button, Avatar, Divider, Tooltip } from '@mui/material';
import { useAuth } from '@/providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { Logout, Settings } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material';

const StyledLink = styled(Link)(({ theme: { breakpoints, spacing, palette } }) => ({
    fontFamily: 'Space Mono',
    color: palette.common.black,
    textDecoration: 'none',
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
    textDecoration: 'none',
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
    '&:hover': {
        color: palette.primary.main,
        textDecoration: 'underline',
        backgroundColor: 'rgba(73, 86, 203, 0)',
        letterSpacing: '1px',
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
    const { user } = useAuth();
    const navigate = useNavigate();
    const [ mobileSubmenuOpen, setMobileSubmenuOpen ] = useState(null);
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

    // dropdown menu items
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
            {
                label: 'Become a Mentor', href: '/mentor/create', isInternal: true, isAuth: true 
            },
            { label: 'Events', href: '/event/all', isInternal: true },
            {
                label: 'Members', href: '/member/all', isInternal: true, isAuth: true 
            },
        ],
        resources: [{ label: 'Tech Role Quiz', href: 'https://www.quiz.techbychoice.org' }],
    };

    // Define navigation items
    const navigationItems = [
        {
            label: 'About Us',
            children: menuItems.about,
        },
        {
            label: 'Programs',
            children: menuItems.programs,
        },
        {
            label: 'Get Involved',
            children: menuItems.getInvolved,
        },
        {
            label: 'Resources',
            children: menuItems.resources,
        },
    ];

    // Function to toggle mobile submenu
    const toggleMobileSubmenu = menu => {
        setMobileSubmenuOpen(mobileSubmenuOpen === menu ? null : menu);
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

    const handelLogout = event => {
        event.preventDefault();
        navigate('/dashboard', { replace: true });
        auth.logout();
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderMenuButton = (label, items) => (
        <>
            <StyledButtonDropdown aria-haspopup="true" onClick={handleOpenMenu(label.toLowerCase())}>
                {label} <ExpandMoreIcon style={{ transform: menuStates[label.toLowerCase()] ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </StyledButtonDropdown>
            <Menu anchorEl={menuStates[label.toLowerCase()]} open={Boolean(menuStates[label.toLowerCase()])} onClose={handleCloseMenu(label.toLowerCase())}>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        {((item.isAuth && auth?.isAuthenticated) || item.isAuth === false || item.isAuth === undefined) && (
                            <StyledMenuItem onClick={handleCloseMenu(label.toLowerCase())}>
                                {item.isInternal ? (
                                    <StyledLink to={item.href}>{item.label}</StyledLink>
                                ) : (
                                    <StyledMuiLink href={item.href} target="_blank" rel="noopener noreferrer">
                                        {item.label}
                                    </StyledMuiLink>
                                )}
                            </StyledMenuItem>
                        )}
                    </React.Fragment>
                ))}
            </Menu>
        </>
    );

    const renderProfileDropdown = () => (
        <>
            {auth.isAuthenticated ? (
                <>
                    <Tooltip title="Account settings">
                        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                            <Avatar sx={{ width: 32, height: 32 }}>{user?.[0]?.user_info?.first_name[0]}</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem
                            onClick={() => {
                                handleClose();
                                history('/profile');
                            }}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Profile
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handelLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </>
            ) : (
                <>
                    <StyledLink to="/">Login</StyledLink>
                    <StyledLink to="/new">Create Account</StyledLink>
                </>
            )}
        </>
    );

    // Function to render the Donate button
    const renderDonateButton = () => (
        <Button variant="contained" color="primary" sx={{ margin: theme.spacing(1) }}>
            Donate
        </Button>
    );

    const renderMobileSubmenu = (label, items) => {
        const isOpen = mobileSubmenuOpen === label;
        return (
            <>
                <MenuItem onClick={() => toggleMobileSubmenu(label)}>
                    {label}
                    <ExpandMoreIcon style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </MenuItem>
                {isOpen &&
                    items.map((item, index) => (
                        <MenuItem key={index} onClick={handleClose}>
                            {item.isInternal ? (
                                <StyledLink to={item.href}>{item.label}</StyledLink>
                            ) : (
                                <StyledMuiLink href={item.href} target="_blank" rel="noopener noreferrer">
                                    {item.label}
                                </StyledMuiLink>
                            )}
                        </MenuItem>
                    ))}
            </>
        );
    };

    // Function to render desktop navigation
    const renderDesktopNavigation = () => (
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
            {navigationItems.map(section => (
                <Grid item key={section.label}>
                    {renderMenuButton(section.label, section.children)}
                </Grid>
            ))}
            <Grid item>{renderDonateButton()}</Grid>
            <Grid item>{renderProfileDropdown()}</Grid>
        </Grid>
    );

    // Function to render mobile navigation
    const renderMobileNavigation = () => (
        <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
                <MenuIcon />
            </IconButton>
            <Menu id="menu-appbar" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                {navigationItems.map(section => renderMobileSubmenu(section.label, section.children))}
                <MenuItem onClick={handleClose}>{renderDonateButton()}</MenuItem>
                <MenuItem
                    onClick={() => {
                        handleClose();
                        history('/profile');
                    }}>
                    Profile
                </MenuItem>
                <MenuItem onClick={handelLogout}>Logout</MenuItem>
            </Menu>
        </>
    );

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
            <Toolbar>{isMobile ? renderMobileNavigation() : renderDesktopNavigation()}</Toolbar>
        </AppBar>
    );
}
