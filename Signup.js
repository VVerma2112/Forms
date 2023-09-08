import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../pictures/login-animation.gif";
import toast, { Toaster } from "react-hot-toast";
import { ImagetoBase64 } from "../utility/ImagetoBase64";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((preve) => !preve);
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

  const handleUploadProfileImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
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
        // alert(val.message);
        toast(val.message);
        if (val.alert) {
          navigate("/login");
        }
      } else {
        alert("Password and confirm password does not matched");
      }
      // }
    } else {
      alert("Please Enter required fields");
    }
  };
  return (
    <div className="p-20 md:4 bg-slate-300">
      <div className="max-w-sm  bg-white m-auto flex  flex-col p-10 mb-4 ">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img
            src={data.image ? data.image : signupImg}
            className="w-full h-full"
          />
          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-60 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input
              type={"file"}
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col " onSubmit={handleSubmit}>
          <label htmlFor="Name">Name</label>
          <input
            type={"text"}
            id="Name"
            name="Name"
            required
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.Name}
            onChange={handleOnChange}
          />
          <label htmlFor="EmployeeID">EmployeeID</label>
          <input
            type={"text"}
            id="EmployeeID"
            name="EmployeeID"
            required
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.EmployeeID}
            onChange={handleOnChange}
          />

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
              pattern="^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
              title="Password must contain at least 1 digit, 1 letter, 1 special character, and be at least 8 characters long."
              className="w-full bg-slate-200 border-none outline-none"
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

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              required
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full m-auto bg-[#0077c5] hover:bg-[#0066c5] cursor-pointer  text-white text-xl font-medium text-center py-1 rounded mt-4"
          >
            Create account
          </button>
        </form>

        <p className="text-left text-sm mt-2">
          Already Registered User!! ?{" "}
          <Link
            to={"/login"}
            className="font-bold ml-1 text-blue-500 underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
