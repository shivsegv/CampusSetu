export const getUserProfile = () => {
  const data = localStorage.getItem("userProfile");
  return data
    ? JSON.parse(data)
    : {
        name: "John Doe",
        email: "john@example.com",
        phone: "",
        skills: ["React", "Node.js"],
        resume: "",
      };
};

export const updateUserProfile = (profile) => {
  localStorage.setItem("userProfile", JSON.stringify(profile));
};
