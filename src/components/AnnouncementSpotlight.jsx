import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Chip, IconButton, Typography, Paper } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded';

import { upcomingNotices } from './notices.jsx';
import { tokens } from '../theme.js';

// Helper utilities
const parseNoticeDate = (date) => new Date(`${date}T23:59:59`);

const getDaysRemaining = (date) => {
  const today = new Date();
  const targetDate = parseNoticeDate(date);
  const difference = targetDate.getTime() - today.getTime();
  return Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
};

const getCountdownText = (daysRemaining) => {
  if (daysRemaining === 0) return 'Happening today';
  if (daysRemaining === 1) return 'Happening tomorrow';
  return `${daysRemaining} days left`;
};

// Slide transition variants for Framer Motion
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 80 : -80,
    opacity: 0,
  }),
};

const MultiAnnouncementSpotlight = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Filter and sort all active notices
  const activeNotices = useMemo(() => {
    const now = new Date();
    return [...upcomingNotices]
      .filter((notice) => parseNoticeDate(notice.date) >= now)
      .sort((a, b) => parseNoticeDate(a.date) - parseNoticeDate(b.date));
  }, []);

  const totalNotices = activeNotices.length;
  const currentNotice = activeNotices[currentIndex];

  useEffect(() => {
    if (totalNotices === 0) return;

    // Construct a composite key of all current notice IDs
    const activeNoticeIds = activeNotices.map((n) => n.id).sort().join(',');
    const storageKey = `notices-dismissed-${activeNoticeIds}`;
    const isDismissed = localStorage.getItem(storageKey);

    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [activeNotices, totalNotices]);

  // Auto-play timer for cycling through multiple notices
  useEffect(() => {
    if (!isVisible || totalNotices <= 1 || isPaused) return;

    const interval = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible, totalNotices, isPaused, currentIndex]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = totalNotices - 1;
      if (nextIndex >= totalNotices) nextIndex = 0;
      return nextIndex;
    });
  };

  const handleDismiss = () => {
    if (totalNotices > 0) {
      const activeNoticeIds = activeNotices.map((n) => n.id).sort().join(',');
      localStorage.setItem(`notices-dismissed-${activeNoticeIds}`, 'true');
    }
    setIsVisible(false);
  };

  const handleViewNotice = () => {
    handleDismiss();
    setTimeout(() => {
      document.getElementById('announcements')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 200);
  };

  if (totalNotices === 0 || !currentNotice) return null;

  const daysRemaining = getDaysRemaining(currentNotice.date);

  return (
    <AnimatePresence>
      {isVisible && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="dialog"
          aria-live="polite"
          aria-label="Upcoming Events Spotlight"
          sx={{
            position: 'fixed',
            bottom: { xs: 16, sm: 24 },
            right: { xs: 16, sm: 24 },
            zIndex: 1400,
            maxWidth: { xs: 'calc(100vw - 32px)', sm: 390 },
            width: '100%',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.95)', // Solid bright white surface
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
              color: '#0F172A', // Dark ink base
              position: 'relative',
              overflow: 'hidden',
              // Force all nested typography to use the dark color EXCEPT the view details button
              '& *:not(.view-details-btn):not(.view-details-btn *)': {
                color: 'inherit',
              },
            }}
          >
            {/* Top Gradient Accent Bar */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
               
              }}
            />

            {/* NEW: Heading Row with Animated Bell and Close Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                <NotificationsActiveRoundedIcon
                  sx={{
                    color: '#8B1E3F !important', // Force brand red color
                    fontSize: '18px',
                    animation: 'ring 2.5s ease infinite',
                    transformOrigin: 'top center',
                    '@keyframes ring': {
                      '0%': { transform: 'rotate(0)' },
                      '10%': { transform: 'rotate(20deg)' },
                      '20%': { transform: 'rotate(-15deg)' },
                      '30%': { transform: 'rotate(10deg)' },
                      '40%': { transform: 'rotate(-5deg)' },
                      '50%': { transform: 'rotate(0)' },
                      '100%': { transform: 'rotate(0)' },
                    },
                  }}
                />
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 800,
                    color: '#8B1E3F !important',
                    lineHeight: 1,
                    letterSpacing: 0.5,
                    fontSize: '0.7rem',
                  }}
                >
                  Upcoming event(s)
                </Typography>
              </Box>

              <IconButton
                onClick={handleDismiss}
                size="small"
                aria-label="Dismiss announcements"
                sx={{
                  opacity: 0.5,
                  p: 0.4,
                  mr: -0.5,
                  mt: -0.5,
                  '&:hover': {
                    opacity: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  },
                }}
              >
                <CloseRoundedIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Badges + Navigation Controls Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  icon={<CalendarTodayRoundedIcon sx={{ fontSize: '13px !important' }} />}
                  label={getCountdownText(daysRemaining)}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    backgroundColor: 'rgba(15, 23, 42, 0.08) !important', // Force light grey bg
                  }}
                />

                {/* Multiple notice step indicator */}
                {totalNotices > 1 && (
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      opacity: 0.6,
                      ml: 0.5,
                    }}
                  >
                    {currentIndex + 1} of {totalNotices}
                  </Typography>
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {/* Arrow Controls */}
                {totalNotices > 1 && (
                  <>
                    <IconButton
                      onClick={() => paginate(-1)}
                      size="small"
                      aria-label="Previous announcement"
                      sx={{
                        opacity: 0.6,
                        p: 0.4,
                        '&:hover': { opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.05)' },
                      }}
                    >
                      <ChevronLeftRoundedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      onClick={() => paginate(1)}
                      size="small"
                      aria-label="Next announcement"
                      sx={{
                        opacity: 0.6,
                        p: 0.4,
                        '&:hover': { opacity: 1, backgroundColor: 'rgba(0, 0, 0, 0.05)' },
                      }}
                    >
                      <ChevronRightRoundedIcon fontSize="small" />
                    </IconButton>
                  </>
                )}
              </Box>
            </Box>

            {/* Slideable Notice Body */}
            <Box sx={{ position: 'relative', minHeight: 48, mb: 2, overflow: 'hidden' }}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <Box
                  key={currentNotice.id || currentIndex}
                  component={motion.div}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      lineHeight: 1.35,
                    }}
                  >
                    {currentNotice.title}
                  </Typography>
                </Box>
              </AnimatePresence>
            </Box>

            {/* Footer Row: Progress Dots & Action Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              
              {/* Tracker Slider (Dots) */}
              {totalNotices > 1 ? (
                <Box sx={{ display: 'flex', gap: 0.6, alignItems: 'center' }}>
                  {activeNotices.map((_, idx) => (
                    <Box
                      key={idx}
                      onClick={() => {
                        setDirection(idx > currentIndex ? 1 : -1);
                        setCurrentIndex(idx);
                      }}
                      sx={{
                        width: idx === currentIndex ? 16 : 6,
                        height: 6,
                        borderRadius: '3px',
                        // Force background colors so they don't inherit dark mode text rules
                        backgroundColor: idx === currentIndex ? '#8B1E3F !important' : 'rgba(15, 23, 42, 0.2) !important',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: idx === currentIndex ? '#8B1E3F !important' : 'rgba(15, 23, 42, 0.4) !important',
                        },
                      }}
                    />
                  ))}
                </Box>
              ) : (
                <Box />
              )}

              {/* View Details Button */}
              <Button
                className="view-details-btn" // Exclusion class for the Paper text override
                variant="contained"
                onClick={handleViewNotice}
                endIcon={<ArrowForwardRoundedIcon />}
                sx={{
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.825rem',
                  py: 0.7,
                  px: 2,
                  // Force dark blue button background with pure white text
                  backgroundColor: '#13203A !important',
                  color: '#ffffff !important',
                  boxShadow: '0 2px 8px rgba(19, 32, 58, 0.2)',
                  '&:hover': {
                    backgroundColor: '#1E3258 !important',
                    boxShadow: '0 4px 12px rgba(19, 32, 58, 0.3)',
                  },
                  '& svg': {
                    color: '#ffffff !important',
                  }
                }}
              >
                View Details
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default MultiAnnouncementSpotlight;