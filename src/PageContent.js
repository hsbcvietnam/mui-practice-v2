import React, { useState } from 'react';
import { styled, Grid, Paper, Pagination, Stack, Typography, Button, Modal, Fade, Box, Backdrop } from '@mui/material';
import jobs from './jobs';
import { useEffect } from 'react';
import { SettingsCellOutlined } from '@mui/icons-material';

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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: '100%'
}));

function PageContent({isSignedIn, handleOpen, contentId, setContentId}) {
    const [page, setPage] = useState(1);
    const [itemOffset, setItemOffset] = useState(0);
    const [openContent, setOpenContent] = useState(false);
    const [count, setCount] = useState(0);
    const currentItems = jobs.slice(itemOffset, itemOffset + 6);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        setItemOffset((value * 6) - 6);
    };

    const handleCloseContent = () => {
        setOpenContent(false);
        setContentId('');
        setCount(0)
    }

    const handleContentClick = (id) => {
        if (!isSignedIn) {
            setCount(count + 1);
            setContentId(id);
            return
        }
        if (id === contentId) {
            setContentId('');
        } else {
            setContentId(id)
        }
    }

    useEffect(() => {        
        console.log(isSignedIn, contentId, count)
        if (!contentId && !count) {
            return
        } else if (!isSignedIn) {
            handleOpen()
        } else {
            setOpenContent(true)
        }
    }, [contentId, isSignedIn, count])
    

    return (
    <Grid container rowSpacing={4} columnSpacing={2} sx={{ marginTop: '2%', padding: '0 5%' }}>
        {currentItems.map((currentItem) => (
            <Grid key={currentItem.id} item xs={12} sm={6} md={4}>
                <Item>
                    <Typography sx={{textAlign: 'center'}}><h3>{currentItem.title}</h3></Typography>
                    <hr />
                    {
                        currentItem.skills.slice(0, 4).map((skill) => (
                            <Grid key={`${currentItem.id}-${skill}`} item xs={12} sx={{borderRadius: '10px', background: '#db0011', textAlign: 'center', padding: '10px', margin: '5px', flexGrow: '1', display: 'inline-block'}}>
                                <Typography sx={{fontSize: '10px', color: '#FFFFFF'}}>{skill}</Typography>
                            </Grid>
                        ))
                    }
                    <Typography sx={{textAlign: 'left', margin: '5px', display: 'block'}}><p>{currentItem.description}</p></Typography>
                    <Button id={currentItem.id} variant='outlined' onClick={(e) => {handleContentClick(e.target.id)}} sx={{margin: '0 auto', display: 'block'}}>LEARN MORE</Button>
                </Item>
            </Grid>
        ))}
        <Grid item xs={12}>
            <Stack spacing={2}>
                <Pagination 
                    count={Math.floor(jobs.length / 5) + 1} 
                    color="primary"
                    page={page}
                    onChange={handleChange}
                    sx={{marginLeft: 'auto', marginRight: 'auto'}}
                />
            </Stack>
        </Grid>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openContent}
            onClose={handleCloseContent}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openContent}>
                <Box sx={style}>
                    {jobs.map((job) => {
                        if (job.id === contentId) {
                            return(
                                <>
                                    <Typography sx={{textAlign: 'center'}}><h3>{job.title}</h3></Typography>
                                    <hr />
                                    <Typography sx={{textAlign: 'left', margin: '5px', display: 'block'}}><p>{job.description}</p></Typography>
                                    <Typography sx={{textAlign: 'left', margin: '5px', display: 'block'}}><p><strong>Place of work:</strong> {job.city}</p></Typography>
                                    <Typography sx={{textAlign: 'left', margin: '5px', display: 'block'}}><p><strong>Payment:</strong> as high as {job.salaryHigh}$</p></Typography>
                                    <Typography sx={{textAlign: 'left', margin: '5px', display: 'block'}}><p><strong>Required skills:</strong> {job.skills.map((skill) => (
                                        <Grid key={`${job.id}-${skill}`} item sx={{borderRadius: '10px', background: '#db0011', textAlign: 'center', padding: '10px', margin: '5px', flexGrow: '1', display: 'inline-block'}}>
                                            <Typography sx={{fontSize: '10px', color: '#FFFFFF'}}>{skill}</Typography>
                                        </Grid>))}</p>
                                    </Typography>
                                </>
                            )                            
                        }
                    })}
                </Box>
            </Fade>
        </Modal>
    </Grid>
  )
}

export default PageContent