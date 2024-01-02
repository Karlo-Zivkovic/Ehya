import { useMutation } from '@tanstack/react-query';
import { login as loginApi } from '../../services/authApi';
import { useNavigate } from 'react-router';
import { LoginType } from '../../types';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AppContext } from '../../context/context';

export default function useLogin() {
  const { setUserInfo } = useContext(AppContext);
  const navigate = useNavigate();
  const { mutate: login, isPending: isLogingIn } = useMutation({
    mutationFn: ({ email, password }: LoginType) =>
      loginApi({ email, password }),
    onSuccess: (data) => {
      toast.success('Successfully logged in');
      setUserInfo(data?.user);
      navigate('/');
      localStorage.setItem('jwt', JSON.stringify(data?.token));
      localStorage.setItem('user', JSON.stringify(data?.data.user));
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { login, isLogingIn };
}

