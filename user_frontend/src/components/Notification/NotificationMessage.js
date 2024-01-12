import React from 'react';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function NotificationMessage(props) {
  const { message, status, setNotify, extraStyle = {} } = props;

  const onClose = () => {
    setNotify({ message: null, status: null });
  };

  // Define CSS color based on the status
  const getColor = () => {
    switch (status) {
      case 'success':
        return '#4CAF50'; // Green
      case 'error':
        return '#FF5252'; // Red
      case 'warning':
        return '#FFC107'; // Yellow
      default:
        return '#333'; // Default color for unknown status
    }
  };

  const notificationStyle = {
    backgroundColor: getColor(),
    color: 'white',
    padding: '15px',
    margin: '10px',
    borderRadius: '5px',
    position: 'relative', // To position the close button,
    ...extraStyle,
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    cursor: 'pointer',
  };

  if (!message) {
    return null;
  }

  return (
    <Grid item xs={12}>
      <div style={{...notificationStyle, color: status==='warning'? 'black': 'white'}}>
        {message}
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          style={closeButtonStyle}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </div>
    </Grid>
  );
}
