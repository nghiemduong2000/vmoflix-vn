import { Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { VscClose } from 'react-icons/vsc';

const ChangePassword = (props) => {
  const {
    modalChangePassword,
    toggleModalChangePassword,
    handleSubmitChangePassword,
    oldPassword,
    newPassword,
    reNewPassword,
    onChangeOldPw,
    onChangeNewPw,
    onChangeReNewPw,
    error,
  } = props;
  return (
    <Modal
      open={modalChangePassword}
      onClose={toggleModalChangePassword}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='flex items-center justify-center'
    >
      <div className='bg-black-body flex items-center flex-col overflow-hidden rounded-2xl outline-none relative px-8 py-14 sm:px-24 sm:py-24'>
        <div
          className='absolute top-1rem sm:top-3rem right-1rem sm:right-3rem bg-black-body hover:bg-gray-primary-d transition-all duration-200 p-2 rounded-full cursor-pointer'
          onClick={toggleModalChangePassword}
        >
          <VscClose className='text-30 text-white' />
        </div>
        <h3 className='text-30 lg:text-40 text-white font-bold mb-2'>
          Đổi mật khẩu
        </h3>
        <p className='text-16 sm:text-18 text-red-primary text-center mb-10 w-30rem sm:w-35rem'>
          <strong>Lưu ý:</strong>
          {` Thay đổi mật khẩu sẽ tự động đăng xuất trên tất cả các thiết bị
                kể cả thiết bị này`}
        </p>
        <form onSubmit={handleSubmitChangePassword}>
          {!error ? null : (
            <div className='bg-gray-primary-d mb-8 border border-red-500 rounded-lg text-16 sm:text-18 py-4 px-6 text-red-500 w-30rem sm:w-35rem text-center'>
              {error}
            </div>
          )}
          <input
            type='password'
            value={oldPassword}
            className='bg-gray-primary-d text-white text-16 sm:text-18 px-8 py-6 mb-6 rounded-md w-30rem sm:w-35rem block'
            onChange={(e) => {
              onChangeOldPw(e);
            }}
            placeholder='Mật khẩu cũ'
          />
          <input
            type='password'
            value={newPassword}
            className='bg-gray-primary-d text-white text-16 sm:text-18 px-8 py-6 mb-6 rounded-md w-30rem sm:w-35rem block'
            onChange={(e) => {
              onChangeNewPw(e);
            }}
            placeholder='Mật khẩu mới'
          />
          <input
            type='password'
            value={reNewPassword}
            className='bg-gray-primary-d text-white text-16 sm:text-18 px-8 py-6 mb-6 rounded-md w-30rem sm:w-35rem block'
            onChange={(e) => {
              onChangeReNewPw(e);
            }}
            placeholder='Nhập lại mật khẩu mới'
          />
          <button
            className='text-16 text-white bg-red-primary px-8 py-6 font-bold rounded-md transition-all duration-200 hover:bg-red-primary-d mt-6 w-full'
            type='submit'
          >
            Thay đổi
          </button>
        </form>
      </div>
    </Modal>
  );
};

ChangePassword.propTypes = {
  modalChangePassword: PropTypes.bool.isRequired,
  toggleModalChangePassword: PropTypes.func.isRequired,
  handleSubmitChangePassword: PropTypes.func.isRequired,
  oldPassword: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  reNewPassword: PropTypes.string.isRequired,
  onChangeOldPw: PropTypes.func.isRequired,
  onChangeNewPw: PropTypes.func.isRequired,
  onChangeReNewPw: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
};

export default ChangePassword;
