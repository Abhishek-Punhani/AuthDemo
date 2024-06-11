import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation";
import AuthInput from "./authInput";
import { PulseLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { loginUser } from "../../reducers/userSlice";
import { useRouter } from "next/router";
export default function LoginForm() {
  const { status, error } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (values) => {
    let res = await dispatch(loginUser({ ...values }));

    if (res?.payload?.user) {
      router.push("/");
    }
  };

  return (
    <div className="w-full max-h-max flex items-center justify-center ">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/*Heading*/}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-sm">Sign In</p>
        </div>
        {/*Form*/}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="email"
            label="Email Address"
            type="text"
            placeholder="Enter Your Email Address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="password"
            label="Password"
            type="password"
            placeholder="Enter Your Password"
            register={register}
            error={errors?.password?.message}
          />
          {/* IF ERROR EXISTS */}
          {error ? (
            <div>
              <p className="text-red-400">{error} </p>
            </div>
          ) : null}

          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-xl tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-100"
            type="submit"
          >
            {status == "loading" ? (
              <PulseLoader color="#fff" size={12} />
            ) : (
              "SignIn"
            )}
          </button>
        </form>
        {/* SignUp link */}
        <p className="flex flex-col items-center justify-center text-center mt-10 text-md dark:text-dark_text_1">
          <span>New here?</span>
          <Link
            href="/register"
            className="hover:underline cursor-pointer transition ease-in duration-300"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}
