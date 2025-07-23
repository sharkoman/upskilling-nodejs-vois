export type ItemWithID<T> = T & { _id: string };

export interface IPaginatedResponse<T> {
  data: ItemWithID<T>[];
  total: number;
  page: number;
  limit: number;
}
