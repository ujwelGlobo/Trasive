import { baseApi } from "@/core/api/baseApi.js";
import { setToken,clearToken } from "@/core/auth/tokenService.js";

export const authService ={

    login:async(credentials)=>{
        const data =await baseApi.post("/login",credentials);

        if(data.token){
            setToken(data.token);
        }
        return data;
},

register:async(userData)=>{
    const data=await baseApi.post("/signup",userData);
    return data;
},

logout:() => {
    clearToken();
    window.location.href="/login"
},

};