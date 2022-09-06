<template>
  <div :class="['card', type]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 0.5rem 3.5rem rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  background-color: #fff;
  display: flex;
  align-items: center;
  transition: 0.5s all ease;
  overflow: hidden;
  padding: 1.5rem;
}

.row {
  flex-direction: row;
}
.col {
  flex-direction: column;
  justify-content: center;
}
</style>
