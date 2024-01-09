import React, { useEffect } from "react";
import "./DetailsPage.css";
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { Stack, Typography } from "@mui/material";

export default function DetailsPage() {
  

  return (
    <div className="container">
      <div className="imgSection">
        {/* <img src="https://minio.b336522.dev.eastus.az.svc.builder.cafe/sbucket/ddjl6plcepj2lxdicll6vnv0jo9y" alt="product's image" /> */}
      </div>
      <div className="contentSection">
        <Typography variant="h3">
          content
        </Typography>
        <Typography variant="caption">Rating {<StarRateRoundedIcon fontSize="small"/>}| Review</Typography>
        <Typography variant="h5">
          Price
        </Typography>
        <Typography variant="h5">
          ₹ 100.00
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <TaskAltIcon fontSize="small"/>
          <Typography variant="caption">
            In Stock
          </Typography>
        </Stack>
      </div>
    </div>
  )

}
