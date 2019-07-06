import React from 'react';

const RenderField = ({ input, label, type, meta: { touched, error } }) => {

  return(
  
        <React.Fragment>
          <input {...input} placeholder={label} type={type} />
          {/* {touched && error && <p className="text-danger">{error}</p>} */}
        </React.Fragment>
    )
}


  export default RenderField

