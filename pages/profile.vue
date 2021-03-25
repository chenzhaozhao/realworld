<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="image" class="user-img" />
            <h4>{{ username }}</h4>
            <p>
              {{ bio }}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{ username }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link active">My Articles</a>
              </li>
              <li class="nav-item">
                <a class="nav-link">Favorited Articles</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="article-preview"
        v-for="article in articles"
        :key="article.slug"
      >
        <div class="article-meta">
          <nuxt-link
            :to="{
              name: 'profile',
              params: { username: article.author.username },
            }"
            ><img :src="article.author.image"
          /></nuxt-link>
          <div class="info">
            <nuxt-link
              :to="{
                name: 'profile',
                params: { username: article.author.username },
              }"
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
  </div>
</template>
<script>
import api from "../api/index";
export default {
  name: "profile",
  middleware: "auth",
  async asyncData({ params }) {
    const { username } = params;
    let {
      data: { profile },
    } = await api.getUserByName(username);
    let {data:{articles,articlesCount}} = await api.getArticle({ author: username });
    return {
      ...profile,
      articles
    };
  },
};
</script>