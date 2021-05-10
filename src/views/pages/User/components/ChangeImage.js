/* eslint-disable jsx-a11y/label-has-associated-control */
import { Modal, Switch, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { VscClose } from 'react-icons/vsc';
import InputImageFile from 'views/components/InputImageFile';
import InputImageUrl from 'views/components/InputImageUrl';

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 52,
    height: 28,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.common.white,
    '&$checked': {
      transform: 'translateX(24px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: 'rgb(229, 9, 20)',
        borderColor: 'rgb(229, 9, 20)',
      },
    },
  },
  thumb: {
    width: 24,
    height: 24,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${'rgb(229, 9, 20)'}`,
    borderRadius: 28 / 2,
    opacity: 1,
    backgroundColor: 'rgb(229, 9, 20)',
  },
  checked: {},
}))(Switch);

const ChangeImage = (props) => {
  const {
    modalImage,
    toggleModalImage,
    toggleSwitchMode,
    switchMode,
    onChange,
    imageUser,
    user,
  } = props;
  return (
    <>
      <Modal
        open={modalImage}
        onClose={toggleModalImage}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='flex items-center justify-center'
      >
        <div className='bg-black-body flex items-center flex-col overflow-hidden rounded-2xl outline-none relative px-8 py-14 sm:px-24 sm:py-24'>
          <div
            className='absolute top-1rem sm:top-3rem right-1rem sm:right-3rem bg-black-body hover:bg-gray-primary-d transition-all duration-200 p-2 rounded-full cursor-pointer'
            onClick={toggleModalImage}
          >
            <VscClose className='text-30 text-white' />
          </div>
          <h3 className='text-30 sm:text-40 w-30rem sm:w-unset font-bold text-white mb-16 text-center'>
            Thay đổi ảnh đại diện
          </h3>
          <label className='flex items-center mb-6'>
            <span className='text-16 text-white mr-4'>URL</span>
            <AntSwitch
              checked={switchMode}
              onChange={toggleSwitchMode}
              name='checkedC'
            />
            <span className='text-16 text-white ml-4'>Upload</span>
          </label>
          {switchMode ? (
            <InputImageFile
              id='imageUser'
              value={imageUser}
              valueDefault={user.get('imageUser')}
              placeholder='Chọn ảnh'
              width='w-18rem'
              setState={onChange}
              styleContainer='flex-col'
              styleLabel='mt-10'
              styleReset='mt-6 text-40'
            />
          ) : (
            <>
              <InputImageUrl
                value={imageUser}
                valueDefault={user.get('imageUser')}
                placeholder='URL ảnh'
                className='w-18rem mb-10'
                styleContainer='w-30rem'
                setState={onChange}
                styleReset='mt-6 text-40'
              />
              <button
                className='text-16 text-white bg-red-primary py-4 px-8 font-bold rounded-md hover:bg-red-primary-d mt-6 transition-all duration-200'
                type='button'
                onClick={toggleModalImage}
              >
                Đóng
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

ChangeImage.propTypes = {
  modalImage: PropTypes.bool.isRequired,
  toggleModalImage: PropTypes.func.isRequired,
  toggleSwitchMode: PropTypes.func.isRequired,
  switchMode: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  imageUser: PropTypes.string.isRequired,
  user: PropTypes.any.isRequired,
};

export default ChangeImage;
