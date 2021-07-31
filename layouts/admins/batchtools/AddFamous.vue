<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="threadsTitleAddFamous">
      <div class="form-group row">
        <label for="set_famous_title" class="col-sm-5 col-form-label"
          >Set famous: every thread, if title contains</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="title_famous"
            size="form-control-sm"
            field="set_famous_title"
            inputType="text"
            v-model="title_famous.set_famous_title"
            id="set_famous_title"
            placeholder="Enter Title Text"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <select name="" id="" class="form-control form-control-sm" v-model="title_famous.set_famous_title_category"  :class="[{ 'is-invalid': title_famous.errors.has('set_famous_title_category') }]">
            <option value="" selected>Select Famous</option>
            <option value="C">Celebrities</option>
            <option value="N">Other notables</option>
            <option value="O">Other people</option>
          </select>
          <has-error :form="title_famous" field="set_famous_title_category"></has-error>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="title_famous.busy" size="sm" type="dark">
            Set Famous
          </BaseButton>
        </div>
      </div>
    </form>
     <form @submit.prevent="threadsBodyAddFamous">
      <div class="form-group row">
        <label for="set_famous_body" class="col-sm-5 col-form-label"
          >Set famous: every thread, if body contains</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="body_famous"
            size="form-control-sm"
            field="set_famous_body"
            inputType="text"
            v-model="body_famous.set_famous_body"
            id="set_famous_body"
            placeholder="Enter body Text"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <select name="" id="" class="form-control form-control-sm" v-model="body_famous.set_famous_body_category"  :class="[{ 'is-invalid': body_famous.errors.has('set_famous_body_category') }]">
            <option value="" selected>Select Famous</option>
            <option value="C">Celebrities</option>
            <option value="N">Other notables</option>
            <option value="O">Other people</option>
          </select>
          <has-error :form="body_famous" field="set_famous_body_category"></has-error>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="body_famous.busy" size="sm" type="primary">
            Set Famous
          </BaseButton>
        </div>
      </div>
    </form>

     <form @submit.prevent="threadsTagAddFamous">
      <div class="form-group row">
        <label for="set_famous_tag" class="col-sm-5 col-form-label"
          >Set famous: every thread, if tag contains</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="tag_famous"
            size="form-control-sm"
            field="set_famous_tag"
            inputType="text"
            v-model="tag_famous.set_famous_tag"
            id="set_famous_tag"
            placeholder="Enter tag Text"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <select name="" id="" class="form-control form-control-sm" v-model="tag_famous.set_famous_tag_category"  :class="[{ 'is-invalid': tag_famous.errors.has('set_famous_tag_category') }]">
            <option value="" selected>Select Famous</option>
            <option value="C">Celebrities</option>
            <option value="N">Other notables</option>
            <option value="O">Other people</option>
          </select>
          <has-error :form="tag_famous" field="set_famous_tag_category"></has-error>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="tag_famous.busy" size="sm" type="success">
             Set Famous
          </BaseButton>
        </div>
      </div>
    </form>

  </div>
</template>

<script>
import BaseInput from '@/components/form/inputs/BaseInput'
import BaseButton from '@/components/form/buttons/BaseButton'
export default {
  components: {BaseInput, BaseButton},
  data() {
    return {
      title_famous: this.$vform({
        set_famous_title: '',
        set_famous_title_category: '',
      }),
      body_famous: this.$vform({
        set_famous_body: '',
        set_famous_body_category: '',
      }),
      tag_famous: this.$vform({
        set_famous_tag: '',
        set_famous_tag_category: '',
      }),

    };
  },
  methods: {
    async threadsTitleAddFamous(){
      try {
       await this.title_famous.post(`admin/batch-tool/threads/set-famous-threads-title`, this.title_famous);
         this.title_famous.set_famous_title = '';
         this.title_famous.emoji_name = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Famous Set Successfully',
        });
      } catch (e) {}
    },
    async threadsBodyAddFamous(){
      try {
       await this.body_famous.post(`admin/batch-tool/threads/set-famous-threads-body`, this.body_famous);
         this.body_famous.set_famous_body = '';
         this.body_famous.emoji_name = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Famous Set Successfully',
        });
      } catch (e) {}
    },
    async threadsTagAddFamous(){
      try {
       await this.tag_famous.post(`admin/batch-tool/threads/set-famous-threads-tag`, this.tag_famous);
         this.tag_famous.set_famous_tag = '';
         this.tag_famous.emoji_name = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Famous Set Successfully',
        });
      } catch (e) {}
    },


  },
};
</script>

<style lang="scss" scoped>
  .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6{
    padding: 0px 5px;
  }
</style>


