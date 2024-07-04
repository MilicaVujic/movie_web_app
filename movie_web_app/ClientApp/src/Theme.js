// theme.js

import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2196f3', // Promenite ovo prema vašim potrebama
        },
        secondary: {
            main: '#f50057', // Promenite ovo prema vašim potrebama
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9', // Promenite ovo prema vašim potrebama
        },
        secondary: {
            main: '#f48fb1', // Promenite ovo prema vašim potrebama
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: '#424242', // Boja pozadine za TextField u tamnoj temi
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    backgroundColor: '#424242', // Boja pozadine za Select u tamnoj temi
                },
            },
        },
        MuiContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: '#808080', 
                },
            },
        },
    },
});
