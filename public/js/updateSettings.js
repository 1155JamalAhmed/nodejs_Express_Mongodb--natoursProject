import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alerts';

export const updateData = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/updateMe',
      data
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Info Updated successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const updatePassword = async (
  password,
  newPassword,
  passwordNewConfirm
) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: 'http://localhost:3000/api/v1/users/updateMyPassword',
      data: {
        password,
        newPassword,
        passwordNewConfirm
      },
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Password Changed successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
