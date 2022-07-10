<template>
    <div class="col-3">
        <div class="tasks">
        <h3 class="heading-3 text-blue ">Daily Tasks</h3>

            <div class="tasks__option mt-1">
                <input type="date" @change="getTasks" v-model="dateValue">
            </div>

            <button class="tasks__add" @click="showPopup">Add Task</button>

            <transition-group>
                <div class="tasks__item mt-2" v-for="task in tasks" :key="task._id">
                
                    <svg v-if="!task.checked" class="circle-icon" @click="checkTask(task._id)">
                        <use xlink:href="@/assets/sprite.svg#icon-circle"></use>
                    </svg>
                    
                    <svg v-else class="circle-check-icon" @click="checkTask(task._id)">
                        <use xlink:href="@/assets/sprite.svg#icon-check-circle"></use>
                    </svg>

                    <div class="tasks__name">
                        {{task.title}}
                        <svg class="star-icon" v-if="task.important">
                            <use xlink:href="@/assets/sprite.svg#icon-star"></use>
                        </svg>
                    </div>
                                                    
                    <div class="tasks__time">
                        {{task.time}}
                    </div>

                    <div class="tasks__additional">
                        <svg class="trash-icon" @click="deleteTask(task._id)">
                            <use xlink:href="@/assets/sprite.svg#icon-trash"></use>
                        </svg>
                    </div>

                </div>


            </transition-group>
        </div>
    </div>        
</template>

<script>

import UserService from '../services/user.service';
const {GetToday} = require('../services/getToday')

export default {
    data() {
        return {
            dateValue : GetToday()
        }
    },
    computed: {
        tasks(){
            return this.$store.getters.getTasks
        }
    },
    methods: { // log => 2023-12-10 
        showPopup(){
            this.$emit('showPopup' , 'task');
        },

        getTasks(){
            this.$store.dispatch('getTasksbyDate' , this.dateValue);
        },

        checkTask(id){
            this.$store.dispatch('checkTask' , id);
        },

        deleteTask(id){
            UserService.deleteTask(id)
                .then(() => {
                    this.$store.commit('removeTask' , id);
                })
        },
    }
}

</script>

<style lang="scss">
    .tasks{
        &__add{
            background:#00CBE5;
            padding: 1.5rem;
            border-radius: 14px;
            width: 100%;
            color: white;
            margin-top: 1.54rem;
            box-shadow: 0 0.5rem 3.5rem rgba(0, 0, 0, 0.1);
            transition: .3s ease all;

        }

        &__additional{
            width: 3rem;
            height: 3rem;
            padding-left: 1rem;
            display: flex;
            align-items: center;
            
        }

        svg{
            width: 1.5rem;
            height: 1.5rem;
        }

    }
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }
    
    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .forgot,
    .register-now{
        color : #00b894;
        font-size: 1.2rem;
        cursor: pointer;
    }

    .star-icon{
        width: 1rem;
        height: 1rem;
        fill: #f1c40f !important;
    }

    .trash-icon{
        fill: #e74c3c !important;
        cursor: pointer;
    }

</style>
