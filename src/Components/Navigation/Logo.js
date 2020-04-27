import React from 'react';
import Tilt from 'react-tilt';
import brain  from './brainLogo.jpg'

function Logo() {
  return (
    <div className='ma4 mt0'>
        <Tilt className="Tilt br4 shadow-2" options={{ max : 25 }} style={{ height: 140, width: 150 }} >
        <div className="Tilt-inner">
        <img  className ='br4' src={brain} alt='brain-logo' />
             </div>
        </Tilt>         
    </div>
  );
}

export default Logo;