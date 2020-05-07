import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import NavBar from './Components/Navigation/NavBar';
import Logo from './Components/Navigation/Logo';
import ImageForm from './Components/ImageForm/ImageForm';
import Rank from './Components/Rank/Rank';
import FaceRecog from './Components/FaceRecognisation/FaceRecog';
import 'tachyons';
import SignIn from './Components/SignIn/Signin';
import Register from './Components/Register/Register';


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

const initialState = {
  input:'',
  imgUrl:'',
  box: {},
  route:'signin',
  isSignedIn: false,
  user:{
    name:'',
    email:'',
    entries:0,
    id : '',
    joined : ''
  }
}

class App extends Component{
  constructor(){
    super();
    this.state= initialState;
  }

  loadUser = (data)=>{
    this.setState({ user: {
        name:data.name,
        email:data.email,
        entries:data.entries,
        id : data.id,
        joined : data.joined
    }})
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
    fetch('https://obscure-ocean-70775.herokuapp.com/imageClarafai', {
      method:'post',
      headers:{
          'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
          input: this.state.input
      })
      }).then(response => response.json())
      .then(response=>{
        if(response){
          fetch('https://obscure-ocean-70775.herokuapp.com/image', {
            method:'put',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id: this.state.user.id
            })
        }).then(response => response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        }).catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(err => console.log(err));    
      
  }

  onRouteChange= (route)=>{
    if(route ==='signout'){
      this.setState(initialState);
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
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageForm  onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
          <FaceRecog box={box} imgUrl={imgUrl}/>
        </div>
        : (
          route ==='signin'
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
        )
        }
      </div>
    );
  }
}

export default App;
