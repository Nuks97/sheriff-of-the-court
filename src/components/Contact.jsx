import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Stack,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import { tokens } from '../theme.js';
import AnimatedSection from './AnimatedSection.jsx';

const MATTER_TYPES = [
  'Service of Summons / Process',
  'Warrant of Execution',
  'Eviction',
  'Sale in Execution',
  'Section 65 Notice',
  'Other Enquiry',
];

const initialForm = { name: '', email: '', phone: '', matter: '', caseRef: '', message: '' };

const InfoRow = ({ icon: Icon, label, value }) => (
  <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
    <Icon sx={{ color: tokens.bronzeLight, mt: 0.3 }} />
    <Box>
      <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>{label}</Typography>
      {Array.isArray(value) ? (
        value.map((line, i) => (
          <Typography key={i} sx={{ color: '#fff', fontWeight: 600, lineHeight: 1.5 }}>
            {line}
          </Typography>
        ))
      ) : (
        <Typography sx={{ color: '#fff', fontWeight: 600 }}>{value}</Typography>
      )}
    </Box>
  </Stack>
);

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend wired up yet — replace with an API call or form service
    // (e.g. Formspree, EmailJS, or your own endpoint) when ready to go live.
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
   <AnimatedSection id="contact">
  <Box sx={{ background: `linear-gradient(165deg, ${tokens.navyInk} 0%, ${tokens.navyDeep} 100%)`, py: { xs: 9, md: 13 } }}>
    <Container maxWidth="lg">
      <Grid container spacing={{ xs: 6, md: 8 }} alignItems="stretch">
        <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="overline" sx={{ color: tokens.bronzeLight, display: 'block', mb: 1.5 }}>
            Get In Touch
          </Typography>
          <Typography variant="h2" sx={{ color: '#fff', fontSize: { xs: '2rem', md: '2.4rem' }, mb: 3 }}>
            Lodge a request with the Office
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, mb: 5 }}>
            Submit the details of your matter below, or reach the office
            directly during business hours. We will confirm receipt of any
            instruction in writing.
          </Typography>

          <Stack spacing={3.5}>
             <InfoRow icon={LocationOnIcon} label="Head Office" value="8215/8217 Zone 7, Seshego, Limpopo" />
            <InfoRow icon={PhoneIcon} label="Telephone" value="061 284 0606 | 087 150 0033" />
            <InfoRow icon={EmailIcon} label="Email" value="Info@seshegosheriff.co.za" />
            <InfoRow
              icon={AccessTimeIcon}
              label="Office Hours"
              value={['Mon - Thu: 07:30 - 16:30', 'Fri: 07:30 - 16:00']}
            />
           
          </Stack>
        </Grid>

      <Grid item xs={12} md={7} sx={{ display: 'flex' }}>
  {/* Google Map with location pointer */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6 }}
    style={{ width: '100%', display: 'flex' }}
  >
    <Box
      sx={{
        mt: { xs: 0, md: 5 },
        width: '100%',
        minHeight: { xs: 320, md: 480 },
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${tokens.bronzeLight}55`,
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
      }}
    >
      <Box
        component="iframe"
        title="Seshego Sheriff Head Office Location"
        src="https://www.google.com/maps?q=-23.8525151,29.3808505&z=17&output=embed"
        sx={{
          width: '100%',
          height: '100%',
          minHeight: { xs: 320, md: 480 },
          border: 0,
          display: 'block',
          filter: 'grayscale(15%) contrast(1.05)',
        }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Custom label overlay, since Google's own pin title needs a click to reveal */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 12, md: 16 },
          left: { xs: 12, md: 16 },
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          background: tokens.navyInk,
          color: '#fff',
          borderRadius: 1.5,
          pl: 1.2,
          pr: 1.8,
          py: 1,
          boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
          maxWidth: { xs: '80%', md: 260 },
        }}
      >
        <LocationOnIcon sx={{ color:'#8B1E3F', fontSize: 22, flexShrink: 0 }} />
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', lineHeight: 1.25 }}>
            Seshego Sheriff Head Office
          </Typography>
          <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.3 }}>
          {/* 27 133rd Ave, Seshego-G, Polokwane*/}
          </Typography>
        </Box>
      </Box>
    </Box>
  </motion.div>
</Grid>
      </Grid>
    </Container>
  </Box>
</AnimatedSection>
  );
};

export default Contact;