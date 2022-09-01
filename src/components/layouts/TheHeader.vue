<template>
        <header class="header">
        <div class="container">
            <div class="header__top">
                <div class="header__title">My Duties</div>

                <div class="logout" @click="logout">
                    <svg class="switch-icon">
                        <use xlink:href="@/assets/sprite.svg#icon-switch"></use>
                    </svg>
                </div>

            </div>

            <h1 class="heading-1">Hello, {{user.name}}</h1>

        
            <div class="col-12">
                <Categories @showPopup="showPopup('new-cat')"/>
            </div>        

        </div>
    </header>

</template>

<script>
import Categories from '../Categories.vue'

export default {
    name : "HeaderSite",
    components:{
        Categories
    },
    methods: {
        logout(){
            this.$store.dispatch('logout');
            this.$router.push('/login')
        },
        showPopup(popupBox){
            this.$emit('showPopup' , popupBox);
        }
    },
    computed: {
        user(){
            return this.$store.state.auth.user
        },
        categories(){
            return this.$store.getters['todo/getCategories']
        },

    }
}
</script>

<style lang="scss">

.switch-icon{
    fill:#fff;
}
</style>