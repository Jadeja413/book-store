import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';


// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      {/* <Grid container>
        <Grid item>

        </Grid>
      </Grid> */}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography variant='h4' sx={{ color: 'darkblue', margin: '40px 40px', padding: "10px 10px", display: 'flex', justifyContent: 'center' }}>
          Frequently asked questions
        </Typography>
      </Box>

      <Box sx={{ width: '60%', margin: 'auto', marginBottom: '40px' }}>
        <form >
          <TextField
            style={{ margin: "auto", width: '100%' }}
            id="search-bar"
            className="text"
            onInput={(e) => {
              // setSearchQuery(e.target.value);
            }}
            label="Search..."
            variant="outlined"
            // placeholder="Search..."
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton type="submit" aria-label="search">
                    <SearchIcon style={{ fill: "blue" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* <IconButton type="submit" aria-label="search">
      <SearchIcon style={{ fill: "blue" }} />
    </IconButton> */}
        </form>
      </Box>
      <Box sx={{ maxWidth: 'xl', margin: 'auto' }}>
        <Accordion elevation={0} borderBottom='2px solid gray' square disableGutters expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ marginTop: '1px', borderBottom: '1px gray', borderTop: '1px gray' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              General settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
              Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion elevation={0} square disableGutters expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{ marginTop: '1px', marginBottom: '1px', borderBottom: '1px gray', borderTop: '1px gray' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
              varius pulvinar diam eros in elit. Pellentesque convallis laoreet
              laoreet.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion elevation={0} square disableGutters expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{ marginTop: '1px', borderBottom: '1px gray' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Advanced settings
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
              amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion elevation={0} square disableGutters expanded={expanded === 'panel4'} onChange={handleChange('panel4')} sx={{ marginTop: '1px', borderBottom: '1px gray' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
              amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </div>
  );
}
