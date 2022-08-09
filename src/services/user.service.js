import api from './api';

class UserService {

    // async getTasks(){
    //     try {
    //         let res = await api.get('tasks');
    //         console.log(res.tasks);
    //         return res
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    
    async getTasksbyDate(date){
        try {
            let res = await api.get(`tasks/${date}`);
            return res
        } catch (error) {
            console.log(error);
        }
    }

    async getPlansByDate(date){
        let res = await api.get(`plans/${date}`)
        return res.data.plans;
    }

    async createTask(data){
        let res = await api.post(`tasks/create` , data);
        return res
    }

    async deleteTask(id){
        let res = await api.delete(`tasks/delete/${id}`);
        return res
    }

    async createCategory(category){
        return await api.post(`plans/category/create` , category)
    }

    async getCategories(){
        return await api.get(`plans/category`)
    }

    async createPlan(plan){
        return await api.post(`plans/create` , plan)
    }

    async getWeekPlans(dates){
        let res =  await api.post(`plans` , dates);
        return res
    }

    async getPlanById(id){
        let res = await api.get(`plans/getSinglePlan/${id}`)
        return res
    }
    
    async checkTask(id){
        await api.put(`tasks/${id}`)
    }

    async deletePlan(id){
        let res = await api.delete(`plans/delete/${id}`);
        return res;
    }

}

export default new UserService();