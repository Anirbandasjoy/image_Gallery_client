/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useState } from "react";
import { BsFillSendArrowDownFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { AuthContextType } from "../helper/type";
import { AuthContext } from "../contex/AuthProvider";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
      "Password at least 6 char and one uppercase one spacial char"
    )
    .required(),
});

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(
    AuthContext as React.Context<AuthContextType>
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [registerErr, setRegisterErr] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(true);
  const onSubmit = async (data: any) => {
    try {
      setRegisterErr(null);
      setLoading(true);
      const user = await loginUser(data?.email, data?.password);
      console.log(user);
      setLoading(false);
      alert("Login Successfully");
      navigate("/");
      reset();
    } catch (error) {
      setLoading(false);
      console.error("Registration Error:", error);
      setRegisterErr("Somting Was Rong");
    }
  };

  // console.log(profilePic?.name);
  // console.log(profilePic);
  return (
    <div className="px-2">
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white dark:bg-gray-100 px-8 sm:px-12 relative space-y-4 rounded-md py-12 sm:py-20 w-[35rem]">
          {registerErr && (
            <div className="py-3 bg-white text-center dark:bg-gray-800 px-3  border-red-600 border dark:text-red-500 text-red-500   dark:border-red-600  outline-red-500 text-sm rounded-md">
              {registerErr}
            </div>
          )}
          <div>
            <h1 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
              Please Login Now
            </h1>
          </div>
          <div className="">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex items-center flex-col  gap-5">
                <div className="flex flex-col gap-1 w-full">
                  <input
                    type="text"
                    {...register("email")}
                    placeholder="Email"
                    className="py-3 bg-[#ecf0f1] px-3  border-gray-300 border dark:text-black dark:bg-gray-50  dark:border-gray-600  outline-none text-sm rounded-md"
                  />
                  <p className="text-red-500 text-xs dark:text-red-400 font-semibold">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="flex flex-col gap-1 w-full relative">
                  <input
                    type={showPassword ? "password" : "text"}
                    {...register("password")}
                    placeholder="Password"
                    className="py-3 bg-[#ecf0f1] px-3  border-gray-300 border dark:text-black dark:bg-gray-50   dark:border-gray-600  outline-none text-sm rounded-md"
                  />
                  <p className="text-red-500 text-xs dark:text-red-400 font-semibold">
                    {errors.password?.message}
                  </p>
                  <div
                    className="absolute right-6 top-[23%] cursor-pointer "
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <AiTwotoneEye className="text-[22px] text-[#7b7f80] " />
                    ) : (
                      <AiTwotoneEyeInvisible className="text-[22px] text-[#7b7f80] " />
                    )}
                  </div>
                </div>
              </div>

              {loading ? (
                <button
                  type="submit"
                  className="py-2 px-3 w-full rounded-md bg-[#1abc9c] text-gray-100  flex items-center justify-center gap-1 cursor-pointer"
                >
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  className="py-2 px-3 w-full rounded-md bg-[#1abc9c] text-gray-100  flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span className="font-bold">Continue</span>
                  <BsFillSendArrowDownFill />
                </button>
              )}
              <p className="dark:text-gray-400">
                Not Register?please{" "}
                <Link to="/Register" className="text-red-500">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
