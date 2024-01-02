import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { SignupType } from "../types";
import useSignup from "../features/auth/useSignup";
import { BounceLoader } from "react-spinners";

function Signup() {
  const { signup, isSigningup } = useSignup();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<SignupType>();
  const onSubmit: SubmitHandler<SignupType> = (formData) => signup(formData);

  return (
    <div className="flex flex-col gap-10 px-6  justify-center items-center h-screen w-full">
      <h1 className="overflow-hidden text-center text-3xl font-semibold">Sign Up</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-7  w-full max-w-xl"
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-600" htmlFor="name">
            Name
          </label>
          <input
            className={`h-14 px-4 rounded-lg border outline-none focus:border-gray-400 ${
              errors.name ? "border-red-500" : "border-[#c3cad9]"
            }`}
            placeholder="Enter name"
            type="text"
            id="name"
            {...register("name", {
              minLength: {
                value: 1,
                message: "Name length must be at least 1 character",
              },
              required: {
                value: true,
                message: "Name is required",
              },
            })}
          />
          {errors.name?.message && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}{" "}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-600" htmlFor="email">
            Email
          </label>
          <input
            className={`h-14 px-4 rounded-lg border outline-none focus:border-gray-400 ${
              errors.email ? "border-red-500" : "border-[#c3cad9]"
            }`}
            placeholder="Enter email"
            type="email"
            id="email"
            {...register("email", {
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Enter a valid email",
              },
              required: {
                value: true,
                message: "Email is required",
              },
            })}
          />{" "}
          {errors.email?.message && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-600" htmlFor="password">
            Password
          </label>
          <input
            className={`h-14 px-4 rounded-lg border outline-none focus:border-gray-400 ${
              errors.password ? "border-red-500" : "border-[#c3cad9]"
            }`}
            type="password"
            id="password"
            placeholder="Enter password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
          />
          {errors.password?.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            className="font-semibold text-slate-600"
            htmlFor="passwordConfirm"
          >
            Confirm Password
          </label>
          <input
            className={`h-14 px-4 rounded-lg border outline-none focus:border-gray-400 ${
              errors.passwordConfirm ? "border-red-500" : "border-[#c3cad9]"
            }`}
            type="password"
            id="passwordConfirm"
            placeholder="Enter confirm password"
            {...register("passwordConfirm", {
              required: {
                value: true,
                message: "Confirm password is required",
              },
              validate: (value) =>
                value === getValues().password || "Passwords need to match",
            })}
          />{" "}
          {errors.passwordConfirm?.message && (
            <p className="text-red-500 text-xs mt-1">
              {errors.passwordConfirm.message}
            </p>
          )}
        </div>

        <button
          disabled={isSigningup}
          className="bg-blue-500 text-white h-14 rounded-lg font-semibold disabled:cursor-not-allowed disabled:opacity-70 hover:bg-blue-600 flex items-center justify-center gap-2 text-xl"
        >
          Register {isSigningup && <BounceLoader color="#fff" size={20} />}
        </button>
        <p className="text-sm font-semibold text-slate-500">
          You have an account?
          <Link to="/login" className="text-blue-600">
            {" "}
            Login now
          </Link>
        </p>
      </form>
      <img src="/Logo.svg" alt="logo" className="h-36 w-36" />
    </div>
  );
}

export default Signup;
