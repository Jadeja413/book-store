import React from 'react';
import { Container, Grid, Box, Typography, Link } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

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
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" variant="body2" display="block" gutterBottom>
              Home
            </Link>
            {/* <Link href="/about" color="inherit" variant="body2" display="block" gutterBottom>
              About
            </Link> */}
            <Link href="/contact" color="inherit" variant="body2" display="block" gutterBottom>
              Contact
            </Link>
            <Link href="/faq" color="inherit" variant="body2" display="block" gutterBottom>
              FAQ
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box display="flex">
              <Link href="https://www.facebook.com" color="inherit" sx={{ mr: 1 }}>
                <Facebook />
              </Link>
              <Link href="https://www.twitter.com" color="inherit" sx={{ mr: 1 }}>
                <Twitter />
              </Link>
              <Link href="https://www.instagram.com" color="inherit">
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
