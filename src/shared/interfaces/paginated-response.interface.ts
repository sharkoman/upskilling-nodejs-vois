import { Types } from "mongoose";

export type ItemWithID<T> = T & { _id: Types.ObjectId | string };
export interface IPaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export type Payload<T> = T & {
  _id: Types.ObjectId | string;
  createdAt: Date;
  updatedAt: Date;
};