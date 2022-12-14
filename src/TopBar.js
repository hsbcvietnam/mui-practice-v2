import React from 'react';
import { styled, alpha, AppBar, Toolbar, Typography, InputBase, Backdrop, Modal, Box, Fade } from '@mui/material';
import SignInBox from './SignInBox';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '0',
  borderRadius: '20px 20px 20px 20px',
  boxShadow: 24,
  p: 4,
  outline: 0
};
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '36ch',
        '&:focus': {
          width: '60ch',
        },
      },
    },
}));

function TopBar({isSignedIn, setIsSignedIn, open, handleOpen, handleClose}) {
  return (
    <AppBar position="static">
      <Toolbar sx={{ background: '#000000' }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' }, marginRight: '20%', marginLeft: '2.5%' }}
        >
          Job Routing
        </Typography>
        <Search>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        {
          (isSignedIn) ? (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, marginRight: '2.5%', textAlign: 'right' }}
              onClick={() => setIsSignedIn(1-isSignedIn)}
            >
              Sign Out
            </Typography>
          ) : (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, marginRight: '2.5%', textAlign: 'right' }}
              onClick={handleOpen}
            >
              Sign In
            </Typography>
          )
        }
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <SignInBox isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} handleClose={handleClose} ></SignInBox>
            </Box>
          </Fade>
        </Modal>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar