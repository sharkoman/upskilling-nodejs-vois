import { TUserPayload, TUpdateUser, User, TUser, IUserDocument } from ".";
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

  static findOne(filter: Partial<TUserPayload>): Promise<IUserDocument | null> {
    return User.findOne(filter);
  }
  
  static createUser(user: TUser): Promise<IUserDocument> {
    return User.create(user);
  }
}

export default UserService;
