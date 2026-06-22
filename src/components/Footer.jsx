import React from 'react';
import { Box, Container, Grid, Typography, Stack, IconButton, Divider } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { tokens } from '../theme.js';
import logo from '../assets/logo.jpg';
import logo1 from '../assets/logo1.png';

const NAV_ITEMS = ['Home', 'About', 'Services', 'Process', 'Jurisdiction', 'Contact'];

const Footer = () => {
  const goTo = (label) => {
    document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box component="footer" sx={{ background: tokens.navyDeep, color: '#fff', pt: { xs: 7, md: 9 }, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2.5 }}>
              <Box component="img" src={logo1} alt="Crest" sx={{ height: 48 }} />
              <Box>
                <Typography sx={{ fontFamily: '"Fraunces", serif', fontWeight: 600, fontSize: '1.05rem' }}>
                Seshego Sheriff
                </Typography>
                <Typography sx={{ color: tokens.bronzeLight, fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                  UPHOLDING THE DIGNITY WE SERVE
                </Typography>
              </Box>
            </Stack>
            <Typography sx={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', lineHeight: 1.8, maxWidth: 420 }}>
              An impartial officer of the court, executing lawful instruction; service of process, attachments, evictions and sales in
              execution; across our designated jurisdiction.
            </Typography>
           {/* <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              {[FacebookIcon, LinkedInIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  size="small"
                  sx={{
                    color: '#fff',
                    background: 'rgba(255,255,255,0.08)',
                    '&:hover': { background: 'rgba(255,255,255,0.18)' },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
            */}
          </Grid>

          <Grid item xs={6} md={3.5}>
           {/* <Typography sx={{ fontWeight: 700, mb: 2, fontSize: '0.95rem', letterSpacing: '0.04em' }}>
              QUICK LINKS
            </Typography>
            <Stack spacing={1.2}>
              {NAV_ITEMS.map((item) => (
                <Typography
                  key={item}
                  onClick={() => goTo(item)}
                  sx={{
                    color: 'rgba(255,255,255,0.65)',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                    '&:hover': { color: tokens.bronzeLight },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Stack>
            */}
          </Grid>

       
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 4 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} Seshego Sheriff. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', cursor: 'pointer', '&:hover': { color: '#fff' } }}>
              Privacy Policy
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', cursor: 'pointer', '&:hover': { color: '#fff' } }}>
              Terms of Service
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;
