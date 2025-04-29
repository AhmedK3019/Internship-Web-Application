import React, { useState } from 'react';
import './index.css';
import Login from './Login'


function Register(){
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState('Small (50 employees or less)');
  const [logo, setLogo] = useState(null);
  const [email, setEmail] = useState('');
  const [file, setFile] = useState(null);

  function handleLogoChange(event) {
    const file = event.target.files[0];
    if (file) {
      setLogo(file);

      // Preview logo if you want
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e){
    e.preventDefault();
    if (!name || !industry || !size || !logo || !email) {
      setMessage('Please fill in all fields.');
      return;
    }
    return(<Login/>);
  }

  return(
    <div className='page'>
        <form onSubmit={handleSubmit}>

        </form>
    </div>

  );
}

export default Register