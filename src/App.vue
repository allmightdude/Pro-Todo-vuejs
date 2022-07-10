<template>
  <router-view></router-view>
</template>

<script>

import EventBus from './common/EventBus'
export default {
  mounted() {
    EventBus.on("logout" , ()=>{
      this.logout()
    })
  },
}
</script>

<style lang="scss">

.check-o-icon,
.check-icon{
    width: 1.5rem;
    height: 1.5rem;
}
</style>
