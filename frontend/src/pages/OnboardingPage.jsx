import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import {
  LoaderIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
  CameraIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Profile onboarded successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("Random profile picture generated!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e1116] to-[#1c1f27] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white/5 border border-white/10 backdrop-blur-xl rounded-xl shadow-xl p-6 sm:p-10 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Complete Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-32 h-32 rounded-full bg-neutral-800 border border-neutral-600 overflow-hidden shadow-lg">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <CameraIcon className="w-10 h-10 text-neutral-500" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleRandomAvatar}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full font-medium text-white shadow transition"
            >
              <ShuffleIcon className="w-4 h-4" />
              Generate Random Avatar
            </button>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formState.fullName}
              onChange={(e) =>
                setFormState({ ...formState, fullName: e.target.value })
              }
              className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 placeholder-neutral-500 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
              placeholder="Your full name"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Bio</label>
            <textarea
              name="bio"
              value={formState.bio}
              onChange={(e) =>
                setFormState({ ...formState, bio: e.target.value })
              }
              rows="4"
              className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 placeholder-neutral-500 text-white resize-none focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
              placeholder="Tell others about yourself and your language learning goals"
            ></textarea>
          </div>

          {/* Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Native Language */}
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Native Language</label>
              <select
                name="nativeLanguage"
                value={formState.nativeLanguage}
                onChange={(e) =>
                  setFormState({ ...formState, nativeLanguage: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
              >
                <option value="">Select your native language</option>
                {LANGUAGES.map((lang) => (
                  <option key={`native-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Learning Language */}
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Learning Language</label>
              <select
                name="learningLanguage"
                value={formState.learningLanguage}
                onChange={(e) =>
                  setFormState({ ...formState, learningLanguage: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
              >
                <option value="">Select language you're learning</option>
                {LANGUAGES.map((lang) => (
                  <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-neutral-300 mb-1">Location</label>
            <div className="relative">
              <MapPinIcon className="absolute top-2.5 left-3 w-5 h-5 text-neutral-500" />
              <input
                type="text"
                name="location"
                value={formState.location}
                onChange={(e) =>
                  setFormState({ ...formState, location: e.target.value })
                }
                className="w-full px-4 py-2 pl-10 rounded-md bg-neutral-800 border border-neutral-700 placeholder-neutral-500 text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition"
                placeholder="City, Country"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full shadow-md transition transform hover:-translate-y-0.5 hover:scale-[1.02] disabled:opacity-60 disabled:pointer-events-none"
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center justify-center gap-2">
                <LoaderIcon className="animate-spin w-5 h-5" />
                Onboarding...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <ShipWheelIcon className="w-5 h-5" />
                Complete Onboarding
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
