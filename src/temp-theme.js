import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: { main: '#4956CB' },
        secondary: { main: '#F2BB1C' },
        // info: {
        //     // You can refer directly to the main color of secondary here
        //     main: '#edf2ff',
        // },
        background: {
            default: '#F7F1E1',
            paper: '#FDF7E9',
        },
    },
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    fontWeight: 'bold',
                    borderRadius: '8px', // Example for border radius
                    // You can add more styles here
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    border: '2px solid #817f79',
                    // boxShadow: 'none', // Example to remove default box-shadow
                    // Additional default styles here
                },
            },
        },
        // You can override other components here
    },
});

export default theme;
