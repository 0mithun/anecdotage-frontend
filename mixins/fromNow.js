
import moment from 'moment'

export default{
    filters:{
      fromNow: function(value){
        return moment(value).startOf('hour').fromNow();
      }
    }
}
