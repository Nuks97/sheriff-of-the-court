import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import PlaceIcon from '@mui/icons-material/Place';
import { tokens } from '../theme.js';
import AnimatedSection from './AnimatedSection.jsx';

// Placeholder magisterial districts — replace with this office's actual
// jurisdiction areas.
const DISTRICTS = [
  { name: 'Mashashane', address: 'Mashashane Court Precinct', mapUrl: 'https://maps.google.com/?q=Johannesburg+Magistrates+Court' },
  { name: 'Matlala', address: 'Matlala Court Precinct', mapUrl: 'https://maps.google.com/?q=Tembisa+Magistrates+Court' },
  { name: 'Moletji', address: 'Moletji Court Precinct', mapUrl: 'https://maps.google.com/?q=Mokopane+Magistrates+Court' },
  { name: 'Seshego', address: 'Seshego Court Precinct', mapUrl: 'https://maps.google.com/?q=Soekmekaar+Magistrates+Court' },
];

const Jurisdiction = () => {
  return (
    <AnimatedSection id="jurisdiction">
      <Box sx={{ background: tokens.parchment, py: { xs: 9, md: 13 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 9 }, maxWidth: 640, mx: 'auto' }}>
            <Typography variant="overline" sx={{ color: tokens.bronze, display: 'block', mb: 1.5 }}>
              Coverage
            </Typography>
            <Typography variant="h2" sx={{ color: tokens.navyInk, fontSize: { xs: '2rem', md: '2.6rem' } }}>
              Areas of Jurisdiction
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {DISTRICTS.map((d, i) => (
              <Grid item xs={12} sm={6} md={3} key={d.name}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <Box
                    component="a"
                    href={d.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.preventDefault()} // Stops the link from being clicked/opened
                    sx={{
                      cursor: 'default', // Removes the pointer (hand) cursor
                      display: 'block',
                      textDecoration: 'none',
                      color: 'inherit',
                      background: '#fff',
                      p: 3.5,
                      textAlign: 'center',
                      border: `1px solid ${tokens.hairline}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 16px 32px rgba(19,32,58,0.14)',
                        borderColor: tokens.bronze,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        mx: 'auto',
                        mb: 1.8,
                        borderRadius: '50%',
                        background: tokens.navyInk,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PlaceIcon sx={{ color: tokens.bronzeLight }} />
                    </Box>
                    <Typography sx={{ fontWeight: 700, color: tokens.navyInk, mb: 0.5 }}>{d.name}</Typography>
                    <Typography sx={{ color: tokens.inkSoft, fontSize: '0.88rem' }}>{d.address}</Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </AnimatedSection>
  );
};

export default Jurisdiction;