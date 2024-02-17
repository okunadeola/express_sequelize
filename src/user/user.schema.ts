import { z } from "zod";



export const register = z.object({
  body: z.object({
    username: z.string({
      required_error: "Username is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
        required_error: "Password is required",
    }),
    isMale: z.boolean({
        required_error: "Gender is required"
    }),
  }),
});



export const login = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
        required_error: "Password is required",
    }),
   
  }),
});



export const filterUserQuery = z.object({
  limit: z.number().default(10),
  page: z.number().default(1),
});



export type RegisterInput = z.TypeOf<typeof register>["body"];
export type LoginInput = z.TypeOf<typeof login>["body"];
export type FilterUserQueryInput = z.TypeOf<typeof filterUserQuery>;





















