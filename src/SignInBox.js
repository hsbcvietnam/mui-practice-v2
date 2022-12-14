import React from 'react'
import { Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';

function SignInBox({isSignedIn, setIsSignedIn, handleClose}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [display, setDisplay] = useState('none')
    const handleSignIn = () => {
        if ((username === 'Phuc') && (password === 'Elaina')) {
            setIsSignedIn(true)
            handleClose()
        } else {
            setDisplay('block')
        }
    }

    return (
        <div>
            <Typography id="transition-modal-title" variant="h6" component="h2">
                Sign In
            </Typography>
            <TextField label="Username" variant="standard" sx={{width: '90%', marginTop: '2.5%'}} value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField
                type="password"
                value={password}
                variant="standard"
                sx={{width: '90%', marginTop: '2.5%'}}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
            />
            <Typography variant="h6" component="h2" sx={{fontSize: '0.8em', marginTop: '2.5%', display: {display}, color: '#db0011'}}>Incorrect ID or Password</Typography>
            <Button variant="outlined" sx={{marginTop: '5%'}} onClick={handleSignIn} >Sign In</Button>
        </div>
    )
}

export default SignInBox