import { useForm, SubmitHandler } from 'react-hook-form';
import { UserSettingsType } from '../types';
import { useContext } from 'react';
import { AppContext } from '../context/context';
import useUpdateProfilePicture from '../features/user/useUpdateProfilePicture';
import Loader from '../components/Loader';
import { API_BASE_URL } from '../utils';
import useUpdateUserSettings from '../features/user/useUpdateUserSettings';
import UpdateMyPassword from '../features/user/UpdateMyPassword';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';

function Account() {
  const { userInfo, setUserInfo } = useContext(AppContext);
  const { updatingUserSettings, isUpdatingUserSettings } =
    useUpdateUserSettings();
  const { updatingProfilePicture, isUpdatingProfilePicture } =
    useUpdateProfilePicture();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSettingsType>({
    defaultValues: { name: userInfo?.name, email: userInfo?.email },
  });

  const handleChangePhoto = (data: FileList) => {
    const photo = data[0];
    updatingProfilePicture(photo, {
      onSuccess: (data) => {
        setUserInfo((user) => ({ ...user!, photo: data.photo }));
        localStorage.setItem('user', JSON.stringify(data));
      },
    });
  };

  const onSubmit: SubmitHandler<UserSettingsType> = (formData) => {
    updatingUserSettings(
      { name: formData.name, email: formData.email },
      {
        onSuccess: (data) => {
          setUserInfo((user) => ({
            ...user!,
            name: formData.name,
            email: formData.email,
          }));
          localStorage.setItem('user', JSON.stringify(data));
        },
      },
    );
  };

  return (
    <div className="p-4 sm:max-w-xl sm:mx-auto lg:max-w-5xl">
      <Link
        to="/"
        className="flex justify-end mb-2 gap-2 items-center text-blue-800 hover:underline"
      >
        <FaLongArrowAltLeft />
        <span>Back</span>
      </Link>
      <h1 className="mb-4 text-blue-800 text-4xl">Your Account Settings</h1>
      <h2 className="font-semibold text-gray-600 text-lg lg:text-xl italic mt-8">
        Change your profile picture
      </h2>
      <div className="flex gap-4 items-center mt-4">
        <img
          crossOrigin="anonymous"
          className="h-28 w-28 rounded-full"
          src={
            `${API_BASE_URL}/users/${userInfo?.photo}` ||
            `${API_BASE_URL}/users/default.jpg`
          }
          alt="profile picture"
        />
        {isUpdatingProfilePicture ? (
          <Loader color="#1e40af" />
        ) : (
          <div className="text-violet-500 text-sm cursor-pointer hover:text-violet-600">
            <input
              type="file"
              onChange={(e) => handleChangePhoto(e.target.files!)}
              className="file:border-blue-800 file:bg-white file:text-blue-800 text-blue-800"
            />
          </div>
        )}
      </div>
      <form
        className="flex flex-col gap-7 w-full mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="font-semibold text-gray-600 text-lg lg:text-xl italic mt-8">
          Change your account settings
        </h2>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-600" htmlFor="name">
            Name
          </label>
          <input
            className={`h-14 px-4 rounded-lg border outline-none focus:border-gray-400 ${
              errors.name ? 'border-red-500' : 'border-[#c3cad9]'
            }`}
            placeholder="Enter name"
            type="text"
            id="name"
            {...register('name', {
              minLength: {
                value: 1,
                message: 'Name length must be at least 1 character',
              },
              required: {
                value: true,
                message: 'Name is required',
              },
            })}
          />
          {errors.name?.message && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}{' '}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-600" htmlFor="email">
            Email
          </label>
          <input
            className={`h-14 px-4 rounded-lg border outline-none focus:border-gray-400 ${
              errors.email ? 'border-red-500' : 'border-[#c3cad9]'
            } `}
            placeholder="Enter email"
            type="email"
            id="email"
            {...register('email', {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Enter a valid email',
              },
              required: {
                value: true,
                message: 'Email is required',
              },
            })}
          />
          {errors.email?.message && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <button
          disabled={isUpdatingUserSettings}
          className="border-2 w-full disabled:opacity-60 disabled:cursor-not-allowed hover:text-white hover:bg-blue-500 border-blue-500 rounded-md py-2 font-semibold text-blue-700"
        >
          Save Settings
        </button>
      </form>
      <UpdateMyPassword />
    </div>
  );
}

export default Account;
