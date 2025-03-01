import React, { useState } from 'react';
import Link from 'next/link'; // Use Next.js Link for routing
import axios from 'axios'; // Axios for HTTP requests
import { useRouter } from "next/router";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import icons

const Signup = () => {
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password
   const [role, setRole] = useState("Admin"); // Default role

  const router = useRouter(); 
   
  const submit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let isValid = true;

    // Validation logic
    if (!name.trim()) {
      isValid = false;
      newErrors.name = "Name is required.";
    }
    if (!email.trim()) {
      isValid = false;
      newErrors.email = "Email is required.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      isValid = false;
      newErrors.email = "Please enter a valid email address.";
    }
    if (!phonenumber.trim()) {
      isValid = false;
      newErrors.phonenumber = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(phonenumber)) {
      isValid = false;
      newErrors.phonenumber = "Please enter a valid phone number.";
    }
    if (!password.trim()) {
      isValid = false;
      newErrors.password = "Password is required.";
    }
    if (!confirmPassword.trim()) {
      isValid = false;
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (confirmPassword !== password) {
      isValid = false;
      newErrors.confirmPassword = "Passwords do not match.";
    }
     if (!role) {
      isValid = false;
      newErrors.role = "Role selection is required.";
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        const response = await axios.post("https://machanite-be.onrender.com/register", {
          name,
          phonenumber,
          email,
          password,
          role,
        });

        setSuccessMessage(response.data.message || "Registration successful!");
        setErrorMessage("");
        setTimeout(() => {
          router.push("/Login"); // Redirect to Login page
        }, 2000);
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        setErrorMessage(error.response?.data?.message || "User already exists.");
        setSuccessMessage("");
      }
    }
  };

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='border w-[700px] p-8 bg-white rounded-lg shadow-2xl  justify-center items-center flex-col'>
        {/* Title */}
        <div className='w-52 mx-auto border-black'>
          <h1 className='text-3xl font-bold text-[#7d40ff]'>Sign Up Page</h1>
        </div>

        {/* Form */}
        <form>
          <div className='flex place-content-around mt-10'>
            <div className='flex flex-col'>
              {/* Name */}
              <label htmlFor="name" className='mx-auto text-gray-700 font-semibold'>Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder='Enter Name' 
                name="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72'
                required
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className='flex flex-col'>
              {/* Email */}
              <label htmlFor="email" className='mx-auto text-gray-700 font-semibold'>Email</label>
              <input 
                type='email'
                id="email" 
                placeholder='Enter Email' 
                name="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72'
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className='flex place-content-around mt-8'>
            
            {/* Phone Number */}
            <div className='flex flex-col'>
              
              <label htmlFor="phonenumber" className='mx-auto text-gray-700 font-semibold'>Phone Number</label>
              <input 
                type='tel'
                id="phonenumber" 
                placeholder='Enter Phone Number' 
                name="phonenumber" 
                value={phonenumber} 
                onChange={(e) => setPhonenumber(e.target.value)} 
                className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72'
                required
              />
              {errors.phonenumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phonenumber}</p>
              )}
            </div>

            <div className='flex flex-col '>
            <label className='text-gray-700 font-semibold'>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-72'
            >
              <option value="" disabled>-- Select Role --</option>
              <option value="admin">Admin</option>
              <option value="operator">Operator</option>
              <option value="supervisor">Supervisor</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>
          </div>

          <div className='flex place-content-around mt-8'>
           
            {/* Password */}
            <div className='flex flex-col'>
              
              <label htmlFor="password" className='mx-auto text-gray-700 font-semibold'>Password</label>
              <div className="relative w-72">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  id="password" 
                  placeholder='Enter Password' 
                  name="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-full'
                  required
                />
                <span 
                  className="absolute right-4 top-3 text-xl cursor-pointer" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
              {/* Confirm Password */}           
            <div className='flex flex-col'>
              <label htmlFor="confirmPassword" className='mx-auto text-gray-700 font-semibold'>Confirm Password</label>
              <div className="relative w-72">
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  id="confirmPassword" 
                  placeholder='Enter Confirm Password' 
                  name="confirmPassword" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  className='bg-gray-200 rounded-full mt-1 py-2 px-4 w-full'
                  required
                />
                <span 
                  className="absolute right-4 top-3 text-xl cursor-pointer" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Signup Button */}
          <div className='flex justify-center flex-col mt-10'>
            <div className='m-auto mb-2 px-6 py-2 flex justify-center bg-[#7d40ff] text-white rounded-md'>
              <button onClick={submit} className='flex justify-center'>Sign Up</button>
            </div>
          </div>

          <div className='justify-center flex mt-1'>
            <p>
              Already have an account? 
              <Link href="/Login" className='text-[#6923ff]'> Login</Link>
            </p>
          </div>

          {successMessage && (
            <p className="text-green-500 text-lg flex justify-center ">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-lg flex justify-center">{errorMessage}</p>
          )}
        </form>
      </div>

      {/* <Link href="/home">  39570034270 SBIN0005343
        <p className="mt-4 text-center">Go to home</p>
      </Link> */}
    </div>
  );
};

export default Signup;
