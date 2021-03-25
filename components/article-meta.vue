<template>
    <div class="article-meta">
          <a href=""><img :src='article.author.image' /></a>
          <div class="info">
            <a href="" class="author">Eric Simons</a>
            <nuxt-link :to="{name:'profile',params:{name:article.author.username}}">{{article.author.username}}</nuxt-link>
            <span class="date">{{article.createdAt | date}}</span>
          </div>
          <button class="btn btn-sm btn-outline-secondary" :class="{active:article.author.following}">
            <i class="ion-plus-round"></i>
            &nbsp; Follow {{article.author.username}} <span class="counter">(10)</span>
          </button>
          &nbsp;&nbsp;
          <button class="btn btn-sm btn-outline-primary" :class="{active:article.favorited}">
            <i class="ion-heart"></i>
            &nbsp; Favorite Post <span class="counter">(29)</span>
          </button>
        </div>
</template>
<script>
export default {
    name:'ArticleMeta',
    props:{
        article:{
            type:Object,
            require:true
        }
    }
}
</script>