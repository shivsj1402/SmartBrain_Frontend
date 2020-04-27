import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import NavBar from './Components/Navigation/NavBar';
import Logo from './Components/Navigation/Logo';
import ImageForm from './Components/ImageForm/ImageForm';
import Rank from './Components/Rank/Rank';
import FaceRecog from './Components/FaceRecognisation/FaceRecog';
import 'tachyons';
import SignIn from './Components/SignIn/Signin';
import Register from './Components/Register/Register';
const app = new Clarifai.App({
  apiKey: '675456be9868458fba9b135ee3503583'
 });

const particalParms = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}
class App extends Component{
  constructor(){
    super();
    this.state={
      input:'',
      imgUrl:'',
      box: {},
      route:'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox =(box)=>{
    this.setState({box : box})
  }
  onInputChange = (e) => {
    console.log(e.target.value)
    this.setState({
      input: e.target.value
    })
  }

  onSubmit= (e)=>{
    this.setState({
      imgUrl: this.state.input
    })
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response=> this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));    
      
  }

  onRouteChange= (route)=>{
    if(route ==='signout'){
      this.setState({isSignedIn:false});
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route:route});
  }

  render() {
    const { isSignedIn , imgUrl, route ,box } = this.state;
    return (
      <div className="App">
        <Particles className='particles' 
                params={particalParms}
              />
        <NavBar onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        <Logo />
        { route ==='home'
        ? <div>
          <Rank />
          <ImageForm  onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <FaceRecog box={box} imgUrl={imgUrl}/>
        </div>
        : (
          route ==='signin'
          ? <SignIn onRouteChange={this.onRouteChange}/> 
          : <Register onRouteChange={this.onRouteChange}/> 
        )
        }
      </div>
    );
  }
}

export default App;
