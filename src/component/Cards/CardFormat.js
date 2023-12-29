import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

export function CardFormat(props) {
  const {name, rating, image} = props;
  return (
    <div style={{margin: "20px 20px"}}>
      <Card sx={{ height: 400 }}>
        <CardMedia
          component="img"
          // alt="green iguana"
          alt={name}
          height="140"
          // image="/Animal.jpg"
          image={image}
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" sx={{ width: "100%", height: 60, overflow: "hidden"}}>
            <Tooltip title={name}>
              {name}
            </Tooltip>
            {/* {name} */}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ width: "100%", height: 80, overflow: "auto", scrollbarWidth: "none", '&::-webkit-scrollbar': {display: 'none'}}}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions sx={{width: "100%", bottom: 0, height: 50}}>
          <Button size="small" variant="outlined">Details</Button>
          <Button size="small" variant="contained" sx={{textWrap: "nowrap"}}>Book Now</Button>
        </CardActions>
      </Card>
    </div>
  )
}
