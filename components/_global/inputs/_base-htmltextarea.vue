<template>
  <div contenteditable="true" @input="updateHTML" ref="body">

  </div>
</template>

<script>
  export default {
    data(){
     return {
       bodyValue: ''
     }
    },
    props:['value'],

    methods: {
      updateHTML: function(e) {
        this.$emit('input', e.target.innerHTML);
        //  this.$refs.body.innerHTML = ''
        //  this.$refs.body.innerHTML =  e.target.innerHTML
        this.bodyValue = e.target.innerHTML
      }
    },
    mounted(){
      this.$refs.body.innerHTML = this.bodyValue
    }
  }
</script>

<style lang="scss" scoped>

</style>

