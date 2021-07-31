<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="threadsAddTagTitle">
      <div class="form-group row">
        <label for="add_tag_title" class="col-sm-4 col-form-label"
          >Add tag: every thread, if body contains</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="add_tag_title"
            size="form-control-sm"
            field="add_tag_title"
            inputType="text"
            v-model="add_tag_title.add_tag_title"
            id="add_tag_title"
            placeholder="Enter title Text"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseInput
            :form="add_tag_title"
            size="form-control-sm"
            field="add_tag_title_tag_name"
            inputType="text"
            v-model="add_tag_title.add_tag_title_tag_name"
            id="add_tag_title_tag_name"
            placeholder="Enter Tag Name"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="add_tag_title.busy" size="sm" type="dark">
            Add Tag
          </BaseButton>
        </div>
      </div>
    </form>
    <form @submit.prevent="threadsAddTagBody">
      <div class="form-group row">
        <label for="add_tag_body" class="col-sm-4 col-form-label"
          >Add tag: every thread, if body contains</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="add_tag_body"
            size="form-control-sm"
            field="add_tag_body"
            inputType="text"
            v-model="add_tag_body.add_tag_body"
            id="add_tag_body"
            placeholder="Enter body Text"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseInput
            :form="add_tag_body"
            size="form-control-sm"
            field="add_tag_body_tag_name"
            inputType="text"
            v-model="add_tag_body.add_tag_body_tag_name"
            id="add_tag_body_tag_name"
            placeholder="Enter Tag Name"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="add_tag_body.busy" size="sm" type="primary">
            Add Tag
          </BaseButton>
        </div>
      </div>
    </form>
    <form @submit.prevent="threadsAddTagTag">
      <div class="form-group row">
        <label for="add_tag_with_tag" class="col-sm-4 col-form-label"
          >Add tag: every thread, if tag contains</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="add_tag_tag"
            size="form-control-sm"
            field="add_tag_with_tag"
            inputType="text"
            v-model="add_tag_tag.add_tag_with_tag"
            id="add_tag_with_tag"
            placeholder="Enter Old Tag Name"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseInput
            :form="add_tag_tag"
            size="form-control-sm"
            field="add_tag_with_tag_tag_name"
            inputType="text"
            v-model="add_tag_tag.add_tag_with_tag_tag_name"
            id="add_tag_with_tag_tag_name"
            placeholder="Enter Tag Name"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="add_tag_tag.busy" size="sm" type="success">
            Add Tag
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
      add_tag_title: this.$vform({
        add_tag_title: '',
        add_tag_title_tag_name: '',
      }),
      add_tag_body: this.$vform({
        add_tag_body: '',
        add_tag_body_tag_name: '',
      }),
      add_tag_tag: this.$vform({
        add_tag_tag: '',
        add_tag_with_tag_tag_name: '',
      }),

    };
  },
  methods: {
    async threadsAddTagTitle(){
      try {
       await this.add_tag_title.post(`admin/batch-tool/threads/threads-add-tag-title`, this.add_tag_title);
         this.add_tag_title.add_tag_title = ''
         this.add_tag_title.add_tag_title_tag_name = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads Tag Add Successfully',
        });
      } catch (e) {}
    },
    async threadsAddTagBody(){
      try {
       await this.add_tag_body.post(`admin/batch-tool/threads/threads-add-tag-body`, this.add_tag_body);
         this.add_tag_body.add_tag_body = ''
         this.add_tag_body.add_tag_body_tag_name = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads Tag Add Successfully',
        });
      } catch (e) {}
    },
    async threadsAddTagTag(){
      try {
       await this.add_tag_tag.post(`admin/batch-tool/threads/threads-add-tag-with-tag`, this.add_tag_tag);
         this.add_tag_tag.add_tag_tag = ''
         this.add_tag_tag.add_tag_with_tag_tag_name = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads Tag Add Successfully',
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


