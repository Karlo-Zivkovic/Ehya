import axios from 'axios';
import { LoginType, SignupType } from '../types';
import { API_BASE_URL, handleError } from '../utils';

export async function signup({
  name,
  email,
  password,
  passwordConfirm,
}: SignupType) {
  try {
    const data = await axios.post(`${API_BASE_URL}/api/users/signup`, {
      name,
      email,
      password,
      passwordConfirm,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
}
export async function login({ email, password }: LoginType) {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/users/login`, {
      email,
      password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
}

export async function forgotPassword(email: string) {
  try {
    const data = await axios.post(`${API_BASE_URL}/api/users/forgotPassword`, {
      email,
    });
    return data.data;
  } catch (error) {
    handleError(error);
  }
}

export async function resetPassword({
  password,
  passwordConfirm,
  token,
}: {
  password: string;
  passwordConfirm: string;
  token: string;
}) {
  try {
    const data = await axios.patch(
      `${API_BASE_URL}/api/users/resetPassword/${token}`,
      {
        password,
        passwordConfirm,
      },
    );
    return data.data;
  } catch (error) {
  handleError(error);}
}

