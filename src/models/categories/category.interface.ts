import { z } from "zod";
import { categoryValidatorSchema } from "./category.validator";
import { Payload } from "@/interfaces";

export type TCategory = z.infer<typeof categoryValidatorSchema>;
export type TCategoryPayload = Payload<TCategory>;