import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../pictures/login-animation.gif";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const val = await fetchData.json();
      console.log(val);
      toast(val.message);
      if (val.alert) {
        dispatch(loginRedux(val));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        alert("Invalid Credentials");
        setData(() => {
          return {
            email: "",
            password: "",
          };
        });
      }
    } else {
      alert("Please Enter required fields");
    }
  };
  return (
    <div className="p-20 md:4  ">
      <div className="max-w-sm  bg-slate-300 m-auto flex  flex-col p-10  mt-10">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={signupImg} className="w-full" />
        </div>

        <form className="w-full py-3 flex flex-col " onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            required
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full max-w-[135px] m-auto bg-[#0077c5] hover:bg-[#0066c5] cursor-pointer  text-white text-xl font-medium text-center py-1 rounded mt-4"
          >
            Login
          </button>
        </form>

        <p className="text-left text-sm mt-2">
          New User!! ?{" "}
          <Link
            to={"/signup"}
            className="font-bold ml-1 text-[#0066c5] underline"
          >
            Signup
          </Link>
        </p>
        <p className="text-left text-sm mt-2">
          Forget Password?{" "}
          <Link
            to={"/forget_password"}
            className="font-bold ml-1 text-[#0066c5] underline"
          >
            Forget Password
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
