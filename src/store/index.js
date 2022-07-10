import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from './auth.module'
import UserService from '../services/user.service'
import EventBus from '../common/EventBus'

const {GetToday} = require('../services/getToday');
const today = GetToday();

Vue.use(Vuex)

export default new Vuex.Store({
  state : {
    tasks : [],
    categories : [],
    plans:[]
  },
  getters:{
    getTasks(state){
      return state.tasks
    },
    getCategories(state){
      return state.categories
    },
    getPlans(state){
      return state.plans
    }
  },

  mutations:{
    storeTasks(state , tasks){
      state.tasks = tasks;
    },
    addTask(state , task){
      if(task.date == today) {
        state.tasks = [...state.tasks , task]
      }

    },
    removeTask(state , id){
      state.tasks = state.tasks.filter(task => task._id !== id)
    },
    addCategories(state , cats){
      state.categories = cats;
    },
    addCategory(state , category){
      state.categories = [...state.categories , category];
    },
    addPlans(state , plans){
      state.plans = plans;
    },
    addPlan(state , plan){
      state.plans = [...state.plans , plan];
    },

    checkTask(state , id){
      let taskItem = state.tasks.find(task => task._id === id);
      taskItem.checked = !taskItem.checked;
    },

  },
  actions:{
    getTasksbyDate({commit} , date){
      UserService.getTasksbyDate(date)
      .then(res => {
          commit('storeTasks' , res.data.tasks);
      })
      .catch(error => {
          console.log(error);
      })
    },

    getPlansByDate({commit} , date){
      UserService.getPlansByDate(date)
        .then(plans => {
          commit('addPlans' , plans);
        })
        .catch(err => {
          console.log(err);
        })
    },

    getCategories({commit}){
      UserService.getCategories()
        .then(
          res => {
           commit('addCategories' , res.data.cats)
          },
          error => {
            if(error.response && error.response.status === 401){
              EventBus.dispatch('logout')
            }
          }
        )
    },

    addPlans({commit} , dates){
      UserService.getWeekPlans(dates)
        .then(res => {
          commit('addPlans' , res.data.plans);
        })
    },

    checkTask({commit} , id){
      UserService.checkTask( id)
        .then(() => {
          commit ('checkTask' , id);
        })
        .catch(err => console.log(err))
    },

    async getSinglePlan({state} , id){
      return await state.plans.find(item => item._id === id)
    }

  },

  modules: {
    auth
  }
})
