import { Link } from 'react-router-dom';
import useLogin from '../features/auth/useLogin';
import { LoginType } from '../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { BounceLoader } from 'react-spinners';

function Login() {
  const { login, isLogingIn } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>();
  const onSubmit: SubmitHandler<LoginType> = (formData) => login(formData);

  return (
    <div className="flex flex-col gap-10 px-6  justify-center items-center h-screen w-full">
      <h1 className="text-center overflow-y-hidden text-3xl font-semibold">
        Login
      </h1>
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
            <p className="text-red-500 text-xs mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-600" htmlFor="password">
            Password
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
              {errors.password.message}
            </p>
          )}
        </div>

        <Link
          to="/forgotPassword"
          className="hover:text-blue-900 text-sm text-blue-600 font-semibold"
        >
          Forgot password?
        </Link>
        <button
          disabled={isLogingIn}
          className="bg-blue-500 text-white h-14 rounded-lg font-semibold disabled:cursor-not-allowed disabled:opacity-70 hover:bg-blue-600 flex items-center justify-center gap-2 text-xl"
        >
          Sign In {isLogingIn && <BounceLoader color="#fff" size={20} />}
        </button>
        <p className="text-sm font-semibold text-slate-500">
          Do not have an account?
          <Link to="/signup" className="hover:text-blue-900 text-blue-600">
            {' '}
            Register now
          </Link>
        </p>
      </form>
      <img src="/Logo.svg" alt="logo" className="h-36 w-36" />
    </div>
  );
}

export default Login;

