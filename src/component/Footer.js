import { Link } from "react-router-dom";

export function Footer() {

  return (
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", color: "white", left: "0", right: "0", bottom: "0", height: "100px", backgroundColor: "gray", padding:"10px 20px", textDecoration: "underline"}}>
      <div><Link to="/" style={{color: "white"}}>Home</Link></div>
      <div>||</div>
      <div>Top Rated</div>
      <div>||</div>
      <div>Places</div>
      {/* <div>||</div>
      <div>Rating</div> */}
      <div>||</div>
      <div><Link to="/contact" style={{color: "white"}}>Contact Us</Link></div>
    </div>
  )
}
