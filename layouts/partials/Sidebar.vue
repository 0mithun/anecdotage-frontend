<template>
  <div>
     <SocialLink />
     <div class="card mt-4">
      <div class="card-body">
        <h3 class="trending-title">Trending</h3>
      </div>
    </div>
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
  .trending-title {
    padding: 0;
    margin-top: 0;
    text-transform: uppercase;
    text-align: center;
    font-weight: 700;
    font-size: 24px;
  }



@media (max-width: 1200px){
}
@media (max-width: 991px){
}
@media (max-width: 900px){
  .trending-title {
      font-size: 20px;
  }
}



@media (max-width: 574px){

}
</style>
