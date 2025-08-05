import { Category, TCategoryPayload } from ".";
import { Document } from "mongoose";
import { TCategory } from "./category.interface";

class CategoryService {
  static async findAll() {
    const categories = await Category.find<Document<TCategoryPayload>>();

    const data: TCategoryPayload[] = categories.map((category) => {
      return category.toObject();
    });

    return data;
  }

  static async findOne(query: TCategory) {
    const category = await Category.findOne<Document<TCategoryPayload>>(query);

    return category?.toObject();
  }

  static async create(data: TCategory) {
    const category = await Category.create(data);
    return category.toObject();
  }

  static async update(id: string, data: TCategory) {
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    return category?.toObject();
  }

  static async delete(id: string) {
    const category = await Category.findByIdAndDelete(id);
    return category?.toObject();
  }
}

export default CategoryService;
