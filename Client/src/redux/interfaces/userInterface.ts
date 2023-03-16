import { User } from "../../types"

export interface usersReducerState{
  listUsersData: User[],
  idDetails: object,
  successMsg: string,
  errorMsg: string
}