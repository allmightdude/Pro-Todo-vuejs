<template>
  <div class="createTask">
    <div class="createTask__form">
      <form class="form" @submit.prevent="signup()">
        <div class="form__header">Sign Up Form</div>

        <div class="form__content">
          <div class="form__group">
            <label for="name" class="form__label">Name</label>
            <input
              type="text"
              class="form__input"
              name="name"
              v-model="user.name"
            />
          </div>

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
              class="form__input"
              name="password"
              v-model="user.password"
            />
          </div>

          <div class="form__group">
            <label for="title" class="form__label">Confirm Password</label>
            <input
              type="password"
              class="form__input"
              name="password2"
              v-model="user.password2"
            />
          </div>

          <div class="form__group">
            <button href="" class="form__submit" type="submit">Sign Up</button>
          </div>

          <div class="form__group form__group--row">
            <router-link to="/login" class="register-now"
              >Do you have a account?</router-link
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import User from "../models/user";

export default {
  name: "sigupForm",
  data() {
    return {
      user: new User("", "", ""),
      message: "",
    };
  },
  methods: {
    signup() {
      this.$store.dispatch("register", this.user).then(
        (data) => {
          if (data.success) this.$router.push("/");
          else {
            this.message = "please check fileds";
            this.showError = true;
            setTimeout(() => {
              this.showError = false;
            }, 3000);
          }
        },
        (error) => {
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.createTask {
  background: #efefef;

  &__form {
    background-color: #fff;
    border-radius: 10px;
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
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }

  &__group {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1rem;
  }

  &__label {
  }

  &__input {
    width: 100%;
    border-radius: 10px;
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
    border-radius: 10px;
    text-align: center;
    color: white;
  }
}
</style>
