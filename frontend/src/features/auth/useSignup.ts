import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/authApi';
import { SignupType } from '../../types';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';

export default function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending: isSigningup } = useMutation({
    mutationFn: ({ name, email, password, passwordConfirm }: SignupType) =>
      signupApi({ name, email, password, passwordConfirm }),
    onSuccess: () => {
      toast.success('You signed up, now log in to get access');
      navigate('/login');
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isSigningup };
}

