<template>
  <div class="plans">
    <div class="plans__item" v-for="category in categories" :key="category._id">
      <div class="plans__icon">
        <svg :class="category.icon + '-icon'">
          <use
            :xlink:href="
              require('@/assets/sprite.svg') + `#icon-${category.icon}`
            "
          ></use>
        </svg>
      </div>
      <h3 class="heading-3">
        {{ category.title }}
      </h3>
      <span class="plans__date"> {{ category.items }} items </span>
    </div>

    <div class="plans__item" @click="showPopup">
      <base-spinner v-if="!hasCategories && isLoading"></base-spinner>

      <svg class="plus-icon" v-else>
        <use xlink:href="@/assets/sprite.svg#icon-plus"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "categoriesCom",
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    categories() {
      return this.$store.getters["todo/getCategories"];
    },
    hasCategories() {
      return this.$store.getters["todo/hasCategories"];
    },
  },
  methods: {
    showPopup() {
      this.$emit("showPopup", "new-cat");
    },
    async getCategories() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("todo/getCategories");
      } catch (error) {
         (error);
      }
      this.isLoading = false;
    },
  },
  created() {
    this.getCategories();
  },
};
</script>
