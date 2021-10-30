<template>
  <div>
    aid page
  </div>
</template>

<script>
  export default {
      beforeMount() {
        const query = this.$route.query;
        const params = this.$route.params
        console.log(query)
        console.log(params)

        if(query.hasOwnProperty('who') && query.who != null){
          this.$router.push({name:'search', query:{q:query.who}})
        }
        else if(params.hasOwnProperty('value') && params.value != null){
            this.$router.push({name:'search', query:{q:params.value}})
        }

        // if(query.hasOwnProperty('aid') && query.aid != ''){
        //   window.location = `${process.env.API_URL}/aid-url?aid=${query.aid}`
        // }else{
        //   window.location = '/'
        // }
      },
  }
</script>

<style lang="scss" scoped>

</style>
