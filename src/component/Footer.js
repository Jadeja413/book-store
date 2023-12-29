import { Link } from "react-router-dom";

export function Footer() {

  return (
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", color: "white", left: "0", right: "0", bottom: "0", height: "100px", backgroundColor: "gray", padding:"10px 20px", textDecoration: "underline"}}>
      <div>Home</div>
      <div>||</div>
      <div>Top Rated</div>
      <div>||</div>
      <div>Places</div>
      <div>||</div>
      <div>Rating</div>
      <div>||</div>
      <div>Contact Us</div>
    </div>
  )
}
