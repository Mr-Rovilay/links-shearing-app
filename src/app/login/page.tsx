'use client';
import { HiOutlineMail } from "react-icons/hi";
import { MdLock } from "react-icons/md";
import { BsLink } from "react-icons/bs";
import Link from "next/link";
import { useState } from 'react';
import styles from './styles/login.module.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseConfig";
import AnimationWrapper from "@/components/common/AnimationWrapper";
import { setPersistence, browserLocalPersistence } from "firebase/auth";


const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    
    if (!email) {
      setEmailError("Can't be empty");
      return;
    }
  
    if (!password) {
      setPasswordError("Please check again");
      return;
    }
    try {
      // Ensure to set persistence here
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("user", JSON.stringify(true));
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (error: any) {
      console.error("Error during sign-in:", error);
      setError(error.message || "Invalid email or password");
    }
  };

  return (
    <>
      <AnimationWrapper keyValue="uniqueKey1">
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="flex items-center text-3xl mb-14">
        <div className="bg-[#633CFF] rounded-md text-white p-2">
          <BsLink />
        </div>
        <h1 className="ml-2 font-bold text-3xl">devlinks</h1>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <p className="mb-8 text-gray-400 font-light">
          Add your details below to get back into the app
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className={`block text-xs font-bold mb-2 ${emailError ? styles.errorLabel : 'text-gray-400'}`} htmlFor="email">
              Email address
            </label>
            <div className="relative">
              <HiOutlineMail className="absolute inset-y-0 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                placeholder="eg. abc@example.com"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full bg-white py-3 pl-12 pr-3 rounded-lg text-gray-700 text-base leading-tight ${styles.inputField} ${emailError ? styles.errorField : ''}`}
           
              />
              {emailError && <span className={`${styles.errorText} absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-xs`}>{emailError}</span>}
            </div>
          </div>
          <div className="mb-6 relative">
            <label className={`block text-xs font-bold mb-2 ${passwordError ? styles.errorLabel : 'text-gray-400'}`} htmlFor="password">
              Password
            </label>
            <div className="relative">
              <MdLock className="absolute inset-y-0 left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                placeholder="Enter your password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full py-3 pl-12 pr-3 rounded-lg text-gray-700 text-base leading-tight ${styles.inputField} ${passwordError ? styles.errorField : ''}`}
            
              />
              {passwordError && <span className={`${styles.errorText} absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-xs`}>{passwordError}</span>}
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              className="bg-[#633CFF] hover:bg-[#BEADFF] hover:shadow-[#beadff] hover:shadow-lg text-white font-medium py-3 px-4 rounded-md focus:outline-none focus:shadow-outline w-full"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="my-4 text-gray-500 flex gap-1 items-center justify-center">
          Don't have an account?{" "}
          <Link href="/signup">
            <span className="text-blue-500 hover:text-blue-700">Create account</span>
          </Link>
        </p>
      </div>
    </div>
    </AnimationWrapper>
    </>
  );
};

export default login;
