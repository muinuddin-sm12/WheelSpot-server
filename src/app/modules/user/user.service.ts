import { TUser } from './user.interface';
import { User } from './user.model';


const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};
const getAUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};
const updateAUserIntoDB = async (id: string, user: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, user);
  return result;
};
// const deleteACarIntoDB = async (id: string) => {
//   const result = await CarModel.findByIdAndDelete(id);
//   return result;
// };

export const UserServices = {
    getAllUsersFromDB,
    getAUserFromDB,
    updateAUserIntoDB,
};
