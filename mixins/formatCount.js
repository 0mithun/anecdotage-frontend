import abbreviate from 'number-abbreviate';
export default{
  filters:{
    formatCount: function(value){
      return abbreviate(value, 1)
        .toString()
        .toUpperCase();
    }
  }
}
