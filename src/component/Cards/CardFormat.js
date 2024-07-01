import React, { useContext, useEffect, useState } from 'react';
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
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { StorageContext, UserDataContext } from '../Context';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconButton } from '@mui/material';
import axios from 'axios';
import { TokenContext } from '../ContextCreate';


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
  const { id, name, author, description, image, year, detailProducts } = props;
  const navigate = useNavigate();

  const data = useContext(StorageContext);
  const { setUserData } = useContext(UserDataContext);
  const { token, setToken } = useContext(TokenContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  async function AddToWishListHandler(id) {
    // const updatedCartList = data.cartList.filter(book => book.id !== id);

    // data.setWishList((list) => {
    //   if (!list.some(item => item.id === id)) {
    //     toast.success("Added To Your WishList!", {
    //       position: toast.POSITION.TOP_CENTER,
    //       autoClose: 1500
    //     });
    //     return list.concat({ id: id });
    //   }
    //   toast.success("Already Added To Your WishList!", {
    //     position: toast.POSITION.TOP_CENTER,
    //     autoClose: 1500
    //   })
    //   return list;
    // }
    // );
    // data.setCartList(updatedCartList);

    try {
      // const user = localStorage.getItem('user');
      const user = JSON.parse(localStorage.getItem('user'));

      const response = await axios.post('http://localhost:9000/wishlist/add',
        {
          userId: user._id, bookId: id,

        }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      // console.log('resp', response);
      // setUserData({...userData, wishlistCount: userData.wishlistCount + 1})
      setUserData((prev) => ({ ...prev, wishlistCount: prev.wishlistCount + 1 }));

      const updatedUser = { ...user, wishlistCount: user.wishlistCount + 1 };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success("Added To Your WishList!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500
      });
      // const localS = JSON.parse(localStorage.getItem('user'));
      // const updatedLocal = {...localS, wishlistCount: response.data.wishlistCount};
      // localStorage.setItem('user', JSON.stringify(updatedLocal));
      // console.log('localS', localS)
      // console.log('updatedLocal', updatedLocal)
    } catch (error) {
      if (error.response?.data.message === 'jwt expired') {
        localStorage.clear();
        setToken(null);
        navigate('/login')
      } else {
        toast.error(error.response?.data.message, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500
        })
        // console.log('error', error)
      }
    }
  }

  const buyHandler = async (event) => {
    event.stopPropagation();
    navigate(`/product/${id}`);
  }

  return (
    <div style={{ padding: '10px 10px' }} >
      <Card sx={{ height: 400, position: "relative", width: '260px', margin: detailProducts ? 'auto' : '0px 28px' }}>
        <IconButton
          onClick={() => AddToWishListHandler(id)}
          style={{ zIndex: "1", position: "absolute", right: "0px", top: "0px", color: "gray" }}
        >
          <FavoriteBorderOutlined htmlColor="gray" />
        </IconButton>

        {/* <FavoriteBorderOutlined style={{ margin: "20px 20px", position: "absolute", right: "0px", top: "0px" }} onClick={()=>AddToWishListHandler(id)} /> */}
        <CardMedia
          component="img"
          alt={name}
          height="140"
          image={image}
        />
        <CardContent >
          <Tooltip
            title={name}
            placement="top-start"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -14],
                    },
                  },
                ],
              },
            }}>
            <Typography onClick={() => navigate(`/product/${id}`)} gutterBottom variant="h5" component="div" sx={{ height: 60, overflow: "hidden", cursor: "pointer" }}>
              {name}
            </Typography>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" sx={{ height: 80, overflow: "auto", scrollbarWidth: "none", '&::-webkit-scrollbar': { display: 'none' } }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ bottom: 0, height: 50 }}>
          <Button size="small" variant="outlined" onClick={(e) => { e.stopPropagation(); handleOpen() }}>Details</Button>
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
              <Typography id="modal-modal-description" sx={{}}>
                {description}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Since: {year}
              </Typography>
            </Box>
          </Modal>
          <Button size="small" variant="contained" sx={{ textWrap: "nowrap" }} onClick={buyHandler}>BUY Now</Button>
        </CardActions>
      </Card>
    </div>
  )
}
