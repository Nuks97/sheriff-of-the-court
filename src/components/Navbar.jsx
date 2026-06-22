import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { tokens } from '../theme.js';
import logo from '../assets/logo.jpg';
import logo1 from '../assets/logo1.png';

const NAV_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Services', id: 'services' },
  { label: 'Process', id: 'process' },
  { label: 'Jurisdiction', id: 'jurisdiction' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home'); // Tracks the current viewed section
  const isMobile = useMediaQuery('(max-width:900px)');
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 60 });

  const solid = scrolled || isMobile;

  // Automatically watch sections as the user scrolls
  useEffect(() => {
    const observerOptions = {
      root: null,
      // Triggers when a section covers the upper-middle area of the viewport
      rootMargin: '-30% 0px -60% 0px', 
      threshold: 0,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Track all elements matching our navbar IDs
    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: solid
            ? `linear-gradient(135deg, ${tokens.navyInk} 0%, ${tokens.navyDeep} 100%)`
            : 'transparent',
          boxShadow: solid ? '0 8px 28px rgba(11,20,38,0.28)' : 'none',
          transition: 'background 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease',
          py: scrolled && !isMobile ? 0.5 : 1.25,
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1320,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 4 },
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box
            onClick={() => goTo('home')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              cursor: 'pointer',
              transition: 'opacity 0.3s',
              '&:hover': { opacity: 0.85 },
            }}
          >
            <Box
              component="img"
              src={logo1}
              alt="Sheriff of the Court crest"
              sx={{
                height: scrolled ? 44 : 58,
                width: 'auto',
                transition: 'height 0.35s ease',
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
              }}
            />
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Box
                sx={{
                  color: '#fff',
                  fontFamily: '"Fraunces", serif',
                  fontWeight: 600,
                  fontSize: '1.05rem',
                  lineHeight: 1.1,
                }}
              >
                Seshego Sheriff
              </Box>
              <Box
                sx={{
                  color: tokens.bronzeLight,
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                Upholding the Dignity We Serve
              </Box>
            </Box>
          </Box>

          {/* Navigation items container */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Button
                  key={item.id}
                  onClick={() => goTo(item.id)}
                  sx={{
                    color: '#fff',
                    fontSize: '0.92rem',
                    opacity: isActive ? 1 : 0.8,
                    borderRadius: 0,
                    borderBottom: isActive 
                      ? `2px solid ${tokens.bronze}` 
                      : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': { 
                      opacity: 1, 
                      borderBottom: `2px solid ${tokens.bronze}`, 
                      background: 'transparent' 
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
            
            {/* Invisible placeholder matching the exact space of your previous layout button */}
            <Box sx={{ width: 180 }} />
          </Box>

          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }}
            aria-label="Open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: `linear-gradient(165deg, ${tokens.navyInk} 0%, ${tokens.navyDeep} 100%)`,
            color: '#fff',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1.5 }}>
          <IconButton onClick={() => setDrawerOpen(false)} sx={{ color: '#fff' }} aria-label="Close menu">
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 1 }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <ListItemButton 
                key={item.id} 
                onClick={() => goTo(item.id)} 
                sx={{ 
                  borderRadius: 1,
                  background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                  color: isActive ? tokens.bronzeLight : '#fff'
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;