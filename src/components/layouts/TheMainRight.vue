<template>
  <div class="col-9">
    <div class="main__right">
      <h3 class="heading-3 text-blue">Weekly Plans</h3>

      <input
        type="date"
        v-model="dateValue"
        @change.prevent="getPlansByDate"
        class="mt-2"
      />

      <div class="plans">
        <transition-group name="plan-list" v-if="hasPlans">
          <plan-item
            v-for="plan in plans"
            :key="plan._id"
            :planItem="plan"
          ></plan-item>
        </transition-group>

        <base-card @click="showPopup('new-plan')" type="col">
          <base-spinner v-if="!hasPlans && isLoading"></base-spinner>
          
          <svg class="plus-icon" v-else>
            <use xlink:href="@/assets/sprite.svg#icon-plus"></use>
          </svg>
        </base-card>
      </div>
    </div>
  </div>
</template>

<script>
const {
  GetToday,
  getfirstLast,
  getDatesBetween,
} = require("../../services/getToday");
import PlanItem from "../PlanItem.vue";

export default {
  inject: ["showPopup"],
  
  data() {
    return {
      dateValue: GetToday(),
      isLoading: false,
    };
  },
  components: {
    PlanItem,
  },
  methods: {
    async getPlansByDate() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("todo/getPlansByDate", this.dateValue);
      } catch (error) {
         (error);
      }
      this.isLoading = false;
    },
    async getWeekPlans() {
      this.isLoading = true;
      let dates = getDatesBetween(
        getfirstLast().firstDayWeek,
        getfirstLast().lastDayWeek
      );

      try {
        await this.$store.dispatch("todo/getPlans", dates);
      } catch (error) {
         (error);
      }
      this.isLoading = false;
    },
  },
  computed: {
    plans() {
      return this.$store.getters["todo/getPlans"];
    },
    hasPlans() {
      return this.$store.getters["todo/hasPlans"];
    },
  },
  created() {
    this.getWeekPlans();
  },
};
</script>

<style lang="scss">
.plans {
  ul {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(max-content, 13rem));
  }
}
.plans {
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
