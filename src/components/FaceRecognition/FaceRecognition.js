import React, {Component} from 'react';
import './FaceRecognition.css';

class FaceRecognition extends Component {

  render() {

    const boxes = this.props.box.map((boundary, i) => {
      return (
        <div key={i}
             className='bounding-box'
             style={{top: boundary.topRow, right: boundary.rightCol, bottom: boundary.bottomRow, left: boundary.leftCol}}>
        </div>
      );
    });

      return (
        <div className='center ma'>
          <div className='absolute mt2'>
            <img id='inputimage' src={this.props.imageUrl} width='500px' height='auto' alt=''/>
            <div>{boxes}</div>
          </div>
        </div>
      );
  }
}

export default FaceRecognition;
