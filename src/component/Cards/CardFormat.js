import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 500,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export function CardFormat(props) {
  const { id, name, author, description, image, year } = props;
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ margin: "20px 20px" }} >
      <Card sx={{ height: 400 }}>
        <CardMedia
          component="img"
          alt={name}
          height="140"
          image={image}
        />
        <CardContent >
          <Typography onClick={()=>navigate(`/product/${id}`)} gutterBottom variant="h5" component="div" sx={{ height: 60, overflow: "hidden", cursor: "pointer" }}>
            <Tooltip title={name}>
              {name}
            </Tooltip>
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ height: 80, overflow: "auto", scrollbarWidth: "none", '&::-webkit-scrollbar': { display: 'none' } }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ bottom: 0, height: 50 }}>
          <Button size="small" variant="outlined" onClick={(e)=>{e.stopPropagation(); handleOpen()}}>Details</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h3" component="h2">
                {name}
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
                Author: {author}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Description:
              </Typography>
              <Typography id="modal-modal-description" sx={{ }}>
              {description}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Since: {year}
              </Typography>
            </Box>
          </Modal>
          <Button size="small" variant="contained" sx={{ textWrap: "nowrap" }} onClick={(e)=>{e.stopPropagation(); navigate(`/product/${id}`)}}>BUY Now</Button>
        </CardActions>
      </Card>
    </div>
  )
}
