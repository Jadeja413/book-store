import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.87)', color: 'white', py: 3 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are a leading e-commerce platform providing a wide range of books. Our mission is to promote reading culture by offering a diverse selection of books at competitive prices.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom >
              Quick Links
            </Typography>
            <Box sx={{ display: 'grid' }}>
              <Link href="/" style={{ color: 'white', padding: '5px' }}>
                Home
              </Link>
              {/* <Link href="/about" variant="body2" display="block" gutterBothrefm underline="hover">
              About
            </Link> */}
              <Link href="/contact" style={{ color: 'white', padding: '5px' }} >
                Contact
              </Link>
              <Link href="/faq" style={{ color: 'white', padding: '5px' }}>
                FAQ
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box display="flex">
              <Link href="https://www.facebook.com" style={{ color: 'white', padding: '5px' }} >
                <Facebook />
              </Link>
              <Link href="https://www.twitter.com" style={{ color: 'white', padding: '5px' }} >
                <Twitter />
              </Link>
              <Link href="https://www.instagram.com" style={{ color: 'white', padding: '5px' }}>
                <Instagram />
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            © {new Date().getFullYear()} Book Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
