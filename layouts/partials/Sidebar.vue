<template>
  <div>
     <SocialLink />
      <SingleTrendingThread
        v-for="trending in trendings"
        :key="trending.id"
        :thread="trending"
      />
  </div>
</template>

<script>
  import SingleTrendingThread from '@/components/threads/SingleTrendingThread'
  import SocialLink from '~/components/social/SocialLink';
  export default {
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
