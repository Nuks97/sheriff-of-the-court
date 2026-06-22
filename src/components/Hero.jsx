import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GavelIcon from '@mui/icons-material/Gavel';
import { tokens } from '../theme.js';
import logo1 from '../assets/logo1.png';
import SealRays from './SealRays.jsx';

const Hero = () => {
  return (
    <Box
      id="home"
      sx={{
        position: 'relative',
        minHeight: { xs: '92vh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: `radial-gradient(circle at 15% 20%, ${tokens.navyLine} 0%, ${tokens.navyInk} 45%, ${tokens.navyDeep} 100%)`,
        pt: { xs: 10, md: 0 },
      }}
    >
      {/* Ambient seal-ray motif, off to the right, mostly bled off-canvas */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: { xs: '-220px', md: '-120px' },
          transform: 'translateY(-50%)',
          opacity: { xs: 0.5, md: 1 },
        }}
      >
        <SealRays size={620} color={tokens.bronze} opacity={0.18} />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, py: { xs: 6, md: 0 } }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 5, md: 8 }} alignItems="center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ flexShrink: 0 }}
          >
            <Box
              component="img"
              src={logo1}
              alt="Sheriff of the Court crest"
              sx={{
                width: { xs: 180, md: 240 },
                height: 'auto',
                filter: 'drop-shadow(0 20px 45px rgba(0,0,0,0.45))',
              }}
            />
          </motion.div>

          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Typography
                variant="overline"
                sx={{ color: tokens.bronzeLight, display: 'block', mb: 2 }}
              >
                Office of the Sheriff &middot; Est. Service of Court Process
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: '#fff',
                  fontSize: { xs: '2.3rem', sm: '3rem', md: '3.6rem' },
                  lineHeight: 1.08,
                  mb: 3,
                }}
              >
                Upholding the{' '}
                <Box
                  component="span"
                  sx={{
                    color: tokens.bronzeLight,
                    fontStyle: '',
                    position: 'relative',
                  }}
                >
                  dignity
                </Box>{' '}
                we serve.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  maxWidth: 560,
                  mx: { xs: 'auto', md: 0 },
                  mb: 4,
                  lineHeight: 1.7,
                }}
              >
                The Office of the Sheriff executes the lawful orders of the court 
                serving summonses, enforcing warrants, conducting attachments and
                evictions, and carrying out sales in execution, fairly and without
                delay.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent={{ xs: 'center', md: 'flex-start' }}
              >
                <Button
                  size="large"
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  sx={{
                    background: tokens.bronze,
                    color: '#fff',
                    '&:hover': { background: tokens.bronzeLight },
                  }}
                >
                  Request Service of Process
                </Button>
                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<GavelIcon />}
                  onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.4)',
                    color: '#fff',
                    '&:hover': { borderColor: '#fff', background: 'rgba(255,255,255,0.06)' },
                  }}
                >
                  View Our Services
                </Button>
              </Stack>
            </motion.div>
          </Box>
        </Stack>
      </Container>

      {/* Hairline footer rule echoing a document edge */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: `linear-gradient(90deg, ${tokens.bronze}, transparent, ${tokens.bronze})`,
          opacity: 0.6,
        }}
      />
    </Box>
  );
};

export default Hero;
