import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'd81fc8f8af6946269ca75407f21888d8'
});

const particlesoptions = {
  particles: {
    number: {
      value: 40,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    const clarifaiFaceArray = data.outputs[0].data.regions;
    const arrayOfBoxPoints = clarifaiFaceArray.map((region) => {
      const clarifaiFace = region.region_info.bounding_box;
      return {
         leftCol: clarifaiFace.left_col * width,
         topRow: clarifaiFace.top_row * height,
         rightCol: width - (clarifaiFace.right_col * width),
         bottomRow: height - (clarifaiFace.bottom_row * height)
       }
    });
    return arrayOfBoxPoints;
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onSubmit = () => {
    this.setState({
      imageUrl: this.state.input
    });
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(error => console.log(error));
  }

  onEnterPress = (event) => {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({
        isSignedIn: false
      });
    } else if (route === 'home') {
      this.setState({
        isSignedIn: true
      });
    }
    this.setState({
      route: route
    });
  }

  render() {
    const {isSignedIn, route, imageUrl, box} = this.state;
    return (
      <div className="App">
        <Particles
          className='particles'
          params={particlesoptions}/>
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}/>

        {this.state.route === 'signin' ?
          <SignIn onRouteChange={this.onRouteChange}/>
          : (
             route === 'home' ?
            <div>
              <Logo/>
              <Rank/>
              <ImageLinkForm
                onInputChange={this.onInputChange}
                handleClick={this.onSubmit}
                handleEnter={this.onEnterPress}/>
              <FaceRecognition
                imageUrl={imageUrl}
                box={box}/>
            </div>
            :
            <Register onRouteChange={this.onRouteChange}/>
          )

        }
      </div>
    );
  }
}

export default App;
