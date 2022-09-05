<template>
  <div class="main">
    <div class="container">
      <div class="col-12">
        <MainLeft @showPopup="showPopup" />
        <MainRight @showPopup="showPopup" @showPlanPopup="showPlanPopup" />
      </div>
    </div>
  </div>
</template>

<script>
import MainRight from "../components/layouts/TheMainRight.vue";
import MainLeft from "../components/layouts/TheLeftMain.vue";

export default {
  components: {
    MainRight,
    MainLeft,
  },
};
</script>
