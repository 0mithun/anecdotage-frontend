<template>
  <div class="status">
    <span>
      <i class="fa fa-circle" :class="{online:is_online, offline: !is_online}" ></i>
      <template  v-if="status == 'full'" >
        {{ is_online ? 'online' : 'offline' }}
      </template>
    </span>
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

<style>
  .online, .offline, .me {
      margin-right: 3px;
      font-size: 10px;
  }
  .online {
      color: #86bb71;
  }
  .offline {
      color: #e38968;
  }

  .status {
      display: inline-block;
      margin-right: 5px;
  }
  .offline{
      color:#92959e;
      font-size: 10px
  }
</style>
