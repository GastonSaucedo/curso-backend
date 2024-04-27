import userModel from "./users.model.js";
const findUser = async (email) => {
  const user = await userModel.findOne({ userEmail: email });
  return user;
};
const createUser = async (user) => {
  const newUser = userModel.create(user);
  return newUser;
};
const findUserByID = async (id) => {
  const foundUser = userModel.findById(id);
  return foundUser;
};
export { findUser, createUser, findUserByID };