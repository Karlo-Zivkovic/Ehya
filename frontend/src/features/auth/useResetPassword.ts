import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../services/authApi';

export default function useResetPassword() {
  const params = useParams();
  const token = params.token as string;
  const navigate = useNavigate();

  const {
    mutate: resetingPassword,
    isPending: isResetingPassword,
    error,
  } = useMutation({
    mutationFn: ({
      password,
      passwordConfirm,
    }: {
      password: string;
      passwordConfirm: string;
    }) => resetPassword({ password, passwordConfirm, token }),
    onSuccess: (data) => {
      navigate('/login');
      toast.success(data.message);
    },
    onError: () => {
      toast.error('Failed to send a link');
    },
  });
  return { resetingPassword, isResetingPassword, error };
}
