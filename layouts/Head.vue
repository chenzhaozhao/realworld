<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <a class="navbar-brand" href="index.html">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <nuxt-link class="nav-link" to="/" exact="">Home</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="/editor">
            <i class="ion-compose"></i>&nbsp;New Post</nuxt-link
          >
        </li>
        <template v-if="user">
          <li class="nav-item">
            <nuxt-link class="nav-link" :to="{name:'profile',params:{username:user.username }}"
              ><img :src="user.image" alt="" class="user-pic" />
              {{ user.username }}
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/setting"
              ><i class="ion-gear-a"></i>&nbsp;Settings</nuxt-link
            >
          </li>
        </template>
        <template v-else>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/login">Login</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link class="nav-link" to="/sign">Sign up</nuxt-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Head",
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    btn() {
      console.log(this.user);
    },
  },
};
</script>
