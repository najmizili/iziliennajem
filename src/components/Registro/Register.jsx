import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [emailRegistro, setEmailRegistro] = useState("");
  const [passwordRegistro, setPasswordRegistro] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await auth.registro(userName, emailRegistro, passwordRegistro);
      navigate("/");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("Email is already in use.");
          break;
        case "auth/invalid-email":
          setError("Email is invalid.");
          break;
        default:
          setError("An error occurred while creating the user");
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="max-w-md  mx-auto p-3 bg-black rounded-lg shadow-lg m8Max:w-auto m8Max:m-2">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Sign up</h2>
            {error && (
              <div className="text-base text-red-500 font-medium text-center">
                <p>{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label htmlFor="input-name" className="text-white block mb-1">
                Name
                </label>
                <input
                  type="text"
                  id="input-name"
                  name="name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-2 rounded-md bg-green-900 text-white border border-green-900 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="input-email" className="text-white block mb-1">
                Email
                </label>
                <input
                  type="email"
                  id="input-email"
                  name="email"
                  value={emailRegistro}
                  onChange={(e) => setEmailRegistro(e.target.value)}
                  placeholder="Your e-mail"
                  className="w-full px-4 py-2 rounded-md bg-green-900 text-white border border-green-900 focus:outline-none focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="input-password"
                  className="text-white block mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="input-password"
                  name="password"
                  onChange={(e) => setPasswordRegistro(e.target.value)}
                  value={passwordRegistro}
                  placeholder="Your Password"
                  className="w-full px-4 py-2 rounded-md bg-green-900 text-white border border-green-900 focus:outline-none focus:border-green-500"
                />
              </div>
              <button
  type="submit"
  style={{ display: 'block', margin: 'auto' }}
  className="bg-green-900 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out"
>
  Create account
</button>
            </form>
            <p className="mt-3 text-center text-white">
            Do you already have an account?
              <Link to={"/Login"}>
                <span className="font-bold ml-1 text-blue-500 hover:underline">
                Log in
                </span>
              </Link>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
