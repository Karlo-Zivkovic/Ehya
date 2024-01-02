import { useForm, SubmitHandler } from 'react-hook-form';
import useUpdateMyPassword from './useUpdateMyPassword';

function UpdateMyPassword() {
  const { updatingMyPassword, isUpdatingMyPassword } = useUpdateMyPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<{
    currentPassword: string;
    password: string;
    passwordConfirm: string;
  }>();

  const onSubmit: SubmitHandler<{
    currentPassword: string;
    password: string;
    passwordConfirm: string;
  }> = (formData) => {
    updatingMyPassword(
      {
    currentPassword: formData.currentPassword,
        password: formData.password,
        passwordConfirm: formData.passwordConfirm,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return (
    <form
      className="flex flex-col gap-7 w-full mb-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-slate-600" htmlFor="name">
          Current Password
        </label>
        <input
          className={`h-14 px-4 rounded-lg border outline-none focus:border-gray-400 ${
            errors.currentPassword ? 'border-red-500' : 'border-[#c3cad9]'
          }`}
          placeholder="Enter current password"
          type="password"
          id="currentPassword"
          {...register('currentPassword', {
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
        />
        {errors.currentPassword?.message && (
          <p className="text-red-500 text-xs mt-1">
            {errors.currentPassword.message}
          </p>
        )}{' '}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-slate-600" htmlFor="name">
          New Password
        </label>
        <input
          className={`h-14 px-4 rounded-lg border outline-none focus:border-gray-400 ${
            errors.password ? 'border-red-500' : 'border-[#c3cad9]'
          }`}
          placeholder="Enter password"
          type="password"
          id="password"
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required',
            },
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters long',
            },
          })}
        />
        {errors.password?.message && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}{' '}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-semibold text-slate-600" htmlFor="email">
          Confirm Password
        </label>
        <input
          className={`h-14 px-4 rounded-lg border outline-none focus:border-gray-400 ${
            errors.passwordConfirm ? 'border-red-500' : 'border-[#c3cad9]'
          } `}
          placeholder="Confirm Password"
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              value === getValues().password || 'Passwords need to match',
          })}
        />
        {errors.passwordConfirm?.message && (
          <p className="text-red-500 text-xs mt-1">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>
      <button
        disabled={isUpdatingMyPassword}
        className="border-2 w-full disabled:opacity-60 disabled:cursor-not-allowed hover:text-white hover:bg-blue-500 border-blue-500 rounded-md py-2 font-semibold text-blue-700"
      >
        Update Password
      </button>
    </form>
  );
}

export default UpdateMyPassword;
