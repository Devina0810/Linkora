import { useState } from "react";
import { GlobeIcon } from "lucide-react";
import { Link } from "react-router";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { isPending, error, signupMutation } = useSignUp();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0e1116] to-[#1c1f27]">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl shadow-xl bg-white/5 border border-white/10 backdrop-blur-lg rounded-xl overflow-hidden transition-all duration-500">
        
        {/* LEFT SIDE: SIGNUP FORM */}
        <div className="w-full lg:w-1/2 p-8 text-white">
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2">
            <GlobeIcon className="w-7 h-7 text-blue-400 animate-spin" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Linkora
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 bg-red-800/80 text-red-100 p-3 rounded-md border border-red-600 text-sm">
              {error.response?.data?.message || "Sign up failed"}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <h2 className="text-2xl font-semibold">Create an Account</h2>
              <p className="text-sm text-neutral-400 mt-1">
                Join Linkora to start your learning languages with friends!
              </p>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Amy Smith"
                className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all"
                value={signupData.fullName}
                onChange={(e) =>
                  setSignupData({ ...signupData, fullName: e.target.value })
                }
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="hello@example.com"
                className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all"
                value={signupData.email}
                onChange={(e) =>
                  setSignupData({ ...signupData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all"
                value={signupData.password}
                onChange={(e) =>
                  setSignupData({ ...signupData, password: e.target.value })
                }
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start text-sm text-neutral-400 gap-2">
              <input type="checkbox" className="checkbox checkbox-sm mt-1" required />
              <span>
                I agree to the{" "}
                <span className="text-blue-400 hover:underline">terms of service</span> and{" "}
                <span className="text-blue-400 hover:underline">privacy policy</span>
              </span>
            </div>

            {/* Submit */}
            <button
              className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full shadow-md transition transform hover:-translate-y-0.5 hover:scale-[1.02] disabled:opacity-60 disabled:pointer-events-none"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Create Account"
              )}
            </button>

            <p className="text-center text-sm text-neutral-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400 hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* RIGHT SIDE: IMAGE / PROMO */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-neutral-900 to-neutral-800 items-center justify-center">
          <div className="max-w-md p-8 text-center">
            <img
              src="https://img.freepik.com/free-vector/video-call-concept-illustration_114360-4762.jpg"
              alt="Language connection"
              className="w-full h-auto rounded-2xl shadow-xl border-4 border-neutral-900 hover:scale-105 transition duration-300"
            />
            <h2 className="text-xl font-semibold text-white mt-6">
              Connect with language partners worldwide
            </h2>
            <p className="text-neutral-400 mt-2 text-sm">
              Practice conversations, make friends, and improve your language skills together.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
