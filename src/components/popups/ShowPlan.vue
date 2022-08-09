<template>
    <div class="showPlan" v-if="planItem">
        <div class="showPlan__title">
            <div class="showPlan__icon">
                <svg class="swim-icon">
                    <use xlink:href="@/assets/sprite.svg#icon-swim"></use>
                </svg>
                <h2 class="heading-2">
                    {{planItem.title}}
                </h2>
                <p v-if="planItem.tasks.length"> You have {{planItem.tasks.length}} Task in this plan </p>
                <p v-else>There is not task with this plan</p>
            </div>
        </div>
        <!-- <input type="date" class="mt-3"> -->

        <div class="showPlan__holder mt-2">
            <div class="showPlan__task" v-for="task in planItem.tasks" :key="task._id">
                <div class="showPlan__task-title">
                    {{task.title}} <svg class="star-icon">
                        <use xlink:href="@/assets/sprite.svg#icon-star"></use>
                    </svg>
                </div>

                <div class="showPlan__task-additional">
                    <div class="showPlan__task-time">08:30 am</div>
                    <div class="showPlan__task-date">{{getDate(task.date)}}</div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import { moment } from '@/services/getToday'

export default {
    props : ['planItem'],
    methods: {
        getDate(date){
            return moment(date)
        }
    },
}
</script>

<style lang="scss" scoped>

    .showPlan{
        background: #fff;
        box-shadow: 0 0.5rem 1rem rgba(#000 , .3);
        border-radius: 14px;
        padding: 2rem 4rem;
        width: 70rem;
        max-width: 100%;

        &__holder{
            display: flex;;
            flex-wrap: wrap;
            gap : 1rem;
        }

        &__icon{
        }

        &__task{
            box-shadow: 0 0.2rem .5rem rgba(#000 , .2);
            padding: 1rem 2rem;
            border-radius: 14px;
            width: 20rem;
            max-width: 100%;
            min-height: 10rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 1.3rem;
            cursor: pointer;

            &-additional{
                font-size: 1.3rem;
                display: flex;
                justify-content: space-between;
                gap: 1rem;
                margin-top: 3rem;
            }
        }
        
    }


    
</style>