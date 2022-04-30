<template>
  <div>
    <div class="top-add">
            <!-- Ezoic - sidebar - sidebar -->
      <div id="ezoic-pub-ad-placeholder-109"> </div>
      <!-- End Ezoic - sidebar - sidebar -->
    </div>
     <SocialLink />
     <div class="card mt-4">
      <div class="card-body">
        <h3 class="trending-title">Trending</h3>
      </div>
    </div>
      <!-- Ezoic - sidebar_middle - sidebar_middle -->
      <div id="ezoic-pub-ad-placeholder-114"> </div>
      <!-- End Ezoic - sidebar_middle - sidebar_middle -->
      <SingleTrendingThread
        :thread="sticky"
        :sticky="true"
      />
      <SingleTrendingThread
        v-for="(trending) in trendings"
        :key="trending.id"
        :thread="trending"
        :sticky="false"
      />
      <!-- Ezoic - sidebar_bottom - sidebar_bottom -->
      <div id="ezoic-pub-ad-placeholder-113"> </div>
      <!-- End Ezoic - sidebar_bottom - sidebar_bottom -->
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
      },
      sticky() {
        return this.$store.state.sticky;
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
  // .top-add{
  //   height:300px;
  // }



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
