import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import { updateUserSettings } from '../../services/userApi';
import toast from 'react-hot-toast';

export default function useUpdateUserSettings() {
  const { token } = useContext(AppContext);
  const {
    mutate: updatingUserSettings,
    isPending: isUpdatingUserSettings,
    error: userSettingsError,
  } = useMutation({
    mutationFn: ({ name, email }: { name: string; email: string }) =>
      updateUserSettings({ name, email, token }),
    onSuccess: () => {
      toast.success('Settings successfully updated');
    },
    onError: () => {
      toast.error('Failed to update user settings');
    },
  });

  return { updatingUserSettings, isUpdatingUserSettings, userSettingsError };
}
