import React from 'react';
import ReactDOM from 'react-dom';
import { Carousel} from 'rsuite';
import './index.css';



const Details = (props) => {
  const mystyle = {
  width: "50vw",
  overflow: "hidden",
  borderRadius: "5px",
  margin: "2rem auto",
  //boxShadow: " 0 5px 10px ",
  transition: "width 2s",
  position:"relative"
 
  };
  
  
  return (
    
<div class="grid-container">

<div class="text">
    {props.text}
</div>

        <div class="grid-child green">
           <Carousel  className="custom-slider"  style={mystyle}  shape="bar" >
                  <img src="https://maxcdn.icons8.com/app/uploads/2019/09/education-illustrations-10.png"  ></img>
                   {/* <img src="https://wowslider.com/sliders/demo-93/data1/images/sunset.jpg" ></img> */}
                   <img src="https://i.pinimg.com/originals/4b/4b/c8/4b4bc8f0e26e86fcbdfb5b7a898ee910.jpg"  ></img>
                   <img src="https://i.pinimg.com/originals/77/75/5e/77755e565ef7ddbff2546231cd8732bf.png"  ></img>
        
           </Carousel>
        </div>

</div>
    



   
  )
};



export default Details;
