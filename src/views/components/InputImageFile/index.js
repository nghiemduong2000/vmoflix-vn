/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './style.scss';

const InputImageFile = (props) => {
  const { id, placeholder, setState, value, width } = props;
  const [previewSource, setPreviewSource] = useState('');

  const imagePreview = (param) => {
    return (
      <div className={`addEdit_imagePreview ${width}`}>
        <img src={param} alt='preview' />
      </div>
    );
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setState(reader.result);
    };
  };

  const handleOnChange = (e) => {
    const file = e.currentTarget.files[0];
    previewFile(file);
  };

  return (
    <div className='text-white flex items-center mr-6'>
      <label
        htmlFor={id}
        className='relative text-16 bg-red-primary py-3 px-5 rounded-md cursor-pointer hover:bg-red-primary-d mr-6'
      >
        {placeholder}
        <input
          id={id}
          type='file'
          className='absolute left-0 z-negative1'
          onChange={handleOnChange}
          // value={value}
        />
      </label>
      {previewSource
        ? imagePreview(previewSource)
        : value
        ? imagePreview(value)
        : null}
    </div>
  );
};

InputImageFile.propTypes = {
  id: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
};

export default InputImageFile;
