import React from 'react';
import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import VerifiedIcon from '@mui/icons-material/Verified';
import BalanceIcon from '@mui/icons-material/Balance';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import { tokens } from '../theme.js';
import logo from '../assets/logo.jpg';
import AnimatedSection from './AnimatedSection.jsx';
import logo1 from '../assets/logo1.png';

const PILLARS = [
  { icon: VerifiedIcon, title: 'Impartial', text: 'We act strictly on the authority of the court, never on behalf of either party to a dispute.' },
  { icon: BalanceIcon, title: 'Lawful', text: 'Every warrant, attachment and eviction is executed within the precise bounds the law allows.' },
  { icon: HistoryEduIcon, title: 'Accountable', text: 'A formal Return of Service is filed for every instruction, so the record is always clear.' },
];

const About = () => {
  return (
    <AnimatedSection id="about">
      <Box sx={{ background: tokens.parchment, py: { xs: 9, md: 13 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 10 }} alignItems="center">
            <Grid item xs={12} md={5}>
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7 }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 1,
                    background: `linear-gradient(150deg, ${tokens.navyInk} 0%, ${tokens.navyDeep} 100%)`,
                    aspectRatio: '4 / 5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 30px 60px rgba(19,32,58,0.28)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage:
                        'repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 28px)',
                    }}
                  />
                  <Box
                    component="img"
                    src={logo1}
                    alt="Sheriff of the Court crest"
                    sx={{ width: '58%', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 18,
                      left: 18,
                      right: 18,
                      color: tokens.bronzeLight,
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '0.7rem',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      borderTop: '1px solid rgba(255,255,255,0.15)',
                      pt: 1.5,
                    }}
                  >
                    File Ref. &middot; Sheriff&apos;s Office
                  </Box>
                </Box>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={7}>
              <Typography variant="overline" sx={{ color: tokens.bronze, mb: 1.5, display: 'block' }}>
                Who We Are
              </Typography>
              <Typography
                variant="h2"
                sx={{ color: tokens.navyInk, fontSize: { xs: '2rem', md: '2.6rem' }, mb: 3 }}
              >
                An officer of the court, not a party to it.
              </Typography>
              <Typography sx={{ color: tokens.inkSoft, fontSize: '1.05rem', lineHeight: 1.85, mb: 2.5 }}>
                The Sheriff of the Court is appointed to give effect to the
                orders of the court serving legal process, executing
                warrants, and carrying out attachments, evictions and sales in
                execution. The work is procedural by nature and personal in
                consequence, which is why it is carried out with care for
                everyone it touches.
              </Typography>
              <Typography sx={{ color: tokens.inkSoft, fontSize: '1.05rem', lineHeight: 1.85, mb: 5 }}>
                Our office serves attorneys, the courts, businesses and members
                of the public across our designated jurisdiction, maintaining
                clear records and a formal Return of Service for every matter
                handled.
              </Typography>

              <Grid container spacing={3}>
                {PILLARS.map(({ icon: Icon, title, text }) => (
                  <Grid item xs={12} sm={4} key={title}>
                    <Stack spacing={1.2}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: '50%',
                          background: tokens.navyInk,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Icon sx={{ color: tokens.bronzeLight, fontSize: 22 }} />
                      </Box>
                      <Typography sx={{ fontWeight: 700, color: tokens.navyInk }}>{title}</Typography>
                      <Typography sx={{ color: tokens.inkSoft, fontSize: '0.92rem', lineHeight: 1.6 }}>
                        {text}
                      </Typography>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AnimatedSection>
  );
};

export default About;
