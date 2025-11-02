import React, { useState, useEffect } from "react";
import FileUploader from "./FileUploader";
import TagInput from "./TagInput";
import { getUserProfile, updateUserProfile } from "../api/mockUser";

const ProfileForm = () => {
  const [profile, setProfile] = useState(getUserProfile());

  useEffect(() => {
    setProfile(getUserProfile());
  }, []);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    updateUserProfile(profile);
    alert("Profile saved locally");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <div className="mb-3">
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          value={profile.name}
          onChange={(e) => handleChange("name", e.target.value)}
          className="border w-full p-2"
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          value={profile.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="border w-full p-2"
        />
      </div>
      <div className="mb-3">
        <label className="block font-medium mb-1">Phone</label>
        <input
          type="text"
          value={profile.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="border w-full p-2"
        />
      </div>
      <div className="mb-3">
        <TagInput
          tags={profile.skills}
          setTags={(skills) => handleChange("skills", skills)}
        />
      </div>
      <div className="mb-3">
        <FileUploader
          label="Upload Resume (PDF)"
          onChange={(data) => handleChange("resume", data)}
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
      >
        Save
      </button>
    </div>
  );
};

export default ProfileForm;
