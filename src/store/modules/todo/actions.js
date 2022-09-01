import UserService from "@/services/user.service";

export default {
  getTasksbyDate({ commit }, date) {
    UserService.getTasksbyDate(date)
      .then((res) => {
        commit("storeTasks", res.data.tasks);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getPlansByDate({ commit }, date) {
    UserService.getPlansByDate(date)
      .then((plans) => {
        commit("addPlans", plans);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getCategories({ commit }) {
    UserService.getCategories().then(
      (res) => {
        commit("addCategories", res.data.cats);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          // EventBus.dispatch("logout");
        }
      }
    );
  },

  addPlans({ commit }, dates) {
    UserService.getWeekPlans(dates).then((res) => {
      commit("addPlans", res.data.plans);
    });
  },

  checkTask({ commit }, id) {
    UserService.checkTask(id)
      .then(() => {
        commit("checkTask", id);
      })
      .catch((err) => console.log(err));
  },

  async getSinglePlan({ state }, id) {
    return await state.plans.find((item) => item._id === id);
  },
};
