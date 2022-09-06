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

  setCategories(state, cats) {
    state.categories = cats;
  },

  addCategory(state, category) {
    state.categories = [...state.categories, {...category , items : 0}];
  },

  amountCategory(state, payload) {
    const catItem = state.categories.find((cat) => cat._id === payload.id);
    if (payload.mode === "inc") {
      catItem.items++;
    } else {
      if (catItem.items === 0) {
        return;
      }
      catItem.items--;
    }
  },

  setPlans(state, plans) {
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
