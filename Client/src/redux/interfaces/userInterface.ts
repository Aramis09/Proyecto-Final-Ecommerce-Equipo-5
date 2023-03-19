import { User } from "../../types"

export interface usersReducerState{
  listUsersData: User[],
  userDetails: object,
  successMsg: string,
  errorMsg: string
}