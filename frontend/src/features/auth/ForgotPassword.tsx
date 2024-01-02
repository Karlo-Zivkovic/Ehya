import { SubmitHandler, useForm } from 'react-hook-form';
import { BsExclamationCircleFill } from 'react-icons/bs';
import { SlArrowLeft } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import useForgotPassword from './useForgotPassword';

function ForgotPassword() {
  const { sendTokenMail, isSendingTokenMail } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit: SubmitHandler<{ email: string }> = (formData) => {
    sendTokenMail(formData.email);
  };

  return (
    <div className="flex flex-col gap-10 px-6  justify-center items-center h-screen w-full">
      <BsExclamationCircleFill size={100} color="#3b82f6" />
      <h1 className="text-center overflow-y-hidden text-3xl font-semibold">
        Forgot Password?
      </h1>
      <p className="text-gray-500">
        Enter your email and we will send you a link to reset your password
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7 w-full max-w-xl"
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-600" htmlFor="email">
            Email
          </label>
          <input
            className="h-14 px-4 rounded-lg border outline-none focus:border-gray-400"
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
          disabled={isSendingTokenMail}
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

export default ForgotPassword;
