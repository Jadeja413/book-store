// import { Button, ButtonGroup, ToggleButton, ToggleButtonGroup } from "@mui/material";
// import { Component } from "react";
// import FormatBoldIcon from '@mui/icons-material/FormatBold';

// export default class Blogs extends Component {
//   constructor(props) {
//     super(props);
//     // console.log('Constructor called');
//     this.state ={
//       name: 'John',
//       changed: false
//     };
//   }

//   static getDerivedStateFromProps() {
//     // console.log('getDerivedStateFromProps called');
//     return null;
//   }

//   componentDidUpdate(){
//     // console.log('componentDidUpdate called');
//   }

//   shouldComponentUpdate(nextProps, nextState){
//     // console.log("shouldComponentUpdate ");
//     return true;
//   }

//   getSnapshotBeforeUpdate() {
//     // console.log('getSnapshotBeforeUpdate');
//   }

//   incrementCounter = () => {
//     this.setState({name: 'Jane', changed: true})
//   }

//   render() {
//     // console.log("rendered");
//     return(
//       <>
//       <div style={{minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
//        {/* <h2 > Comming Soon! </h2>
//        <h4>{this.state.changed ? <p>{this.state.name}</p> : <p>{this.state.name}</p> }</h4>
//        <button onClick={this.incrementCounter}>Counter</button> */}

//        {/* <ButtonGroup
//        variant="outlined"
//        size="large"
//        >
//         <Button>Left</Button>
//         <Button>Bottom</Button>
//         <Button>Right</Button>
//        </ButtonGroup> */}

//        <ToggleButtonGroup >
//        <ToggleButton value='Left'>Left</ToggleButton>
//         <ToggleButton value='Bottom'>Bottom</ToggleButton>
//         <ToggleButton value='Right'>Right</ToggleButton>
//        </ToggleButtonGroup>
//      </div>

//       </>
//     )
//   }
// }










import { Button, ButtonGroup, Chip, MenuItem, Rating, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";
import React, { useState } from "react";

export default function Blogs() {

  const [toggle, setToggle] = useState([]);
  const [country, setCountry] = useState([]);
  const [star, setStar] = useState(null);

  const handler = (e, newValues) => {
    // console.log("+++++", e.target.value);
    setToggle(newValues || []);
    // setToggle(e.target.value);
  }

  const countryHandler = (e, newValues) => {
    // console.log('+===', e.target.value);
    // console.log('newValues', newValues);
    setCountry(e.target.value)
  }

  const starHandler = (e, newValues) => {
    console.log("e.target star", typeof(e.target.value));
    console.log('newVal', newValues);
    setStar(+e.target.value)
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* <h2 > Comming Soon! </h2> */}
      {console.log("country", country)}
      <ToggleButtonGroup value={toggle} onChange={handler} >
        <ToggleButton value='Left'>Left</ToggleButton>
        <ToggleButton value='Bottom'>Bottom</ToggleButton>
        <ToggleButton value='Right'>Right</ToggleButton>
      </ToggleButtonGroup>

      <TextField
        select
        // fullWidth
        label='Select Country'
        value={country}
        onChange={countryHandler}
        SelectProps={{
          multiple: true,
          renderValue: (selected) => (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {selected.map((value) => (
                <Chip key={value} label={value} style={{ margin: '2px', padding: '2px' }} onDelete={()=>console.log(3+'2'+1)}/>
              ))}
            </div>
          ),
        }}
      >
        <MenuItem value='In'>India</MenuItem>
        <MenuItem value='USA'>USA</MenuItem>
        <MenuItem value='AU'>Australia</MenuItem>
      </TextField>

      <Rating value={star} onChange={starHandler} precision={0.5}/>
    </div>
  )
}
