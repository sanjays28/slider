
import React from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'rsuite';
import { Button, Icon } from 'rsuite';
import './index.css';
import './rsuite/dist/styles/rsuite-default.css';


function App() {
  const mystyle = {
  width: "50vw",
  overflow: "hidden",
  borderRadius: "5px",
  margin: "2rem auto",
  //boxShadow: " 0 5px 10px ",
  transition: "width 2s",
  position:"relative"
 
  };

  const main = {
    width: "100vw",
    overflow: "hidden",
    borderRadius: "5px",
    margin: "2rem auto",
    //boxShadow: " 0 5px 10px ",
    transition: "width 2s",
    position:"relative"
   
    };
  
  

  
  return (
    <div className="main" style={main}> 
      <div class="grid-container">
        <div class="text">
          Vlinder.io
          <br></br>
            <Button appearance="ghost" size="lg"> 
              <Icon icon="facebook-official"></Icon> visit us!
            </Button>
        </div>

        <div class="grid-child green">
           <Carousel  className="custom-slider"  style={mystyle}  shape="dot" autoplay>
                  <img src="https://maxcdn.icons8.com/app/uploads/2019/09/education-illustrations-10.png"  ></img>
                   <img src="https://i.pinimg.com/originals/4b/4b/c8/4b4bc8f0e26e86fcbdfb5b7a898ee910.jpg"  ></img>
                   <img src="https://i.pinimg.com/originals/77/75/5e/77755e565ef7ddbff2546231cd8732bf.png"  ></img>
        
           </Carousel>
        </div>
      </div>
    </div>
    
  )
};

ReactDOM.render(<App/>,document.getElementById("root"))


export default App;
