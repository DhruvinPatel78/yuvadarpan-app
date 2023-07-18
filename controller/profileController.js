const createProfile = async (req, res) => {
  res.send("create profile");
};
const deleteProfile = async (req, res) => {
  res.send("delete profile");
};
const getAllProfile = async (req, res) => {
  res.send("get all profile");
};
const updateProfile = async (req, res) => {
  res.send("update profile");
};
const showStats = async (req, res) => {
  res.send("show stats");
};

export {
  createProfile,
  deleteProfile,
  getAllProfile,
  updateProfile,
  showStats,
};
