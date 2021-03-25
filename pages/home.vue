<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  :to="{ name: 'home', query: { tab: 'you' } }"
                  class="nav-link"
                  :class="{
                    active: tab == 'you',
                  }"
                  exact
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  :to="{ name: 'home', query: { tab: 'global' } }"
                  class="nav-link"
                  :class="{
                    active: tab == 'global',
                  }"
                  exact
                  >Global Feed</nuxt-link
                >
              </li>
            </ul>
          </div>

          <div
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link
                :to="{ name: 'profile', params: {username :article.author.username} }"
                ><img :src="article.author.image"
              /></nuxt-link>
              <div class="info">
                <nuxt-link
                  :to="{ name: 'profile', params: {username :article.author.username}}"
                  >{{ article.author.username }}</nuxt-link
                >
                <span class="date">{{ article.createdAt | date }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited }"
                @click="updateFavorite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              class="preview-link"
              :to="{
                name: 'article',
                params: {
                  slug: article.slug,
                },
              }"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <a
                href=""
                class="tag-pill tag-default"
                v-for="(tag, index) in tags"
                :key="index"
                >{{ tag }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../api/index";
import { mapState } from "vuex";
export default {
  name: "home",
  async asyncData({ query }) {
    const [data1, data2] = await Promise.all([
      query.tab === "you" ? api.getOwnerArticle() : api.getArticle(),
      api.getTag(),
    ]);
    const {
      data: { articles, articlesCount },
    } = data1;
    const {
      data: { tags },
    } = data2;
    return {
      articles,
      articlesCount,
      tags,
      tab: query.tab || "global",
    };
  },
  methods: {
    updateFavorite(item) {
      const { favorited, slug } = item;
      favorited ? api.deleteFavorite() : api.addFavorite(slug);
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  watchQuery: ["tab"],
};
</script>
