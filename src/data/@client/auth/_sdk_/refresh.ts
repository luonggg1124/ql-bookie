import { IUser } from "@/data/models/user"


export type RefreshResponse = {
   user: IUser;
   permissions: string[];
   
}
export type RefreshError = {
    [key:number]: {
        error:string;
    }
}