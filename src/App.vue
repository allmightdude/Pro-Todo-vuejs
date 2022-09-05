<template>
  <router-view></router-view>
</template>

<script>

export default {
  computed :{
    didAutoLogout(){
      return this.$store.getters['didAutoLogout'];
    }
  },
  watch : {
    didAutoLogout(newValue , oldValue){
      if(!newValue && newValue !== oldValue){
        this.$router.replace('/login');
      } 
    }
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
