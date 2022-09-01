<template>
        <div class="popup__form">

            <form action="" class="form" @submit.prevent="createTask">
                <div class="form__header">New Task</div>

                <div class="form__content">
                    <div class="form__group">
                        <label for="title" class="form__label">Title</label>
                        <input type="text" class="form__input" v-model="title" >
                    </div>

                    <div class="form__group">
                        <label for="title" class="form__label">Date</label>
                        <input type="date" class="form__input" v-model="date">
                    </div>

                    <div class="form__group">
                        <label for="title" class="form__label">Time</label>
                        <input type="time" class="form__input" v-model="time">
                    </div>

                    <div class="form__radio-group">
                        <input type="checkbox" value="true" v-model="important" />
                        <label for="title" class="form__label">Is this important?</label>
                    </div>

                    <div class="form__group">
                        <button type="submit" class="form__submit">Create</button>
                    </div>

                </div>


            </form>
        </div>
</template>

<script>

import UserService from '../../services/user.service'

export default {
    inject :['hidePopup'],
    data() {
        return {
            title : null,
            date : null,
            time : null,
            important : false
        }
    },
    methods: {
        createTask(){
            let data = {
                title : this.title,
                date : this.date,
                time : this.time,
                important : this.important
            }

            UserService.createTask(data)
                .then(res => {
                    this.hidePopup();
                    this.$store.commit('todo/addTask', res.data.newTask);
                    
                }).catch(err => {
                    console.log(err);
                })
        }
    },
}
</script>

<style lang="scss">

    .flex{
        display: flex;
    }
    .createTask{
        background:rgba($color-primary , .8);
        position: fixed;
        width: 100%;
        height: 100%;
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



    .btn-close{
        position: absolute;
        right: 3rem;
        top: 1rem;
        color: white;
        font-size: 4rem;
        cursor: pointer;
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
            background-color: #ff9f43;

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
            background: $color-primary;
        }

        &__submit{
            width: 100%;
            background: $color-primary;
            padding: 1rem 2rem;
            margin-top: 1.5rem;
            border-radius: 50px;
            text-align: center;
            color: white;

        }
        
        &__radio-group{
            padding: 1.5rem 0;
            display: flex;
            gap: .5rem;
        }
    }

    input[type='checkbox'] {
        accent-color: $color-primary;
        svg{
            fill: red
        };
    }

</style>