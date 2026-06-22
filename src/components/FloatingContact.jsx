import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { tokens } from '../theme.js';

// Update the phone number to this office's actual WhatsApp line.
const WHATSAPP_NUMBER = '27607511793';
const MESSAGE = encodeURIComponent('Good day, I would like to request a service from the Sheriff of the Court.');

const FloatingContact = () => (
  <Tooltip title="Chat with the office on WhatsApp" placement="left">
    <Fab
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        position: 'fixed',
        bottom: { xs: 20, md: 32 },
        right: { xs: 20, md: 32 },
        zIndex: 1300,
        background: '#25D366',
        color: '#fff',
        '&:hover': { background: '#1ebe5a' },
      }}
      aria-label="Contact us on WhatsApp"
    >
      <WhatsAppIcon />
    </Fab>
  </Tooltip>
);

export default FloatingContact;
