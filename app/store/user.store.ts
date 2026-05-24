import {create} from "zustand"
export interface userStoireInterface{
    userID: string | undefined;
    userName: string | undefined;
    userEmail:string | undefined;

    setUserName : (name:string | undefined) => void
    setUserEmail : (name:string | undefined) => void
    setUserId : (name:string | undefined) => void
}
export const useUser= create<userStoireInterface>( (set) => ( {
    userID:"",
    userName:"",
    userEmail:"",
    setUserName:(name) => set( state => ({
        ...state,
        userName:name
    }) ) ,
    setUserEmail : (email) => set (state => ({
        ...state,
        userEmail:email
    })),
    setUserId:(id)  => set( state =>({
        ...state,
        userID:id
    }) ),
    
}))
