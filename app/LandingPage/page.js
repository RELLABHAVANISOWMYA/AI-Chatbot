'use client'

import { useRouter } from 'next/navigation'
import { AppBar, Box, Button, Container, createTheme, CssBaseline, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'

const theme = createTheme(({
    palette:{
        primary:{
            main: '#111111',
            contrastText: '#ffffff',
        },
        secondary:{
            main:'#e5e7eb',
        },
        background:{
            default:'#171717',
        },
        text:{
            primary:'#ffffff',
            secondary:'#e5e7eb'

        },
    },
}));

const LandingPage = () => {
    const router = useRouter();

    const handleSignIn = () => {
        router.push('/signin');
    };

    return (
        <ThemeProvider theme = {theme}>
            <CssBaseline />
            <AppBar position='static' color = 'primary'>
                <Toolbar>
                    <Typography variant = 'h6' color = 'inherit'>
                        JustAI 
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth='md'>
                <Box display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                minHeight='80vh'
                textAlign='center'>
                    <Typography variant = 'h3' component = 'h1' gutterBottom>
                        Welcome to a customer support for justAI
                    </Typography>
                    <Typography variant = 'h6' component = 'h2'  padding = '5px' gutterBottom>
                        unique customer experience like you never had
                    </Typography>
                    <Button variant = 'contained' color = 'secondary' onClick = {handleSignIn} sx = {{mt:4}}>
                        Sign In
                    </Button>
                </Box>
            </Container>





        </ThemeProvider>
    )
}

export default LandingPage

