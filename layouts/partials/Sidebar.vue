<template>
  <div>
     <SocialLink />
      <SingleTrendingThread
        v-for="(trending, index) in trendings"
        :key="trending.id"
        :thread="trending"
        :sticky="index == 0? true: false"
      />
  </div>
</template>

<script>
  import SingleTrendingThread from '@/components/threads/SingleTrendingThread'
  import SocialLink from '~/components/social/SocialLink';
  export default {
    name:'sidebar',
    components:{
      SocialLink,
      SingleTrendingThread
    },
    computed:{
      trendings(){
        return this.$store.state.trendings;
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
