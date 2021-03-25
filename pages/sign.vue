<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <nuxt-link to='/login'>Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(message, file) in errors">
              <li :key="file">{{ file }}{{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="submit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary form-control pull-xs-right">
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../api/index";
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "login",
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    async submit() {
      try {
        const { username, email, password } = this.user;
        const { data } = await api.sign({
          user: {
            username,
            email,
            password,
          },
        });
        this.$store.commit("setUser", data.user);
        Cookie.set("user", data.user);
        this.errors = {};
        this.$router.push("/");
      } catch (error) {
          console.dir(error)
        const {
          data: { errors },
        } = error.response;
        console.log(errors);
        this.errors = errors;
      }
    },
  },
};
</script>
