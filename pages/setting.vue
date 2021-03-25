<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                  v-model="image"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                  v-model="username"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                  v-model="bio"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  v-model="email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  v-model="password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary form-control pull-xs-right"
                @click.prevent="updateUser"
              >
                Update Settings
              </button>
            </fieldset>
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
  name: "setting",
  middleware: "auth",
  data() {
    return {
      image: "",
      username: "",
      bio: "",
      email: "",
      password: "",
    };
  },
  async mounted() {
    let {
      data: {
        user: { image, username, bio, email, password },
      },
    } = await api.getUser();
    this.username = username;
    this.bio = bio;
    this.email = email;
    this.password = password;
    this.image = image;
  },
  methods: {
    async updateUser() {
      const { image, username, bio, email, password } = this;
      let postData = {};
      if (image) {
        postData.image = image;
      }
      if (username) {
        postData.username = username;
      }
      if (bio) {
        postData.bio = bio;
      }
      if (email) {
        postData.email = email;
      }
      if (password) {
        postData.password = password;
      }
      try {
        let { data } = await api.updateUser({ user: postData });
        this.$store.commit("setUser", data.user);
        Cookie.set("user", data.user);
        this.$router.push('/')
      } catch (error) {
        console.dir(error);
      }
    },
  },
};
</script>
