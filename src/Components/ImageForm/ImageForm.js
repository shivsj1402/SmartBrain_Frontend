import React from 'react';
import './imageForm.css';

function ImageForm({ onInputChange, onSubmit }) {
  return (
    <div>
        <p className ='f3'>
            {'This SmartBrain will detect Faces. Give it a try!'}
        </p>
        <div className='center'>
            <div className='pa4 br3 shadow-5 form center'>
                <input className ='f4 pa2 w-70' type='tex' onChange={onInputChange}></input>
                <button className ='f4 pa2 w-30 link pointer ph3 pv2 dib grow bg-light-purple' onClick={onSubmit}>Detect!</button>
            </div>
        </div>
    </div>
  );
}

export default ImageForm;