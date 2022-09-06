<template>
  <div class="col-9">
    <div class="main__right">
      <h3 class="heading-3 text-blue">Weekly Plans</h3>

      <input
        type="date"
        v-model="dateValue"
        @change.prevent="getPlans"
        class="mt-2"
      />

      <div class="plans">
        <transition-group tag="ul" name="plan-list">
          <plan-item
            v-for="plan in plans"
            :key="plan._id"
            :planItem="plan"
          ></plan-item>
        </transition-group>

        <div class="plans__item" @click="showPopup('new-plan')">
          <svg class="plus-icon">
            <use xlink:href="@/assets/sprite.svg#icon-plus"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { GetToday } = require("../../services/getToday");
import PlanItem from "../PlanItem.vue";

export default {
  inject: ["showPopup"],
  data() {
    return {
      dateValue: null,
    };
  },
  components: {
    PlanItem,
  },
  methods: {
    getPlans() {
      this.$store.dispatch("todo/getPlansByDate", this.dateValue);
    },
  },
  computed: {
    plans() {
      return this.$store.getters["todo/getPlans"];
    },
  },
  created() {
    this.dateValue = GetToday();
  },
};
</script>

<style lang="scss">

.plans{
  ul{
    display: flex;
    gap : 2rem
  }
}
.plans__item {
  .plus-icon {
    width: 3rem;
    height: 3rem;
    fill: #00cbe5;
  }
}

.plan-list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.plan-list-enter-active {
  transition: all 0.3s ease-in;
}

.plan-list-enter-to,
.plan-list-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.plan-list-leave-active {
  transition: all 0.3s ease-out;
}
.plan-list-leave-to {
    opacity: 0;
    transform: translateX(-10px);
}
</style>
