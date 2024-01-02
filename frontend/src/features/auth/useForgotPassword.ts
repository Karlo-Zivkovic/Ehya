import { useMutation } from '@tanstack/react-query';
import { forgotPassword } from '../../services/authApi';
import toast from 'react-hot-toast';

export default function useForgotPassword() {
  const {
    mutate: sendTokenMail,
    isPending: isSendingTokenMail,
    error,
  } = useMutation({
    mutationFn: (email: string) => forgotPassword(email),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Failed to send a link");
    },
  });
  return { sendTokenMail, isSendingTokenMail, error };
}
