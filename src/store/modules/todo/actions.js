import UserService from "@/services/user.service";

export default {
  async getTasksbyDate({ commit }, date) {
    try {
      const res = await UserService.getTasksbyDate(date);

      console.log(res);
      
      
      if (res.data.tasks) {
        commit("storeTasks", res.data.tasks);
      }
    } catch (error) {
       (error);
    }
  },

  async getPlansByDate({ commit }, date) {
    await UserService.getPlansByDate(date)
      .then((plans) => {
        commit("setPLans", plans);
      })
      .catch((err) => {
         (err);
      });
  },

  async getCategories(context) {
    await UserService.getCategories().then(
      (res) => {
        if (res) {
          context.commit("setCategories", res.data.cats);
        }
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          // EventBus.dispatch("logout");
        }
      }
    );
  },

  async getPlans({ commit }, dates) {
    await UserService.getWeekPlans(dates).then((res) => {
      if (res) {
        commit("setPlans", res.data.plans);
      }
    });
  },

  async checkTask({ commit }, id) {
    await UserService.checkTask(id)
      .then(() => {
        commit("checkTask", id);
      })
      .catch((err) =>  (err));
  },

  async getSinglePlan({ state }, id) {
    return await state.plans.find((item) => item._id === id);
  },

  async addPlan(context, payload) {
    try {
      let res = await UserService.createPlan(payload);

      if (res.data.success) {
        const catID = res.data.newPlan.categoryID;
        context.commit("amountCategory", { id: catID, mode: "inc" });
      }
    } catch (error) {
       (error);
    }
  },

  async deletePlan(context, payload) {
    let res = await UserService.deletePlan(payload.id);
    if (res.data.success) {
      const catID = res.data.deletedPlan.categoryID;
      context.commit("amountCategory", { id: catID, mode: "dec" });
    }
  },

  async addCategory(context, payload) {
    try {
      let res = await UserService.createCategory({
        category: payload.category,
      });
      if (res.data.success) {
        context.commit("addCategory", payload.category);
      }
    } catch (error) {
       (error);
    }
  },

  async addTask(context, payload) {
    try {
      let res = await UserService.createTask(payload.task);
      if (res.data.success) context.commit("addTask", res.data.newTask);
    } catch (error) {
       (error);
    }
  },

  async deleteTask(context, payload) {
    const res = await UserService.deleteTask(payload.id);
     (res);
    context.commit("removeTask", payload.id);
  },
};
