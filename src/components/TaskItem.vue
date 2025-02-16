<template>
  <transition name="task-item" >
    <base-card class="tasks__item mt-1">
      <svg
        v-if="!taskItem.checked"
        class="circle-icon"
        @click="checkTask(taskItem._id)"
      >
        <use xlink:href="@/assets/sprite.svg#icon-circle"></use>
      </svg>

      <svg v-else class="circle-check-icon" @click="checkTask(taskItem._id)">
        <use xlink:href="@/assets/sprite.svg#icon-check-circle"></use>
      </svg>

      <div class="tasks__name">
        {{ taskItem.title }}
        <svg class="star-icon" v-if="taskItem.important">
          <use xlink:href="@/assets/sprite.svg#icon-star"></use>
        </svg>
      </div>

      <div class="tasks__time">
        {{ taskItem.time }}
      </div>

      <div class="tasks__additional">
        <svg class="trash-icon" @click="deleteTask(taskItem._id)">
          <use xlink:href="@/assets/sprite.svg#icon-trash"></use>
        </svg>
      </div>
    </base-card>
  </transition>
</template>

<script>

export default {
  props: ["taskItem"],

  methods: {
    checkTask(id) {
      this.$store.dispatch("todo/checkTask", id);
    },

    async deleteTask(id) {
      try {
        this.$store.dispatch('todo/deleteTask' , {id : id});
      } catch (error) {
         (error);
      }
    },
  },
};
</script>

<style lang="scss">
.task-item-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.task-item-enter-active {
  transition: all 0.3s ease-in;
}
.task-item-enter-to,
.task-item-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.task-item-leave-active {
  transition: all 0.3s ease-out;
}

.task-item-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
