// index.js
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; 
import App from './App';
import { lightTheme, darkTheme } from './Theme';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { Container } from '@mui/material';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const AppWrapper = () => {
    const [theme, setTheme] = React.useState('light'); 

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
          <Container style={{maxWidth:"xl", width: '100%', maxWidth: 'none', margin:0, padding:0}}>
            <BrowserRouter basename={baseUrl}>
                <App toggleTheme={toggleTheme} currentTheme={theme} />
            </BrowserRouter>
            </Container>
        </ThemeProvider>
    );
};

root.render(<AppWrapper />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
//serviceWorkerRegistration.register();
// In your index.js or App.js

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.error('Error during service worker registration:', error);
        });
    });
  }
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
