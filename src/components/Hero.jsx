import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { motion } from 'framer-motion';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GavelIcon from '@mui/icons-material/Gavel';

import { tokens } from '../theme.js';
import logo1 from '../assets/logo1.png';

import SealRays from './SealRays.jsx';
import AnnouncementSpotlight from './AnnouncementSpotlight.jsx';

const Hero = () => {
  const scrollToSection = (sectionId) => {
    document
      .getElementById(sectionId)
      ?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
  };

  return (
    <Box
      id="home"
      component="section"
      sx={{
        position: 'relative',

        minHeight: {
          xs: 'auto',
          md: '100vh',
        },

        display: 'flex',
        alignItems: 'stretch',

        overflow: 'hidden',

        background: `radial-gradient(
          circle at 15% 20%,
          ${tokens.navyLine} 0%,
          ${tokens.navyInk} 45%,
          ${tokens.navyDeep} 100%
        )`,

        pt: {
          xs: 10,
          md: 0,
        },
      }}
    >
      {/* Background decorative glow */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '-18%',
          left: '-12%',
          width: {
            xs: 280,
            md: 520,
          },
          height: {
            xs: 280,
            md: 520,
          },
          borderRadius: '50%',
          background: `radial-gradient(
            circle,
            ${tokens.bronzeLight}12 0%,
            transparent 68%
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* Ambient seal-ray motif */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '50%',

          right: {
            xs: '-220px',
            md: '-120px',
          },

          transform: 'translateY(-50%)',

          opacity: {
            xs: 0.5,
            md: 1,
          },

          pointerEvents: 'none',
        }}
      >
        <SealRays
          size={620}
          color={tokens.bronze}
          opacity={0.18}
        />
      </Box>

      {/* Subtle lower background shadow behind the notice */}
      <Box
        aria-hidden="true"
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },

          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 250,

          background: `linear-gradient(
            180deg,
            transparent 0%,
            rgba(2, 10, 22, 0.38) 100%
          )`,

          pointerEvents: 'none',
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,

          minHeight: {
            xs: 'auto',
            md: '100vh',
          },

          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',

          /*
           * On desktop, extra space is reserved at the bottom
           * for the absolutely positioned announcement.
           */
          pt: {
            xs: 6,
            md: 8,
          },

          pb: {
            xs: 7,
            md: 23,
          },
        }}
      >
        {/* Main hero content */}
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={{
            xs: 5,
            md: 8,
          }}
          alignItems="center"
          sx={{
            width: '100%',
          }}
        >
          {/* Sheriff crest */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
              rotate: -6,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              flexShrink: 0,
            }}
          >
            <Box
              component="img"
              src={logo1}
              alt="Sheriff of the Court crest"
              sx={{
                width: {
                  xs: 180,
                  md: 240,
                },

                height: 'auto',

                filter:
                  'drop-shadow(0 20px 45px rgba(0,0,0,0.45))',
              }}
            />
          </motion.div>

          {/* Hero text */}
          <Box
            sx={{
              textAlign: {
                xs: 'center',
                md: 'left',
              },

              maxWidth: 690,
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.15,
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  color: tokens.bronzeLight,
                  display: 'block',
                  mb: 2,
                  letterSpacing: {
                    xs: 1.3,
                    md: 1.8,
                  },
                }}
              >
                Office of the Sheriff &middot; Est. Service of
                Court Process
              </Typography>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  color: '#fff',

                  fontSize: {
                    xs: '2.3rem',
                    sm: '3rem',
                    md: '3.6rem',
                  },

                  lineHeight: 1.08,
                  mb: 3,
                }}
              >
                Upholding the{' '}
                <Box
                  component="span"
                  sx={{
                    color: tokens.bronzeLight,
                    position: 'relative',
                    display: 'inline-block',

                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: -4,
                      height: 2,

                      background: `linear-gradient(
                        90deg,
                        transparent,
                        ${tokens.bronzeLight},
                        transparent
                      )`,

                      opacity: 0.65,
                    },
                  }}
                >
                  dignity
                </Box>{' '}
                we serve.
              </Typography>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.45,
              }}
            >
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.82)',

                  fontSize: {
                    xs: '1rem',
                    md: '1.15rem',
                  },

                  maxWidth: 560,

                  mx: {
                    xs: 'auto',
                    md: 0,
                  },

                  mb: 4,
                  lineHeight: 1.7,
                }}
              >
                The Office of the Sheriff executes the lawful
                orders of the court, serving summonses,
                enforcing warrants, conducting attachments and
                evictions, and carrying out sales in execution
                fairly and without delay.
              </Typography>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.6,
              }}
            >
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                spacing={2}
                justifyContent={{
                  xs: 'center',
                  md: 'flex-start',
                }}
              >
                <Button
                  size="large"
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => scrollToSection('contact')}
                  sx={{
                    background: tokens.bronze,
                    color: '#fff',
                    px: 3,

                    '&:hover': {
                      background: tokens.bronzeLight,
                    },
                  }}
                >
                  Request Service of Process
                </Button>

                <Button
                  size="large"
                  variant="outlined"
                  startIcon={<GavelIcon />}
                  onClick={() => scrollToSection('services')}
                  sx={{
                    borderColor: 'rgba(255,255,255,0.4)',
                    color: '#fff',
                    px: 3,

                    '&:hover': {
                      borderColor: '#fff',
                      background: 'rgba(255,255,255,0.06)',
                    },
                  }}
                >
                  View Our Services
                </Button>
              </Stack>
            </motion.div>
          </Box>
        </Stack>

        {/*
         * Desktop:
         * Positioned at the bottom-left of this Container.
         *
         * Mobile:
         * Changes to relative positioning and appears below
         * the main hero content.
         */}
        <AnnouncementSpotlight placement="hero" />
      </Container>

      {/* Document-edge footer rule */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 4,

          height: 4,

          background: `linear-gradient(
            90deg,
            ${tokens.bronze},
            transparent,
            ${tokens.bronze}
          )`,

          opacity: 0.6,
        }}
      />
    </Box>
  );
};

export default Hero;