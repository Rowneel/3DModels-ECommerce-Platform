import axios from 'axios';

class UserAPI {
    async getUserDetails(){
        try{
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            
            const confit = {
              headers: {
                Authorization: `Bearer ${token}`,
                },
            };

            const {data} = await axios.get(`http://127.0.0.1:8000/api/users/profile`,config);
            return data;
        }
        catch(error){
            throw error.response && error.response.data.detail?
            error.response.data.detail : error.message;
        }
    }


    async createUser(name, email, password){
        try{
            const config = {
                header: {
                    'Content-Type': 'application/json',
                }
            };
            const {data} = await axios.post('http://127.0.0.1:8000/api/users/register/',{name, email, password}, config);
            return data;
        }
        catch(error){
            throw error.response && error.response.data.detail
            ? error.response.data.detail 
            : error.message;
        }
    }

    async updateUser(userId,updateData){
        try{
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            
            const confit = {
              headers: {
                Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.put(`http://127.0.0.1:8000/api/users/profile/update/`,updateData,confit);
            return data;
        }
        catch(error){
            throw error.response && error.response.data.detail?
            error.response.data.detail : error.message;
        }
    }

    async deleteUser(userId){
        try{
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            
            const confit = {
              headers: {
                Authorization: `Bearer ${token}`,
                },
            };
            const {data} = await axios.delete(`http://127.0.0.1:8000/api/users/delete/${userId}/`,confit);
        }
        catch(error){
            throw error.response && error.response.data.detail?
            error.response.data.detail : error.message;
        }
    }


    async login(email, password){
        try{
            const {data} = await axios.post('http://127.0.0.1:8000/api/users/login/',{username:email,password: password});
            return data;
        }
        catch(error){
            throw error.response && error.response.data.detail?
            error.response.data.detail : error.message;
        }
    }
}

const userAPI = new UserAPI();
export default userAPI;