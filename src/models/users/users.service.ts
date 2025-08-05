import { TUserPayload, TUpdateUser, User, TUser } from ".";
import { Document } from "mongoose";

class UserService {
  static async findByIdAndUpdate(
    id: string,
    user: TUpdateUser
  ): Promise<TUserPayload> {
    const payload = await User.findByIdAndUpdate<Document<TUserPayload>>(
      id,
      user,
      { new: true }
    ).select("-password");
    return payload?.toObject();
  }

  static findOne(filter: Partial<TUserPayload>) {
    return User.findOne<Document<TUser>>(filter);
  }
  
  static createUser(user: TUser) {
    return User.create(user);
  }
}

export default UserService;
