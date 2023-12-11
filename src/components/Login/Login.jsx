import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FcGoogle } from "react-icons/fc";
import Loading from "../Loading/Loading";

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    await auth.loginWithGoogle().then(() => {
      navigate("/");
    });
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setLoading(true);
      await auth.login(emailLogin, passwordLogin).then(() => {
        navigate("/");
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/missing-password") {
        setError("Incorrect password");
      }
      if (error.code === "auth/invalid-login-credentials") {
        setError("Incorrect Account");
      }
      if (error.code === "auth/invalid-email") {
        setError("Wrong email");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="">
        {loading ? (
          <Loading />
        ) : (
          <div className="max-w-md  mx-auto p-3 bg-black rounded-lg shadow-lg m8Max:w-auto m8Max:m-2">
            <h2 className="text-2xl font-semibold text-white mb-1 text-center">
              Login
            </h2>
            {error && (
              <div className="p-2 mb-2 text-base text-red-500 font-medium text-center">
                <p>{error}</p>
              </div>
            )}
            <form>
              <div className="mb-2">
                <label htmlFor="email" className="text-white block mb-1">
                E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                  placeholder="Your E-mail"
                  className=" px-2 py-2 rounded-md bg-green-900 text-white border border-green-900 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-white block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={passwordLogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                  placeholder="Your password"
                  className="px-2 py-2 rounded-md bg-green-900 text-white border border-green-900 focus:outline-none focus:border-green-500"
                />
              </div>
              <button
  type="submit"
  className="mr-2 bg-green-900 hover:bg-green-600 text-white font-semibold py-2.5 px-6 rounded-md shadow-md transition duration-300 ease-in-out"
  onClick={(e) => handleSubmit(e)}
>
  Sign in
</button>

<button
  type="button"
  className="bg-white  hover:bg-slate-300 text-black font-semibold py-1 px-2 rounded-md shadow-md transition duration-300 ease-in-out"
  onClick={(e) => handleGoogle(e)}
>
  <FcGoogle className="inline-block m-2  mt-3" />
  Google
</button>
            </form>

            <p className="mt-3 text-left text-white">
            Don't have an account?
              <Link to={"/register"}>
                <span className="font-bold ml-1 text-blue-500 hover:underline">
                Sign up
                </span>
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
