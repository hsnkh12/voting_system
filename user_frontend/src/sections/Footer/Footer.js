import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export function Footer() {


    return (
        <footer style={{ backgroundColor: '#EEF7FF' }}>
            <br></br>
            <br></br>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                {/* Social Icons */}
                <IconButton href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <GitHubIcon />
                </IconButton>
                <IconButton href="https://www.linkedin.com/in/your-linkedin-profile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <LinkedInIcon />
                </IconButton>
            </Stack>

            {/* Footer Text */}
            <Typography variant="body2" color="textSecondary" align="center">
                © {new Date().getFullYear()} CypVote. All rights reserved.
            </Typography>
            <br></br>
            <br></br>
        </footer>
    )
}