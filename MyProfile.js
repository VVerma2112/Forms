import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import signupImg from "../pictures/login-animation.gif";
import toast, { Toaster } from "react-hot-toast";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { useDispatch, useSelector } from "react-redux";

const MyProfile = () => {
  const userData = useSelector((state) => state.user);
  console.log(userData);
  const [data, setData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    image: userData.image,
    _id: userData._id,
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleUploadProfileImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(data);
    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
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
    const { firstName, email, password } = data;
    if (firstName && email) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/myprofile`,
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

      if (val.alert) {
        toast("Successfully Updated Details!!");
      } else {
        toast("Something Wrong");
      }
    } else {
      alert("Please Enter required fields");
    }
  };

  return (
    <div className="p-6 md:p-8 bg-slate-300 p-10">
      <h2 className="text-lg md:text-2xl font-bold text-slate-600 ">
        My Profile
      </h2>
      <div className="w-full max-w-3xl m-auto p-4 md:flex bg-white flex flex-col rounded">
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative my-4">
          <img
            src={userData.image ? userData.image : signupImg}
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

        <form className="w-full py-3 " onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name *</label>
          <input
            type={"text"}
            id="firstName"
            name="firstName"
            placeholder="Enter your First Name"
            required
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            defaultValue={userData.firstName}
            onChange={handleOnChange}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type={"text"}
            id="lastName"
            name="lastName"
            placeholder="Enter your Last Name"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            defaultValue={userData.lastName}
            onChange={handleOnChange}
          />
          <label htmlFor="EmployeeId">EmployeeId *</label>
          <input
            // type="text"
            id="EmployeeId"
            name="EmployeeId"
            required
            placeholder="Enter your EmployeeId"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />
          <label htmlFor="DOB">DOB</label>
          <input
            type='date'
            id="DOB"
            name="DOB"
            placeholder="Enter your DOB"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
          />

          <label htmlFor="email">Email *</label>
          <input
            type={"email"}
            id="email"
            name="email"
            placeholder="Enter your Email"
            required
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            defaultValue={userData.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password *</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Create a password"
              pattern="^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,}$"
              title="Password must contain at least 1 digit, 1 letter, 1 special character, and be at least 8 characters long."
              className="w-full bg-slate-200 border-none outline-none"
              defaultValue={userData.password}
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
            className="w-full max-w-[135px] m-auto py-1 bg-yellow-500 hover:bg-yellow-600 cursor-pointer  text-white text-sm font-medium text-center p-3 rounded my-2"
          >
            Update Profile
          </button>
        </form>

        <p className="text-left text-sm mt-2">
          Everything seems Good!{" "}
          <Link to={"/"} className="font-bold ml-1 text-blue-500 underline">
            Explore JIN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default MyProfile;
