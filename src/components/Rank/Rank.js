import React from 'react';

const Rank = ({name, entries, numFaces}) => {

  return(
    <div>
      <div className='white f3'>
        {`${name}, you have found`}
      </div>
      <div className='white f1'>
        {`${numFaces} ${numFaces === '1' ? 'face' : 'faces'} in ${entries} ${entries === '1' ? 'photo' : 'photos'}!`}
      </div>
    </div>
  );
}

export default Rank;
