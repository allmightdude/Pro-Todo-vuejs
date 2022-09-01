const { GetToday } = require("@/services/getToday");
const today = GetToday();

export default {
  storeTasks(state, tasks) {
    state.tasks = tasks;
  },

  addTask(state, task) {
    if (task.date == today) {
      state.tasks = [...state.tasks, task];
    }
  },

  removeTask(state, id) {
    state.tasks = state.tasks.filter((task) => task._id !== id);
  },

  removePlan(state, id) {
    state.plans = state.tasks.filter((plan) => plan._id !== id);
  },

  addCategories(state, cats) {
    state.categories = cats;
  },

  addCategory(state, category) {
    state.categories = [...state.categories, category];
  },

  addPlans(state, plans) {
    state.plans = plans;
  },

  addPlan(state, plan) {
    state.plans = [...state.plans, plan];
  },

  checkTask(state, id) {
    let taskItem = state.tasks.find((task) => task._id === id);
    taskItem.checked = !taskItem.checked;
  },
};
