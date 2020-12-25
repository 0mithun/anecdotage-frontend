<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="tagAddEmoji">
      <div class="form-group row">
        <label for="add_emoji_tag_name" class="col-sm-4 col-form-label"
          >Add emoji: if thread has tag</label
        >
        <div class="col-sm-3">
          <base-input
            :form="add_emoji_tag"
            size="form-control-sm"
            field="add_emoji_tag_name"
            inputType="text"
            v-model="add_emoji_tag.add_emoji_tag_name"
            id="add_emoji_tag_name"
            placeholder="Enter tag name"
          ></base-input>
        </div>
        <div class="col-sm-3">
          <select name="" id="" class="form-control form-control-sm" v-model="add_emoji_tag.emoji_name"  :class="[{ 'is-invalid': add_emoji_tag.errors.has('emoji_name') }]">
            <option value="" selected>Select Emoji</option>
            <option :value="emoji.id" v-for="emoji in emojis" :key="emoji.id">{{ emoji.name }}</option>
          </select>
          <has-error :form="add_emoji_tag" field="emoji_name"></has-error>
        </div>
        <div class="col-sm-2">
          <base-button :loading="add_emoji_tag.busy" size="sm" type="info">
            Add Emoji
          </base-button>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      add_emoji_tag: this.$vform({
        add_emoji_tag_name: '',
        emoji_name: '',
      }),

    };
  },
  computed:{
     emojis() {
      return this.$store.state.emojis;
    },
  },
  methods: {
    async tagAddEmoji(){
      try {
       await this.add_emoji_tag.post(`admin/batch-tool/threads/add-emoji`, this.add_emoji_tag);
         this.add_emoji_tag.add_emoji_tag_name = '';
         this.add_emoji_tag.emoji_name = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Emoji Add Successfully',
        });
      } catch (e) {}
    },


  },
};
</script>

<style lang="scss" scoped>
  .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-6{
    padding: 0px 5px;
  }
</style>


