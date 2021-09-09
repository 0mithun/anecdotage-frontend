<template>
  <div class="card card-m-5">
    <div class="card-body">
      <div class="count-column">
        {{ threadsCount | formatCount }}
        {{ threadsCount | strPlural('Post') }}
      </div>
    </div>
  </div>
</template>

<script>

import StrPlural from '@/mixins/strPlural'
import formatCount from '@/mixins/formatCount'
  export default {
    mixins: [ StrPlural, formatCount],
    computed:{
      threadsCount(){
        return this.$store.getters['threads/pageinateData'].total
      }
  },
  }
</script>

<style lang="scss" scoped>
  .card-body{
    padding:5px 10px;
  }
</style>
