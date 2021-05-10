import { Switch, withStyles } from '@material-ui/core';
import { updateUserApi } from 'apis/userApi';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';

const RowTableUsers = (props) => {
  const { user, index } = props;
  const { userName, userEmail, isActive, imageUser, date } = user;
  const [isSwitch, setIsSwitch] = useState(isActive);

  const RedSwitch = withStyles({
    switchBase: {
      color: 'rgb(173, 0, 9)',
      '&$checked': {
        color: 'rgb(229, 9, 20)',
      },
      '&$checked + $track': {
        backgroundColor: 'rgb(229, 9, 20)',
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <tr key={user._id}>
      <td className='text-center pl-3rem pt-4'>{index + 1}</td>
      <td className=''>
        <div className='p-square block relative left-1/2 transform -translate-x-1/2'>
          <LazyLoadImage
            alt={imageUser}
            effect='blur'
            src={imageUser}
            wrapperClassName='listUsers__table--img w-full h-full absolute top-0 left-0'
          />
        </div>
      </td>
      <td>{userName}</td>
      <td>{userEmail}</td>
      <td>{dateFormat(new Date(date), 'dddd, mmmm dS, yyyy, h:MM TT')}</td>
      <td>
        <div className='flex justify-center'>
          <RedSwitch
            checked={isSwitch}
            onChange={() => {
              setIsSwitch(!isSwitch);
              updateUserApi(user._id, { isActive: !isSwitch });
            }}
            name='isActive'
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </div>
      </td>
      <td>
        <Link
          to={`/admin/users/${user._id}`}
          className='flex justify-center cursor-pointer'
        >
          <FaEdit className='text-blue-facebook hover:text-blue-facebook-d text-22 transition-all duration-200' />
        </Link>
      </td>
    </tr>
  );
};

RowTableUsers.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default RowTableUsers;