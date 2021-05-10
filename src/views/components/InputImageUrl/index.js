/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { MdRefresh } from 'react-icons/md';

const InputImageUrl = (props) => {
  const {
    className,
    placeholder,
    value,
    setState,
    styleContainer,
    valueDefault,
    styleReset,
  } = props;
  const [input, setInput] = useState('');

  const handleOnChange = (e) => {
    setInput(e.target.value);
    setState(e.target.value);
  };

  const imagePreview = (url) => {
    return <img className={`${className}`} src={url} alt='poster' />;
  };

  return (
    <div
      className={` text-white flex flex-col items-center content-between flex-1 ${styleContainer}`}
    >
      {input ? imagePreview(input) : value ? imagePreview(value) : null}
      <input
        type='text'
        className='bg-transparent focus:outline-none py-6 px-8 rounded-md bg-gray-primary-d text-16 text-white w-full border-b border-gray-primary'
        onChange={handleOnChange}
        placeholder={placeholder}
        value={input}
      />
      <MdRefresh
        className={`text-white cursor-pointer transform transition-all duration-600 hover:rotate-360 ease-in-out ${styleReset}`}
        onClick={() => setState(valueDefault)}
      />
    </div>
  );
};

InputImageUrl.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  styleContainer: PropTypes.string,
  styleReset: PropTypes.string,
  valueDefault: PropTypes.string.isRequired,
};

InputImageUrl.defaultProps = {
  styleContainer: '',
  className: '',
  styleReset: '',
};

export default InputImageUrl;
