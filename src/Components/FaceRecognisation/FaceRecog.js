import React from 'react';
import './FaceRecog.css';

function FaceRecog({ imgUrl, box }) {
  return (
    <div className='center na'>
      <div className='absolute mt2'>
        <img id='inputimage' src={imgUrl} alt='' width='500px' height='auto'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecog;