import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { tokens } from '../theme.js';
import AnimatedSection from './AnimatedSection.jsx';

const STEPS = [
  {
    num: '01',
    title: 'Lodge the Instruction',
    text: 'An attorney, court or member of the public lodges the relevant order, warrant or document for execution.',
  },
  {
    num: '02',
    title: 'Verification',
    text: 'The instruction is checked against the court order to confirm jurisdiction, parties and the relief granted.',
  },
  {
    num: '03',
    title: 'Execution',
    text: 'The Sheriff carries out the instruction in person serving, attaching, evicting or auctioning as ordered.',
  },
  {
    num: '04',
    title: 'Return of Service',
    text: 'A signed, dated Return of Service is filed, giving the court and parties a formal record of the outcome.',
  },
];

const Process = () => {
  return (
    <AnimatedSection id="process">
      <Box sx={{ background: tokens.navyInk, py: { xs: 9, md: 13 }, position: 'relative', overflow: 'hidden' }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 9 }, maxWidth: 640, mx: 'auto' }}>
            <Typography variant="overline" sx={{ color: tokens.bronzeLight, display: 'block', mb: 1.5 }}>
              How It Works
            </Typography>
            <Typography variant="h2" sx={{ color: '#fff', fontSize: { xs: '2rem', md: '2.6rem' } }}>
              From instruction to Return of Service
            </Typography>
          </Box>

          <Grid container spacing={0}>
            {STEPS.map((step, i) => (
              <Grid item xs={12} sm={6} md={3} key={step.num}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  <Box
                    sx={{
                      borderLeft: { xs: 'none', md: i === 0 ? 'none' : `1px solid ${tokens.navyLine}` },
                      px: { xs: 0, md: 3.5 },
                      py: { xs: 3, md: 0 },
                      borderBottom: { xs: i < STEPS.length - 1 ? `1px solid ${tokens.navyLine}` : 'none', md: 'none' },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"IBM Plex Mono", monospace',
                        color: tokens.bronze,
                        fontSize: '1.6rem',
                        fontWeight: 600,
                        mb: 1.5,
                      }}
                    >
                      {step.num}
                    </Typography>
                    <Typography sx={{ color: '#fff', fontWeight: 700, mb: 1.2, fontSize: '1.05rem' }}>
                      {step.title}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.68)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {step.text}
                    </Typography>
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

export default Process;
