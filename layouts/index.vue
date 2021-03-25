<template>
  <div>
    <Head />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Head from './Head'
import Footer from './Footer'
export default {
    components:{
        Head,
        Footer
    }
}
</script>