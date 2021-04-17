/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const InputImageUrl = (props) => {
  const { className, placeholder, value, setState } = props;
  const [input, setInput] = useState('');

  const handleOnChange = (e) => {
    setInput(e.target.value);
    setState(e.target.value);
  };

  const imagePreview = (url) => {
    return <img className={`my-6 ${className}`} src={url} alt='poster' />;
  };

  return (
    <div className='bg-gray-primary-d text-white flex flex-col items-center content-between mb-6 flex-1 first:mr-6 rounded-md'>
      <input
        type='text'
        className='bg-transparent py-6 px-8 rounded-md bg-gray-primary-d text-16 text-white w-full border-b border-gray-primary'
        onChange={handleOnChange}
        placeholder={placeholder}
        value={input}
      />
      {console.log(input)}
      {input ? imagePreview(input) : value ? imagePreview(value) : null}
    </div>
  );
};

InputImageUrl.propTypes = {
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
};

export default InputImageUrl;
