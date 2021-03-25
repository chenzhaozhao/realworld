<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ title }}</h1>
        <ArticleMeta
          :article="{ author, createdAt, favorited, favoritesCount, slug }"
        />
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12" v-html="body"></div>
      </div>

      <hr />

      <div class="article-actions">
        <ArticleMeta
          :article="{ author, createdAt, favorited, favoritesCount, slug }"
        />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                rows="3"
                v-model="comment"
              ></textarea>
            </div>
            <div class="card-footer">
              <img
                :src="user.image"
                class="comment-author-img"
              />
              <button
                class="btn btn-sm btn-primary"
                @click.prevent="postComment"
              >
                Post Comment
              </button>
            </div>
          </form>

          <div class="card" v-for="item in comments" :key="item.id">
            <div class="card-block">
              <p class="card-text">
                {{ item.body }}
              </p>
            </div>
            <div class="card-footer">
              <img :src="item.author.image" class="comment-author-img" />
              &nbsp;
              <a class="comment-author">{{ item.author.username }}</a>
              <span class="date-posted">{{ item.createdAt | date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../api/index";
import MarkdownIt from "markdown-it";
import ArticleMeta from "../components/article-meta";
import { mapState } from "vuex";
export default {
  name: "article",

  components: {
    ArticleMeta,
  },
  async asyncData({ params }) {
    console.log(params);
    const {
      data: { article },
    } = await api.getArticleBySlug(params.slug);
    const md = new MarkdownIt();
    article.body = md.render(article.body);
    return {
      ...article,
      comments: [],
      slug: params.slug,
      comment: "",
    };
  },
  async mounted() {
    const {
      data: { comments },
    } = await api.getCommentBySlug(this.slug);
    this.comments = comments;
  },
  methods: {
    async postComment() {
      await api.setCommentBySlug(this.slug, {
        comment: { body: this.comment },
      });
    },
  },
  computed:{
...mapState(["user"]) 
  },
  head() {
    return {
      title: this.title + "realworld",
      meta: [
        { hid: "description", name: "description", content: this.description },
      ],
    };
  },
};
</script>
