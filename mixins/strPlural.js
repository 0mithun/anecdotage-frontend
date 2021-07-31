export default{
  filters:{
    strPlural: function(value, text){
      if(value == 0){
        return text+'s';
      }else if(value ==1){
        return text;
      }else if(value >1){
        return text + 's'
      }
    }
  }
}
