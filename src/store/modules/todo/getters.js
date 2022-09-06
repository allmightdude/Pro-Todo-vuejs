export default {
  getTasks(state) {
    return state.tasks;
  },
  getCategories(state) {
    return state.categories;
  },
  getPlans(state) {
    return state.plans;
  },
  hasTasks(state) {
    return state.tasks && state.tasks.length > 0;
  },
  hasPlans(state) {
    return state.plans && state.plans.length > 0;
  },
  hasCategories(state) {
    return state.categories && state.categories.length > 0;
  },
};
