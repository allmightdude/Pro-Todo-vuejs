<template>
  <div class="createTask__form">
    <form action="" class="form" @submit.prevent="submitPlan">
      <div class="form__header">New Plan</div>

      <div class="form__content">
        <div class="form__group">
          <label for="title" class="form__label">Title</label>
          <input type="text" class="form__input" v-model="title" />
        </div>

        <div class="form__group">
          <label for="title" class="form__label">Date</label>
          <input type="date" @change="getTasks" v-model="dateValue" />
        </div>

        <div class="form__group">
          <div class="form__tasks">
            <div
              v-for="task in tasks"
              :key="task._id"
              class="form__tasks-item"
              @click.prevent="addTaskToPlan($event, task._id)"
            >
              {{ task.title }}
            </div>
          </div>

          <!-- <span class="error">no have any task in this date</span> -->
        </div>

        <div class="form__group">
          <label for="title" class="form__label">Category</label>
          <select name="category" id="category" v-model="selectedCategory">
            <option v-for="cat in cats" :key="cat._id" :value="cat">
              {{ cat.title }}
            </option>
          </select>
        </div>

        <div class="form__group">
          <button type="submit" href="" class="form__submit">Create</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  inject: ["hidePopup"],

  data() {
    return {
      title: "",
      dateValue: null,
      tasks: [],
      selectedTasks: [],
      selectedCategory: null,
    };
  },
  methods: {
    getTasks() {
      UserService.getTasksbyDate(this.dateValue)
        .then((res) => {
          this.tasks = res.data.tasks;
        })
        .catch((err) => {
           (err);
        });
    },
    addTaskToPlan(event, taskId) {
      let target = event.target;
      if (target.classList.contains("active")) {
        this.selectedTasks = this.selectedTasks.filter((id) => id !== taskId);
        target.classList.remove("active");
      } else {
        this.selectedTasks.push(taskId);
        target.classList.add("active");
      }
    },
    async submitPlan() {
      let plan = {
        title: this.title,
        date: this.dateValue,
        tasks: this.selectedTasks,
        category: {
          title: this.selectedCategory.title,
          icon: this.selectedCategory.icon,
        },
        categoryID: this.selectedCategory._id,
      };

      try {
        await this.$store.dispatch("todo/addPlan", plan);
      } catch (error) {
         (error);
      }
      this.hidePopup();
    },
  },

  computed: {
    cats() {
      return this.$store.getters["todo/getCategories"];
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  &__header {
  }
  &__submit {
  }

  .error {
    color: #ee5253;
    font-size: 1.2rem;
  }

  &__tasks {
    padding: 1rem 0;
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    flex-flow: row nowrap;
    scrollbar-width: thin;
    scrollbar-color: #d4aa70;
    transition: scrollbar-color 0.3s ease-out;
    scrollbar-color: #ee5253 #e4e4e4;
    transition: scrollbar-color 0.3s ease-out;

    &-item {
      padding: 0.2rem 0.5rem;
      color: #8395a7;
      // background-color: #fdcb6e;
      border: 1px solid #ff9f43;
      font-size: 1.3rem;
      border-radius: 10px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;

      white-space: nowrap;

      &.active {
        background-color: #fdcb6e;
      }
    }

    .check-circle-icon {
      width: 1.2rem;
      height: 1.2rem;
      fill: #00b894;
      pointer-events: none;
    }
  }
}

select {
  width: 100%;
  border-radius: 10px;
  padding: 1rem 2rem;
  border: none;
  background: #f5f5f5;
}
</style>
