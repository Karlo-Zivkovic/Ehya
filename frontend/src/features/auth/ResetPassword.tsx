import { SubmitHandler, useForm } from 'react-hook-form';
import { RiLockPasswordFill } from 'react-icons/ri';
import { SlArrowLeft } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import useResetPassword from './useResetPassword';

function ResetPassword() {
  const { resetingPassword, isResetingPassword } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<{
    password: string;
    passwordConfirm: string;
  }>();

  const onSubmit: SubmitHandler<{
    password: string;
    passwordConfirm: string;
  }> = (formData) => {
    resetingPassword({
      password: formData.password,
      passwordConfirm: formData.passwordConfirm,
    });
  };

  return (
    <div className="flex flex-col gap-10 px-6  justify-center items-center h-screen w-full">
      <RiLockPasswordFill size={100} color="#3b82f6" />
      <h1 className="text-center overflow-y-hidden text-3xl font-semibold">
        Password Reset
      </h1>
      <p className="text-gray-500">Fill the form to reset your password</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 w-full max-w-xl"
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-600" htmlFor="password">
            New Password
          </label>
          <input
            className="h-14 px-4 rounded-lg border outline-none focus:border-gray-400"
            type="password"
            id="password"
            placeholder="Enter password"
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
            <p className="text-red-500 text-xs mt-1">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-600" htmlFor="password">
            Confirm Password
          </label>
          <input
            type="password"
            {...register('passwordConfirm', {
              required: 'This field is required',
              validate: (value) =>
                value === getValues().password || 'Passwords need to match',
            })}
            // disabled={isLoading}
            id="passwordConfirm"
            placeholder="Confirm password"
            className="h-14 px-4 rounded-lg border outline-none focus:border-gray-400"
          />
          {errors.passwordConfirm?.message && (
            <p className="pl-6 text-xs text-red-500">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>

        <button
          disabled={isResetingPassword}
          className="bg-blue-500 text-white h-14 rounded-lg font-semibold disabled:cursor-not-allowed disabled:opacity-70 hover:bg-blue-600 flex items-center justify-center gap-2 text-xl"
        >
          Submit
        </button>
      </form>
      <Link
        to="/login"
        className="hover:text-blue-900 group flex items-center justify-center gap-2"
      >
        <span className="font-bold">
          <SlArrowLeft />
        </span>
        <span className="opacity-50 group-hover:opacity-100">
          Back to Login
        </span>
      </Link>
      <img src="/Logo.svg" alt="logo" className="h-36 w-36" />
    </div>
  );
}

export default ResetPassword;
