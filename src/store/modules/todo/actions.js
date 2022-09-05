import UserService from "@/services/user.service";

export default {
  async getTasksbyDate({ commit }, date) {
    await UserService.getTasksbyDate(date)
      .then((res) => {
        if (res) {
          commit("storeTasks", res.data.tasks);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },

  async getPlansByDate({ commit }, date) {
    await UserService.getPlansByDate(date)
      .then((plans) => {
        commit("addPlans", plans);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  async getCategories(context) {
    await UserService.getCategories().then(
      (res) => {
        if (res) {
          context.commit("addCategories", res.data.cats);
        }
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          // EventBus.dispatch("logout");
        }
      }
    );
  },

  async addPlans({ commit }, dates) {
    await UserService.getWeekPlans(dates).then((res) => {
      if (res) {
        commit("addPlans", res.data.plans);
      }
    });
  },

  async checkTask({ commit }, id) {
    await UserService.checkTask(id)
      .then(() => {
        commit("checkTask", id);
      })
      .catch((err) => console.log(err));
  },

  async getSinglePlan({ state }, id) {
    return await state.plans.find((item) => item._id === id);
  },
};
