import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import GavelOutlinedIcon from '@mui/icons-material/BalanceOutlined';
import { tokens } from '../theme.js';
import AnimatedSection from './AnimatedSection.jsx';

const SERVICES = [
  { icon: DescriptionIcon, title: 'Service of Summons & Process', text: 'Formal delivery of summonses, notices and court documents, with a signed Return of Service.' },
  { icon: GavelIcon, title: 'Warrants of Execution', text: 'Lawful execution of court issued warrants against a debtor’s movable property.     ' },
  { icon: HomeWorkIcon, title: 'Evictions', text: 'Court ordered evictions carried out in line with the relevant eviction legislation.' },
  { icon: StorefrontIcon, title: 'Sales in Execution', text: 'Public auctions of attached movable or immovable property, conducted transparently.' },
  { icon: AccountBalanceIcon, title: 'Attachments', text: 'Attachment of movable and immovable property pursuant to a court order or judgment.' },
  { icon: GavelOutlinedIcon, title: 'Emoluments Attachment', text: 'Administration of garnishee and emoluments attachment orders for judgment debt recovery.' },
  { icon: AssignmentTurnedInIcon, title: 'Section 65 Notices', text: 'Service of financial enquiry notices in terms of section 65 of the Magistrates’ Courts Act.' },
  { icon: ReceiptLongIcon, title: 'Returns of Service', text: 'Certified, court admissible records confirming how and when an instruction was executed.' },
];

const ServiceCard = ({ icon: Icon, title, text, index }) => (
  <Grid item xs={12} sm={6} md={3} key={title}>
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      style={{ height: '100%' }} // <-- Added this to fix the height uniformity
    >
      <Paper
        elevation={0}
        sx={{
          p: 3.5,
          height: '100%',
          background: '#fff',
          border: `1px solid ${tokens.hairline}`,
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(19,32,58,0.14)',
          },
          '&:hover .underline': { width: '100%' },
        }}
      >
        <Box
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            background: tokens.parchmentDeep,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2.2,
          }}
        >
          <Icon sx={{ color: tokens.bronze, fontSize: 26 }} />
        </Box>
        <Typography sx={{ fontWeight: 700, color: tokens.navyInk, mb: 1, fontSize: '1.02rem' }}>
          {title}
        </Typography>
        <Typography sx={{ color: tokens.inkSoft, fontSize: '0.88rem', lineHeight: 1.65 }}>
          {text}
        </Typography>
        <Box
          className="underline"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 3,
            width: '22%',
            background: tokens.bronze,
            transition: 'width 0.4s ease',
          }}
        />
      </Paper>
    </motion.div>
  </Grid>
);

const Services = () => {
  return (
    <AnimatedSection id="services">
      <Box sx={{ background: '#fff', py: { xs: 9, md: 13 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 9 }, maxWidth: 640, mx: 'auto' }}>
            <Typography variant="overline" sx={{ color: tokens.bronze, display: 'block', mb: 1.5 }}>
              What We Do
            </Typography>
            <Typography variant="h2" sx={{ color: tokens.navyInk, fontSize: { xs: '2rem', md: '2.6rem' } }}>
              Services rendered by the Office
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {SERVICES.map((service, i) => (
              <ServiceCard key={service.title} index={i} {...service} />
            ))}
          </Grid>
        </Container>
      </Box>
    </AnimatedSection>
  );
};

export default Services;