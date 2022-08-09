<template>

        <div class="createTask__form">
            <form action="" class="form" @submit.prevent="createCategory">
                <div class="form__header">New Category</div>
                <div class="form__content">
                    <div class="form__group">
                        <label for="title" class="form__label">Title</label>
                        <input type="text" class="form__input" v-model="title">
                    </div>
                    
                    <div class="form__group">
                        <div class="form__cats">
                            <div class="form__cats-item" @click="setCetegory($event)">
                                <svg class="color_lens-icon">
                                    <use xlink:href="@/assets/sprite.svg#icon-color_lens"></use>
                                </svg>
                            </div>

                            <div class="form__cats-item" @click="setCetegory($event)">
                                <svg class="shopping-cart-icon">
                                    <use xlink:href="@/assets/sprite.svg#icon-shopping-cart"></use>
                                </svg>
                            </div>

                            <div class="form__cats-item" @click="setCetegory($event)">
                                <svg class="calculate-icon">
                                    <use xlink:href="@/assets/sprite.svg#icon-calculate"></use>
                                </svg>
                            </div>
                            <div class="form__cats-item" @click="setCetegory($event)">
                                <svg class="bike-icon">
                                    <use xlink:href="@/assets/sprite.svg#icon-bike"></use>
                                </svg>
                            </div>
                            <div class="form__cats-item" @click="setCetegory($event)">
                                <svg class="swim-icon">
                                    <use xlink:href="@/assets/sprite.svg#icon-swim"></use>
                                </svg>
                            </div>
                            <div class="form__cats-item" @click="setCetegory($event)">
                                <svg class="gamepad-icon">
                                    <use xlink:href="@/assets/sprite.svg#icon-gamepad"></use>
                                </svg>
                            </div>
                            <div class="form__cats-item" @click="setCetegory($event)">
                                <svg class="soundcloud-icon">
                                    <use xlink:href="@/assets/sprite.svg#icon-soundcloud"></use>
                                </svg>
                            </div>
                            
                        </div>
                    </div>

                    <div class="form__group">
                        <button type="submit" class="form__submit">Create</button>
                    </div>

                </div>
            </form>
        </div>

</template>

<script>
import UserService from '@/services/user.service'

export default {
    inject : ['hidePopup'],
    data() {
        return {
            title : "",
            category : null
        }
    },
    methods: {
        createCategory(){
            UserService.createCategory({category : this.category})
                .then(() => {
                    this.$store.commit('addCategory' , this.category);
                    this.hidePopup()
                })
                .catch(err => {
                    console.log(err);
                })
        },

        setCetegory(event){
            const target = event.target;

            const cats = document.querySelectorAll('.form__cats-item');
            cats.forEach(cat => {
                cat.classList.remove('active')
            });
            event.target.classList.add('active');

            let icon = target.querySelector('svg').classList;
            icon = icon[0].replace('-icon' , "");


            this.category = {
                title : this.title,
                icon : icon
            }


        },
    },
}
</script>

<style lang="scss" scoped>

    .form{

        &__header{
            background-color: #00CEC9;
        }

        &__submit{
            background: #00CEC9;
        }

        &__cats{
            display: flex;
            gap: 0.5rem;
            overflow-x: auto;
            overflow-x: auto;
            flex-flow: row nowrap;
            scrollbar-width: thin;
            scrollbar-color: #00CEC9;
            transition: scrollbar-color 0.3s ease-out;
            scrollbar-color: #00CEC9 #e4e4e4;
            transition: scrollbar-color 0.3s ease-out;
            padding: 1rem 0;

            &-item{
                background-color: #efefef;
                padding: .5rem 2rem;
                border-radius: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-sizing: border-box;

                svg{
                    width: 2rem;
                    height: 2rem;
                    pointer-events: none;
                }

            }
            
                .active{
                    border: 1px solid #00CEC9;
                }
        }

        .error{
            color: #EE5253;
            font-size: 1.2rem;
        }

    }
</style>