/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React from 'react';
import { MdRefresh } from 'react-icons/md';
import './style.scss';

const InputImageFile = (props) => {
  const {
    id,
    placeholder,
    setState,
    value,
    width,
    styleContainer,
    styleLabel,
    valueDefault,
    styleReset,
  } = props;

  const imagePreview = (param) => {
    return (
      <div className={`addEdit_imagePreview ${width}`}>
        <img src={param} alt='preview' className='w-full' />
      </div>
    );
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      // setPreviewSource(reader.result);
      setState(reader.result);
    };
  };

  const handleOnChange = (e) => {
    const file = e.currentTarget.files[0];
    previewFile(file);
  };

  return (
    <div className={`text-white flex items-center ${styleContainer}`}>
      {value ? imagePreview(value) : null}
      <div className={`flex flex-col items-center ${styleLabel}`}>
        <label
          htmlFor={id}
          className='relative font-bold text-16 bg-red-primary py-4 px-8 rounded-md cursor-pointer hover:bg-red-primary-d'
        >
          {placeholder}
          <input
            id={id}
            type='file'
            className='absolute left-0 z-negative1 opacity-0'
            onChange={handleOnChange}
            // value={value}
          />
        </label>
        <MdRefresh
          className={`text-white cursor-pointer transform transition-all duration-600 hover:rotate-360 ease-in-out ${styleReset}`}
          onClick={() => setState(valueDefault)}
        />
      </div>
    </div>
  );
};

InputImageFile.propTypes = {
  id: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  placeholder: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  styleContainer: PropTypes.string,
  styleLabel: PropTypes.string,
  valueDefault: PropTypes.string.isRequired,
  styleReset: PropTypes.string,
};

InputImageFile.defaultProps = {
  styleContainer: '',
  styleLabel: '',
  styleReset: '',
};

export default InputImageFile;
