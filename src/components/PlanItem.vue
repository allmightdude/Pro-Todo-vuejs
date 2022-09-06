<template>
  <base-card type="col" @click="showPlanPopup(planItem._id)">
    <div class="plans__icon">
      <svg v-if="planItem.category" :class="planItem.category.icon + '-icon'">
        <use
          :xlink:href="
            require('@/assets/sprite.svg') + `#icon-${planItem.category.icon}`
          "
        ></use>
      </svg>
    </div>
    <h3 class="heading-3">
      {{ planItem.title }}
    </h3>
    <span class="plans__date">
      <!-- August, 9 Sun -->
      {{ getDate(planItem.date) }}
    </span>
  </base-card>
</template>

<script>
const { moment } = require("../services/getToday");

export default {
  props: ["planItem"],
  inject: ["showPlanPopup"],

  methods: {
    getDate(date) {
      return moment(date);
    },
  },
};
</script>
