import axios from 'axios';
import { API_BASE_URL, handleError } from '../utils';

export const updateProfilePicture = async ({
  file,
  token,
}: {
  file: File;
  token: string;
}) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const headers = {
      'Content-Type': 'multipart/form-data',
      authorization: `Bearer ${token}`,
    };

    const data = await axios.patch(`${API_BASE_URL}/api/users`, formData, {
      headers,
    });

    return data.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUserSettings = async ({
  name,
  email,
  token,
}: {
  name: string;
  email: string;
  token: string;
}) => {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };

    const data = await axios.patch(
      `${API_BASE_URL}/api/users/me`,
      { name, email },
      {
        headers,
      },
    );

    return data.data.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateMyPassword = async ({
  currentPassword,
  password,
  passwordConfirm,
  token,
}: {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
  token: string;
}) => {
  try {
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const data = await axios.patch(
      `${API_BASE_URL}/api/users/updateMyPassword`,
      {
        currentPassword,
        password,
        passwordConfirm,
        token,
      },
      { headers },
    );

    return data;
  } catch (error) {
    handleError(error);
  }
};
