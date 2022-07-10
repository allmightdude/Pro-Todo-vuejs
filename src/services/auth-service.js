import api from './api';
import TokenService from './token.service';
// const API_URL = `http://localhost:3000/users/`;

class AuthService {
    async login(user){
        return await api
            .post('users/login' , {
                email : user.email,
                password : user.password,
            })
            .then(res => {
                if(res.data.accessToken){
                    // localStorage.setItem('user' , JSON.stringify(res.data))
                    TokenService.setUser(res.data)
                }
                return res.data
            })
    }

    logout(){
        // localStorage.removeItem('user');
        TokenService.removeUser();
    }

    async register(user){
        return await api.post('users/signup' , {
            name : user.name , 
            email : user.email , 
            password : user.password , 
            password2 : user.password2 , 
        })
        .then(res => {
            if(res.data.accessToken){
                TokenService.setUser(res.data)
            }
            return res.data
        })
    }
}

export default new AuthService()

