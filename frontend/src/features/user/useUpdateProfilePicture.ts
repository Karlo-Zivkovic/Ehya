import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateProfilePicture } from '../../services/userApi';
import { useContext } from 'react';
import { AppContext } from '../../context/context';

export default function useUpdateProfilePicture() {
  const { token } = useContext(AppContext);
  const {
    mutate: updatingProfilePicture,
    isPending: isUpdatingProfilePicture,
    error: updatingProfilePictureError,
  } = useMutation({
    mutationFn: (file: File) => updateProfilePicture({ file, token }),
    onSuccess: () => {
      toast.success('Picture successfully changed');
      // queryclient.invalidateQueries({ queryKey: ['articles'] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    updatingProfilePicture,
    isUpdatingProfilePicture,
    updatingProfilePictureError,
  };
}
