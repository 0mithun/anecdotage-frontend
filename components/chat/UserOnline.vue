<template>
  <div class="status">
    <div class="indicator" :class="{online:is_online, offline: !is_online}">

    </div>
    <!-- <span>
      <svg
        :class="{online:is_online, offline: !is_online}"
       aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
      </svg>
      <template  v-if="status == 'full'" >
        {{ is_online ? 'online' : 'offline' }}
      </template>
    </span> -->
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import _ from 'lodash';
export default {
  name: 'online',
  props:{
    user:{
      type: Object,
      required: true,
    },
    status:{
      default:'full'
    }
  },

  computed:{
    ...mapGetters({
      onlineUsers:'chat/onlineUsers'
    }),
    is_online(){
      if(_.find(this.onlineUsers, {'id':this.user.id})){
        return true;
      }
      return false;
    }
  },
}
</script>

<style lang="scss" scoped>

  .online, .offline, .me {
      /* margin-right: 3px; */
      font-size: 10px;
  }
  .online {
      color: #86bb71;
      background-color: #86bb71;;
  }
  .offline {
      color: #e38968;
      background-color: #e38968;
  }

  .status {
      /* display: inline-block;
      margin-right: 5px; */
    width: 20px;
    height: 20px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
        margin-left: -15px;
    margin-top: 15px;
  }
  .offline{
      // color:#92959e;
      font-size: 10px
  }

.svg-inline--fa path{
  fill: currentColor;
}

.indicator{
  width:12px;
  height:12px;
  border-radius: 50%;
}
</style>
