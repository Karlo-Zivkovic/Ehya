import { useMutation } from '@tanstack/react-query';
import { updateMyPassword } from '../../services/userApi';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import toast from 'react-hot-toast';

export default function useUpdateMyPassword() {
  const { token } = useContext(AppContext);
  const {
    mutate: updatingMyPassword,
    isPending: isUpdatingMyPassword,
    error,
  } = useMutation({
    mutationFn: ({
      currentPassword,
      password,
      passwordConfirm,
    }: {
      currentPassword: string;
      password: string;
      passwordConfirm: string;
    }) =>
      updateMyPassword({ currentPassword, password, passwordConfirm, token }),
    onSuccess: () => {
      toast.success('Password successfully updated');
    },
    onError: () => {
      toast.error('Failed to update the password');
    },
  });
  return { updatingMyPassword, isUpdatingMyPassword, error };
}
