import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, handleClick, handleEnter}) => {
    return(
      <div>
        <p className="f3">
          {'Is that a face in your photo? Enter a link to an image below to start detecting faces!'}
        </p>
        <div className='center'>
          <div className='form center pa4 br3 shadow-5'>
            <input
              onChange={onInputChange}
              type='text'
              className='f4 pa2 w-70 center'
              onKeyPress={handleEnter}/>
            <button
              onClick={handleClick}
              className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
          </div>
        </div>
      </div>
    );
}

export default ImageLinkForm;
