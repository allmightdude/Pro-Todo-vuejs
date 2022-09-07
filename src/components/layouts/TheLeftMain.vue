<template>
  <div class="col-3">
    <div class="tasks">
      <h3 class="heading-3 text-blue">Daily Tasks</h3>

      <div class="tasks__option mt-1">
        <input type="date" @change="getTasks" v-model="dateValue" />
      </div>

      <button class="tasks__add" @click="showPopup('new-task')">
        Add Task
      </button>

      <base-card class="mt-1" v-if="!hasTasks && isLoading">
        <base-spinner></base-spinner>
      </base-card>
      
      <base-card class="mt-1" v-else-if="!hasTasks">
        <p>there aren't any task...</p>
      </base-card>

      <task-item
        v-for="task in tasks"
        :key="task._id"
        :taskItem="task"
        v-else
      ></task-item>
    </div>
  </div>
</template>

<script>
import TaskItem from "../TaskItem.vue";

const { GetToday } = require("../../services/getToday");

export default {
  inject: ["showPopup"],
  data() {
    return {
      dateValue: GetToday(),
      isLoading: false,
    };
  },
  components: {
    TaskItem,
  },
  computed: {
    tasks() {
      return this.$store.getters["todo/getTasks"];
    },
    hasTasks() {
      return this.$store.getters["todo/hasTasks"];
    },
  },
  methods: {
    // log => 2023-12-10
    async getTasks() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("todo/getTasksbyDate", this.dateValue);
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false
    },
  },
  created() {
    this.getTasks();
  }
};
</script>

<style lang="scss">
.tasks {
  &__add {
    background: #00cbe5;
    padding: 1.5rem;
    border-radius: 14px;
    width: 100%;
    color: white;
    margin-top: 1.54rem;
    box-shadow: 0 0.5rem 3.5rem rgba(0, 0, 0, 0.1);
    // transition: 0.3s ease all;
  }

  &__additional {
    width: 3rem;
    height: 3rem;
    padding-left: 1rem;
    display: flex;
    align-items: center;
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
}

.forgot,
.register-now {
  color: #00b894;
  font-size: 1.2rem;
  cursor: pointer;
}

.star-icon {
  width: 1rem;
  height: 1rem;
  fill: #f1c40f !important;
}

.trash-icon {
  fill: #e74c3c !important;
  cursor: pointer;
}
</style>
