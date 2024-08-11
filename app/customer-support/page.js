'use client'

import { useRouter } from 'next/navigation'
import { AppBar, Box, Button, Container, createTheme, CssBaseline, IconButton, Menu, MenuItem, Stack, styled, TextField, ThemeProvider, Toolbar, Typography } from '@mui/material'
import SmartToyIcon from '@mui/icons-material/SmartToy';
import React, { useEffect, useRef, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/firebase';
import { AccountCircle, AccountCircleOutlined, BeachAccess, Logout } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        primary: {
          main: '#121212',
          contrastText: '#ffffff',
          
        },
        secondary: {
          main: '#e5e7eb', // Light grey
        },
        background:{
          default:'#171717'
        },
        error: {
          main: '#dc2626',
        },
      },});


const Header = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1,2),
    position:'relative',
    width:'100%',
    padding: 10,
}));

const HeaderContent = styled(Container) (({ theme })=> ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0',
    margin: '0',
    [theme.breakpoints.down('sm')]:{
        flexDirection: 'row',
        alignItems: 'center',
    },
}));

const HeaderText = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  fontSize: '1rem', // Smaller text
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.875rem', // Smaller text on small screens
  },
}));

const Footer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  textAlign: 'center',
  position: 'fixed',
  bottom: 0,
  width: '100%',
}));

const CustomerSupport = () => {
  const [messages, setMessages] = useState([{
    role:'assistant',
    content: `Hi I'm the JustAI Support Agent, How can I help you?`
  }])
  const [message, setMessage] = useState('')
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu
  const [userEmail, setUserEmail] = useState(''); // State to hold user email
  const [userUid, setUserUid] = useState(''); // State to hold user UID
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // State to hold


  const sendMessage = async () => {
    if(!message.trim()|| isLoading) return;
    setIsLoading(true);
    setMessage('')  // Clear the input field
    setMessages((messages) => [
    ...messages,
    { role: 'user', content: message },  // Add the user's message to the chat
    { role: 'assistant', content: '' },  // Add a placeholder for the assistant's response
  ])

  // Send the message to the server
  const response = fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([...messages, { role: 'user', content: message }]),
  }).then(async (res) => {
    const reader = res.body.getReader()  // Get a reader to read the response body
    const decoder = new TextDecoder()  // Create a decoder to decode the response text

    let result = ''
    // Function to process the text from the response
    return reader.read().then(function processText({ done, value }) {
      if (done) {
        return result
      }
      const text = decoder.decode(value || new Uint8Array(), { stream: true })  // Decode the text
      setMessages((messages) => {
        let lastMessage = messages[messages.length - 1]  // Get the last message (assistant's placeholder)
        let otherMessages = messages.slice(0, messages.length - 1)  // Get all other messages
        return [
          ...otherMessages,
          { ...lastMessage, content: lastMessage.content + text },  // Append the decoded text to the assistant's message
        ]
      })
      return reader.read().then(processText)
        // Continue reading the next chunk of the response
    })
  })
  setIsLoading(false)
}

const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !event.shiftKey){
    event.preventDefault()
    sendMessage()
}}



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            if (user) {
                setUserEmail(user.email);
                setUserUid(user.uid); 
            }else{
                setUserEmail('');
                setUserUid('');
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await signOut(auth);
        router.push('/')
    };

    const handleMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleMenuClose =() => {
        setAnchorEl(null);
    };

    const messageEndRef = useRef(null)
    const scrollToBottom = () => {
      messageEndRef.current?.scrollIntoView({behavior:'smooth'})
    }

    useEffect(() => {
      scrollToBottom()
    }, [messages])
    
    return (
        <ThemeProvider theme = {theme}>
            <Header>
              <CssBaseline />
                <HeaderContent maxWidth = '2000'>
                    <a href = '/' style={{display: 'flex', alignItems:'center', color:'inherit', textDecoration:'none'  }}>
                        <SmartToyIcon fontSize = 'medium' />
                        <HeaderText variant = 'h6' component ='span'> JustAI</HeaderText>
                    </a>
                    <IconButton
                    onClick={handleMenuOpen}
                    sx = {{marginLeft: 'auto'}}
                    color='inherit'>
                        <AccountCircleOutlined fontSize='large' />
                    </IconButton>
                    <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}>
                        <MenuItem>
                        <Typography variant = 'body2'>{userEmail}</Typography>
                        </MenuItem>
                        <MenuItem onClick={handleSignOut}>
                            <Logout fontSize="small" />
                            <Typography variant="body2" sx={{ marginLeft: 1 }}>Sign Out</Typography>
                        </MenuItem>
                    </Menu> 
                </HeaderContent>
            </Header>
                  <Stack direction="column" spacing = {1} flexGrow ={1} overflow='auto' minHeight="100%" height ="600px"
                  p="25px" bgcolor="ghostwhite" border= "1px solid black" width="auto" > 
                    {
                      messages.map((message,index) => (
                        <Box 
                          key = {index}
                          display="flex"
                          flexDirection = "row"
                          justifyContent= {message.role === 'assistant'?'flex-start':'flex-end'}>
                          <Box 
                          bgcolor={message.role === 'assistant'?"#121212":"#111111"}
                          color="white"
                          borderRadius={16}
                          p ={3}> {message.content}</Box>
                        </Box>
                      ))
                    }
                    <div ref = {messageEndRef}/>
                  </Stack>
                  <Stack direction="row" spacing = {2} justifyContent="space-between" bgcolor="ghostwhite">
                    <TextField
                      label = 'message'
                      width = "300px"
                      fullWidth 
                      value={message} 
                      onChange={(e) => setMessage(e.target.value)} 
                      placeholder="Type a message..." 
                      onKeyPress={handleKeyPress}
                      disabled = {isLoading}
                      />
                    <Button variant="contained" color="primary" onClick ={sendMessage} disabled = {isLoading}>{isLoading?'Sending': 'Send'}
                    </Button>
                  </Stack>
        </ThemeProvider>
    )
}

export default CustomerSupport

