<template>
  <div class="createTask">
    <Transition>
      <div class="error" v-show="showError">
        {{ message }}
      </div>
    </Transition>

    <div class="createTask__form">
      <form action="" class="form" @submit.prevent="login">
        <div class="form__header">Login Form</div>

        <div class="form__content">
          <div class="form__group">
            <label for="title" class="form__label">Email</label>
            <input
              type="text"
              class="form__input"
              name="email"
              v-model="user.email"
            />
          </div>

          <div class="form__group">
            <label for="title" class="form__label">Password</label>
            <input
              type="password"
              id="password"
              class="form__input"
              name="password"
              v-model="user.password"
            />

            <svg class="eye-icon" @click="showPassword">
              <use xlink:href="@/assets/sprite.svg#icon-eye"></use>
            </svg>
          </div>

          <div class="form__group">
            <button href="" class="form__submit" type="submit">
              <span v-if="!isLoading">login</span>
              <span v-else>
                <base-spinner></base-spinner>
              </span>
            </button>
          </div>

          <div class="form__group form__group--row">
            <router-link to="/signup" class="register-now"
              >Register Now</router-link
            >
            <div class="forgot">Forgot Password?</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "LoginPage",

  data() {
    return {
      user: new User("", ""),
      message: "",
      showError: false,
      isLoading: false,
    };
  },
  methods: {
    async login() {
      this.isLoading = true;
      try {
        let res = await this.$store.dispatch("login", this.user);
        if (res.status === 200) {
          this.$router.replace("/");
        }
      } catch (error) {
        this.error = error.message || "Cant login , Try Again Later...";
      }
      this.isLoading = true;
    },
    showPassword() {
      let input = document.querySelector("#password");
      if (input.getAttribute("type") === "password")
        input.setAttribute("type", "text");
      else input.setAttribute("type", "password");
    },
  },
};
</script>

<style lang="scss" scoped>
.createTask {
  background: #efefef;

  &__form {
    background-color: #fff;
    border-radius: 40px;
    width: 40rem;
    box-shadow: 0 0.5 1rem rgba(#000, 0.9);
  }
}

.form {
  &__content {
    padding: 3rem 4rem;
  }

  &__header {
    padding: 1rem 2rem;
    text-align: center;
    color: white;
    font-size: 2rem;
    border-top-right-radius: 40px;
    border-top-left-radius: 40px;
  }

  &__group {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
    position: relative;

    &--row {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__label {
  }

  &__input {
    width: 100%;
    border-radius: 50px;
    padding: 1rem 2rem;
    border: none;
    background: #f5f5f5;
  }

  &__header {
    background: #00b894;
  }

  &__submit {
    width: 100%;
    background: #00b894;
    padding: 1rem 2rem;
    margin-top: 1.5rem;
    border-radius: 50px;
    text-align: center;
    color: white;
  }

  .eye-icon {
    fill: #b2bec3;
    position: absolute;
    right: 1rem;
    top: 55%;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }
}

.error {
  background-color: #d63031;
  color: white;
  padding: 1.5rem 2rem;
  border-radius: 4px;
  position: fixed;
  right: 3rem;
  top: 3rem;
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
.register-now {
  color: #00b894;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
