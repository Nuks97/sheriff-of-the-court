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
      <Typography sx={{ color: '#fff', fontWeight: 600 }}>{value}</Typography>
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
          <Grid container spacing={{ xs: 6, md: 8 }}>
            <Grid item xs={12} md={5}>
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
                <InfoRow icon={PhoneIcon} label="Telephone" value="061 284 0606 | 087 150 0033" />
                <InfoRow icon={EmailIcon} label="Email" value="Info@seshegosheriff.co.za" />
                <InfoRow icon={AccessTimeIcon} label="Office Hours" value="Mon - Fri, 08:00 - 16:00" />
                <InfoRow icon={LocationOnIcon} label="Head Office" value=" 8215/ 8217 Zone 7, Seshego" />
              </Stack>
            </Grid>

          {/*  <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ background: '#fff', p: { xs: 3, md: 4.5 }, borderRadius: 1 }}
                >
                  {submitted && (
                    <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSubmitted(false)}>
                      Your request has been received. The office will be in touch shortly.
                    </Alert>
                  )}
                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth required label="Full Name" value={form.name} onChange={handleChange('name')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth required type="email" label="Email Address" value={form.email} onChange={handleChange('email')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Phone Number" value={form.phone} onChange={handleChange('phone')} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label="Case / File Reference" value={form.caseRef} onChange={handleChange('caseRef')} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth select required label="Nature of Matter" value={form.matter} onChange={handleChange('matter')}>
                        {MATTER_TYPES.map((m) => (
                          <MenuItem key={m} value={m}>{m}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth required multiline rows={4} label="Details" value={form.message} onChange={handleChange('message')} />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        size="large"
                        variant="contained"
                        endIcon={<SendIcon />}
                        sx={{ background: tokens.navyInk, '&:hover': { background: tokens.navyDeep } }}
                      >
                        Submit Request
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Grid> */}
          </Grid>
        </Container>
      </Box>
    </AnimatedSection>
  );
};

export default Contact;
