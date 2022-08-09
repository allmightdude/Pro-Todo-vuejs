<template>
  <div>
    <div class="main">
      <div class="container">
        <div class="col-12">
          <TheLeftMain/>
          <TheMainRight/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheMainRight from "./TheMainRight.vue";
import TheLeftMain from "./TheLeftMain.vue";

export default {
  data() {
    return {
      popupName: null,
    };
  },
  components: {
    TheMainRight,
    TheLeftMain
  },
  methods: {

  },
};
</script>
