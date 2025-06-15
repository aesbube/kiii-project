import {Role} from "./roles.model";

export interface User {
  id: Number,
  username: String,
  email: String,
  role: Role
}
