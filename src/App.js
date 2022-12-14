import React from 'react';
import TopBar from './TopBar';
import { Box } from '@mui/material';
import PageContent from './PageContent';
import './App.css'
import { useState } from 'react';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [contentId, setContentId] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
        <TopBar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} open={open} handleOpen={handleOpen} handleClose={handleClose} />
        <PageContent isSignedIn={isSignedIn} handleOpen={handleOpen} contentId={contentId} setContentId={setContentId} />
    </Box>
  )
}

export default App