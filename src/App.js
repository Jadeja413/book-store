import logo from './logo.svg';
import './App.css';
import { Routes, Route } from "react-router-dom";
import InsertCommentTwoToneIcon from '@mui/icons-material/InsertCommentTwoTone';
import ResponsiveAppBar from './component/Header';
import SimpleBottomNavigation from './component/Bottom';
import CarouselPage from './component/Carousel';
import ReactSlick from './component/ReactSlick';
import OfferCard from './component/OfferCard';
import MovieCards from './component/Cards/MovieCards';
import { Footer } from './component/Footer';
import { Tooltip } from '@mui/material';
import { SignIn } from './component/Cards/signin/SignIn';
import Home from './component/Home';
import Auth from './component/Auth';
import Books from './component/Books';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Auth />
      <Footer />
      {/* <Books /> */}
      {/* <CarouselPage /> */}
      {/* <ReactSlick /> */}
      {/* <OfferCard />
      <MovieCards /> */}
      {/* <SimpleBottomNavigation /> */}

      {/* <div style={{position: "sticky", top: "0px", right: "0px"}}>
        <Tooltip title="Need Help?">
        <InsertCommentTwoToneIcon sx={{fontSize: "80px"}}/>
        </Tooltip>
      </div> */}

      {/* <SignIn /> */}

    </div>
  );
}

export default App;
