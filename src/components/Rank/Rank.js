import React from 'react';

const Rank = ({name, entries, box}) => {

  const numFaces = box.length;

  let photos = 'photos';
  if (entries === 1) {
    photos = 'photo';
  }

  let faces = 'faces';
  if (numFaces === 1) {
    faces = 'face';
  }

  return(
    <div>
      <div className='white f3'>
        {`${name}, you have found`}
      </div>
      <div className='white f1'>
        {`${numFaces} ${faces} in ${entries} ${photos}!`}
      </div>
    </div>
  );
}

export default Rank;
