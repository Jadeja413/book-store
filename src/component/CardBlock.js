import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function CardBlock({book}) {

  return (
    <Card >
      <CardActionArea >
        <CardMedia
          component="img"
          height="140"
          image={book.cover_image}
          alt={book.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography gutterBottom variant="h7" component="div">
            {book.author}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {book.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="outlined" color="primary" >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  )
}
