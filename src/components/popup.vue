<template>
    <div class="popup">
        <div class="btn-close" @click="hidePopup">&#215;</div>
        <component :is="popupName"></component>
        <show-plan v-if="planItem !== null" :planItem="planItem"></show-plan>
    </div>
</template>

<script>
import NewTask from './popups/NewTask.vue';
import NewPlan from './popups/NewPlan.vue';
import NewCat from './popups/NewCat.vue';
import ShowPlan from './popups/ShowPlan.vue';

export default {
    name: 'popupPage',
    props : ['popupName' ,'planItem'],
    data() {
        return {
        }
    },
    components : {
        NewTask,
        NewPlan,
        NewCat,
        ShowPlan
    },
    methods: {
        hidePopup(){
            this.$emit('hidePopup')
        }
    },
}
</script>

<style lang="scss">
    .popup{
        background:rgba(#48dbfb , .8);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        z-index: 100;
        display: flex;
        align-items: center;;
        justify-content: center;

        &__form{
            background-color: #fff;
            border-radius: 40px;
            width: 40rem;
            box-shadow: 0 .5 1rem rgba(#000 , .9);
        }

    }

    .form{
        &__content{
            padding: 3rem 4rem;
        }

        &__header{
            padding: 1rem 2rem;
            text-align: center;
            color: white;
            font-size: 2rem;
            border-top-right-radius: 40px;
            border-top-left-radius: 40px;

        }

        &__group{
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-top: 1rem;            
        }

        &__label{

        }

        &__input{
            width: 100%;
            border-radius: 50px;
            padding: 1rem 2rem;
            border: none;
            background: #F5F5F5;
        }

        &__header{
            background: #00CBE5;
        }

        &__submit{
            width: 100%;
            background: #00CBE5;
            padding: 1rem 2rem;
            margin-top: 1.5rem;
            border-radius: 50px;
            text-align: center;
            color: white;

        }
    }

    .btn-close{
        position: absolute;
        right: 3rem;
        top: 1rem;
        color: white;
        font-size: 4rem;
        cursor: pointer;
    }
</style>