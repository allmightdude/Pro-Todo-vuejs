<template>
    <div class="col-9">
        <div class="main__right">

        <h3 class="heading-3 text-blue ">Weekly Plans</h3>

        <input type="date" v-model="dateValue" @change.prevent="getPlans" class="mt-2">

            <div class="plans">

                <div class="plans__item" v-for="plan in plans" :key="plan._id" @click="showPlanPopup(plan._id)">
                
                    <div class="plans__icon">
                        <svg :class="plan.category.icon + '-icon'">
                            <use :xlink:href="require('@/assets/sprite.svg') + `#icon-${plan.category.icon}`"></use>
                        </svg>
                    </div>
                    <h3 class="heading-3">
                        {{plan.title}}
                    </h3>
                    <span class="plans__date">
                        <!-- August, 9 Sun -->
                        {{getDate(plan.date)}}
                    </span>
                </div>

                <div class="plans__item" @click="showPopup">
                    <svg class="plus-icon">
                        <use xlink:href="@/assets/sprite.svg#icon-plus"></use>
                    </svg>
                </div>

            </div>
        </div>
    </div>    
</template>

<script>


const {GetToday , moment} = require('../services/getToday');

export default {
    data() {
        return {
            dateValue : null,
        }
    },
    methods: {
        getPlans(){
            this.$store.dispatch('getPlansByDate' , this.dateValue);

        },
        showPopup(){
            this.$emit('showPopup' , 'plan')
        },
        showPlanPopup(id){
            this.$emit('showPlanPopup' , id)
        },
        getDate(date){
            return moment(date)
        }
    },
    computed :{
        plans(){
            return this.$store.getters.getPlans
        }
    },
    mounted() {
        this.dateValue = GetToday();
    },
}
</script>

<style lang="scss">
    .plans__item{
        .plus-icon{
            width: 4rem;
            height: 4rem;
            fill: #00CBE5;
        }
    }
</style>