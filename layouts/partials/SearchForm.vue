<template>

  <div class="header-search">
    <form @submit.prevent="search">
      <div class="form-group navbar-search  ">
        <input
          id="search-box"
          class="form-control font-14 fw-300 search-box"
          type="text"
          :class="activeSearch"
          name="query"
          v-model="q"
          placeholder="Search"
          data-toggle="tooltip" data-placement="top" title="Search"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'search-form',
  data() {
    return {
      q: null,
    };
  },
  computed: {
    activeSearch() {
      return this.q == null ? "" : 'active-search';
    },
  },
  watch:{
      $route (to, from){
          if(to.name == 'search'){

          }else{
            this.q= null;
          }
      }
  },
  created() {
    if(this.$route.query.q){
      this.q = this.$route.query.q
    }
  },
  methods: {
    search(){
      this.$nuxt.$emit('queryStringChange')
      this.$router.push({name:'search', query:{q: this.q} });
    }
  },
};
</script>

<style lang="scss" scoped>
.search-box {
    width: 30px;
    box-sizing: border-box;
    font-size: 16px;
    background-color: #fff;
    padding: 12px 20px 12px 12px;
    -webkit-transition: width .4s;
    transition: width .4s;
    background: url('~assets/images/search.png');
    background-position: right center;
    background-size: 24px;
    background-repeat: no-repeat;
    float: right;
    border: none;
    box-shadow: none;
}



.header-search .form-control {
    // border: #494c62 1px solid;
    // background-color: #494c62;
    // line-height: 1.6;
    // padding-right: 40px;
    // width: 40px;
    border: none;
}

.header-search .form-control {
    // border: #494c62 1px solid;
    line-height: 1.6;
    padding-right: 40px;
    width: 40px;
}

.navbar-search .form-control.search-box:focus {
    width: 100%;
    border: 2px solid #98cbe8;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
}
.header-search .form-control.active-search {
    width: 100%;
    border: 2px solid #98cbe8;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
}


input.search-box {
  // &:not(:placeholder-shown){
  //    width: 100%;
  //   border: 2px solid #98cbe8;
  //   border-radius: 4px;
  //   box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  // }
}


@media (max-width: 991px){
  .search-box {
    background-position: left center;
    float: left;

  }
  .header-search {
      overflow: hidden;
      margin-top: 15px;;
  }


}
@media (max-width: 991px){
  .search-box {
    background-position: left center;
    float: left;

  }
   .header-search {
      overflow: hidden;
        margin-top: 15px;;
  }
}
</style>
