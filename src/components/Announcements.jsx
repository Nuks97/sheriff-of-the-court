import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Chip,
  Tabs,
  Tab,
  Divider,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

import GavelIcon from '@mui/icons-material/Gavel';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Inventory2Icon from '@mui/icons-material/Inventory2';

import { tokens } from '../theme.js';
import AnimatedSection from './AnimatedSection.jsx';

import {
  upcomingNotices,
  previousNotices,
} from './notices.jsx';

const STAMP_RED = '#8B1E3F';
const PARCHMENT = '#F7F3EA';

/**
 * Adds a local time to prevent the date from shifting
 * backwards because of UTC timezone conversion.
 */
const parseNoticeDate = (date) =>
  new Date(`${date}T23:59:59`);

/**
 * Formats the reserve price as South African Rand.
 */
const formatCurrency = (value) =>
  new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(value);

/**
 * Calculates how many days remain before the notice date.
 */
const getDaysRemaining = (date) => {
  const targetDate = parseNoticeDate(date);
  const currentDate = new Date();

  const difference =
    targetDate.getTime() - currentDate.getTime();

  return Math.max(
    0,
    Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    )
  );
};

/**
 * Creates the text displayed in the countdown chip.
 */
const getCountdownText = (days) => {
  if (days === 0) {
    return 'Happening today';
  }

  if (days === 1) {
    return 'Happening tomorrow';
  }

  return `${days} days remaining`;
};

/**
 * Date section shown on the left side of each notice card.
 */
const DateStub = ({ iso }) => {
  const date = parseNoticeDate(iso);

  return (
    <Box
      sx={{
        textAlign: 'center',
        minWidth: {
          xs: 58,
          sm: 64,
        },
        borderRight: `1px dashed ${tokens.navyInk}33`,
        pr: {
          xs: 1.5,
          sm: 2,
        },
        mr: {
          xs: 1.5,
          sm: 2,
        },
      }}
    >
      <Typography
        sx={{
          color: tokens.navyInk,
          fontWeight: 800,
          fontSize: {
            xs: '1.55rem',
            sm: '1.8rem',
          },
          lineHeight: 1,
        }}
      >
        {date.getDate()}
      </Typography>

      <Typography
        sx={{
          color: tokens.navyInk,
          textTransform: 'uppercase',
          fontSize: '0.7rem',
          letterSpacing: 1,
          opacity: 0.7,
          mt: 0.5,
        }}
      >
        {date.toLocaleDateString('en-ZA', {
          month: 'short',
        })}{' '}
        {date.getFullYear()}
      </Typography>
    </Box>
  );
};

/**
 * Decorative official notice stamp.
 */
const OfficialStamp = () => (
  <Box
    aria-hidden="true"
    sx={{
      position: 'absolute',
      top: {
        xs: 14,
        md: 20,
      },
      right: {
        xs: 14,
        md: 20,
      },
      width: {
        xs: 64,
        md: 78,
      },
      height: {
        xs: 64,
        md: 78,
      },
      borderRadius: '50%',
      border: `2px solid ${STAMP_RED}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      transform: 'rotate(-10deg)',
      opacity: 0.85,
      pointerEvents: 'none',
    }}
  >
    <GavelIcon
      sx={{
        color: STAMP_RED,
        fontSize: {
          xs: 18,
          md: 22,
        },
      }}
    />

    <Typography
      sx={{
        color: STAMP_RED,
        fontSize: {
          xs: '0.45rem',
          md: '0.5rem',
        },
        fontWeight: 800,
        letterSpacing: 1,
        textAlign: 'center',
        lineHeight: 1.2,
        mt: 0.3,
      }}
    >
      OFFICIAL
      <br />
      NOTICE
    </Typography>
  </Box>
);

/**
 * Individual announcement card.
 */
const NoticeCard = ({ notice, concluded }) => {
  const daysRemaining = getDaysRemaining(notice.date);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 24,
        rotate: -0.6,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotate: -0.6,
      }}
      whileHover={
        concluded
          ? undefined
          : {
              y: -5,
              rotate: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.5,
      }}
      style={{
        height: '100%',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: PARCHMENT,
          borderRadius: 1.5,
          p: {
            xs: 3,
            md: 4,
          },
          boxShadow: '0 14px 34px rgba(0,0,0,0.25)',
          border: `1px solid ${tokens.navyInk}10`,
          filter: concluded
            ? 'grayscale(60%)'
            : 'none',
          opacity: concluded ? 0.75 : 1,
          overflow: 'hidden',
          transition:
            'box-shadow 0.25s ease, transform 0.25s ease',

          '&:hover': {
            boxShadow: concluded
              ? '0 14px 34px rgba(0,0,0,0.25)'
              : '0 20px 45px rgba(0,0,0,0.32)',
          },

          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(
              90deg,
              ${STAMP_RED},
              ${tokens.bronzeLight},
              ${STAMP_RED}
            )`,
            opacity: concluded ? 0.4 : 0.85,
          },
        }}
      >
        <OfficialStamp />

        {concluded && (
          <Chip
            label="Concluded"
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              background: tokens.navyInk,
              color: '#fff',
              fontWeight: 700,
              zIndex: 2,
            }}
          />
        )}

        {/* Header */}
        <Stack
          direction="row"
          spacing={0}
          sx={{
            mb: 2,
            mt: concluded ? 4 : 0,
          }}
        >
          <DateStub iso={notice.date} />

          <Box
            sx={{
              minWidth: 0,
              pr: {
                xs: 6.5,
                md: 8,
              },
            }}
          >
            <Typography
              sx={{
                color: STAMP_RED,
                textTransform: 'uppercase',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              {notice.kind}
            </Typography>

            <Typography
              sx={{
                color: tokens.navyInk,
                fontWeight: 700,
                fontSize: {
                  xs: '1.05rem',
                  md: '1.2rem',
                },
                lineHeight: 1.35,
                mt: 0.4,
              }}
            >
              {notice.title}
            </Typography>
          </Box>
        </Stack>

        {/* Countdown */}
        {!concluded && (
          <Chip
            icon={<EventIcon />}
            label={getCountdownText(daysRemaining)}
            size="small"
            sx={{
              alignSelf: 'flex-start',
              mb: 2,

              background:
                daysRemaining <= 3
                  ? STAMP_RED
                  : `${tokens.navyInk}12`,

              color:
                daysRemaining <= 3
                  ? '#fff'
                  : tokens.navyInk,

              fontWeight: 700,

              '& .MuiChip-icon': {
                color:
                  daysRemaining <= 3
                    ? '#fff'
                    : STAMP_RED,
              },
            }}
          />
        )}

        <Divider
          sx={{
            borderColor: `${tokens.navyInk}22`,
            mb: 2,
          }}
        />

        {/* Property information */}
        <Stack
          spacing={1.2}
          sx={{
            mb: 2.5,
          }}
        >
          <Stack
            direction="row"
            spacing={1.2}
            alignItems="flex-start"
          >
            <PlaceIcon
              sx={{
                color: STAMP_RED,
                fontSize: 18,
                mt: 0.2,
                flexShrink: 0,
              }}
            />

            <Typography
              sx={{
                color: tokens.navyInk,
                fontSize: '0.92rem',
                lineHeight: 1.5,
              }}
            >
              {notice.erf}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1.2}
            alignItems="flex-start"
          >
            <Inventory2Icon
              sx={{
                color: STAMP_RED,
                fontSize: 18,
                mt: 0.2,
                flexShrink: 0,
              }}
            />

            <Typography
              sx={{
                color: tokens.navyInk,
                fontSize: '0.92rem',
                lineHeight: 1.5,
              }}
            >
              Reserve price:{' '}
              <Box
                component="span"
                sx={{
                  color: STAMP_RED,
                  fontWeight: 800,
                }}
              >
                {formatCurrency(
                  notice.reservePrice
                )}
              </Box>
            </Typography>
          </Stack>
        </Stack>

        {/* Requirements */}
        <Typography
          sx={{
            color: tokens.navyInk,
            fontSize: '0.78rem',
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontWeight: 700,
            opacity: 0.7,
            mb: 1,
          }}
        >
          Bring along
        </Typography>

        <Stack
          spacing={0.9}
          sx={{
            mb: 2.5,
          }}
        >
          {notice.requirements?.map(
            (requirement) => (
              <Stack
                key={requirement}
                direction="row"
                spacing={1}
                alignItems="flex-start"
              >
                <CheckCircleOutlineIcon
                  sx={{
                    color: STAMP_RED,
                    fontSize: 17,
                    mt: 0.15,
                    flexShrink: 0,
                  }}
                />

                <Typography
                  sx={{
                    color: tokens.navyInk,
                    fontSize: '0.88rem',
                    lineHeight: 1.45,
                  }}
                >
                  {requirement}
                </Typography>
              </Stack>
            )
          )}
        </Stack>

        {/* Push contact details to the bottom */}
        <Box sx={{ flexGrow: 1 }} />

        <Divider
          sx={{
            borderColor: `${tokens.navyInk}22`,
            mb: 2,
          }}
        />

        {/* Contact information */}
        <Stack
          direction="column"
          spacing={1}
          alignItems="flex-start"
        >
          <Typography
            sx={{
              color: tokens.navyInk,
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: 0.8,
              fontWeight: 700,
              opacity: 0.65,
            }}
          >
            For more information, contact
          </Typography>

          <Stack
            component="a"
            href={`tel:${notice.contact.replace(
              /\s/g,
              ''
            )}`}
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              color: tokens.navyInk,
              textDecoration: 'none',
              borderRadius: 1,
              py: 0.5,
              pr: 1,

              '&:hover': {
                color: STAMP_RED,
              },
            }}
          >
            <PhoneIcon
              sx={{
                color: STAMP_RED,
                fontSize: 18,
              }}
            />

            <Typography
              sx={{
                color: 'inherit',
                fontSize: '0.92rem',
                fontWeight: 800,
              }}
            >
              {notice.contact}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </motion.div>
  );
};

/**
 * Empty state displayed when there are no notices.
 */
const EmptyState = ({ label }) => (
  <Box
    sx={{
      textAlign: 'center',
      py: 7,
      px: 3,
      border: `1px dashed ${tokens.bronzeLight}88`,
      borderRadius: 1.5,
      background: 'rgba(255,255,255,0.25)',
    }}
  >
    <EventIcon
      sx={{
        color: tokens.bronzeLight,
        fontSize: 34,
        mb: 1.5,
      }}
    />

    <Typography
      sx={{
        color: tokens.navyInk,
        fontWeight: 600,
      }}
    >
      {label}
    </Typography>
  </Box>
);

/**
 * Main announcements section.
 */
const Announcements = () => {
  const [tab, setTab] = useState('upcoming');

  const list =
    tab === 'upcoming'
      ? upcomingNotices
      : previousNotices;

  return (
    <AnimatedSection id="announcements">
      <Box
        sx={{
          background: tokens.parchment,
          py: {
            xs: 9,
            md: 13,
          },
        }}
      >
        <Container maxWidth="lg">
          {/* Section heading and tabs */}
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            justifyContent="space-between"
            alignItems={{
              xs: 'flex-start',
              sm: 'flex-end',
            }}
            spacing={3}
            sx={{
              mb: {
                xs: 5,
                md: 7,
              },
            }}
          >
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: tokens.bronzeLight,
                  display: 'block',
                  mb: 1.5,
                }}
              >
                Notice Board
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  color: tokens.navyInk,
                  fontSize: {
                    xs: '2rem',
                    md: '2.4rem',
                  },
                }}
              >
                Public Notices &amp; Auctions
              </Typography>
            </Box>

            <Tabs
              value={tab}
              onChange={(_, value) =>
                setTab(value)
              }
              TabIndicatorProps={{
                style: {
                  background:
                    tokens.bronzeLight,
                },
              }}
              sx={{
                minHeight: 0,
                maxWidth: '100%',

                '& .MuiTabs-flexContainer': {
                  gap: {
                    xs: 0,
                    sm: 1,
                  },
                },

                '& .MuiTab-root': {
                  color: tokens.navyInk,
                  textTransform: 'none',
                  fontWeight: 600,
                  minHeight: 0,
                  py: 1,
                  px: {
                    xs: 1,
                    sm: 2,
                  },
                },

                '& .Mui-selected': {
                  color: `${tokens.navyInk} !important`,
                },
              }}
            >
              <Tab
                value="upcoming"
                label={`Upcoming (${upcomingNotices.length})`}
                icon={
                  <EventIcon
                    sx={{ fontSize: 18 }}
                  />
                }
                iconPosition="start"
              />

              <Tab
                value="previous"
                label={`Archive (${previousNotices.length})`}
                icon={
                  <GavelIcon
                    sx={{ fontSize: 18 }}
                  />
                }
                iconPosition="start"
              />
            </Tabs>
          </Stack>

          {/* Notice list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              {list.length === 0 ? (
                <EmptyState
                  label={
                    tab === 'upcoming'
                      ? 'No upcoming notices at this time. Check back soon.'
                      : 'Concluded notices will be archived here once finalised.'
                  }
                />
              ) : (
                <Grid
                  container
                  spacing={{
                    xs: 3,
                    md: 4,
                  }}
                  alignItems="stretch"
                >
                  {list.map((notice) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={notice.id}
                      sx={{
                        display: 'flex',
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                        }}
                      >
                        <NoticeCard
                          notice={notice}
                          concluded={
                            tab === 'previous'
                          }
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              )}
            </motion.div>
          </AnimatePresence>
        </Container>
      </Box>
    </AnimatedSection>
  );
};

export default Announcements;