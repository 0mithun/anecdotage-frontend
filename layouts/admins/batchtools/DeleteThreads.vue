<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="threadsSearchAndDeleteTitle">
      <div class="form-group row">
        <label for="delete_thread_title" class="col-sm-5 col-form-label"
          >Delete thread: if thread title contains	</label
        >
        <div class="col-sm-4">
          <BaseInput
            :form="title_delete"
            size="form-control-sm"
            field="delete_thread_title"
            inputType="text"
            v-model="title_delete.delete_thread_title"
            id="delete_thread_title"
            placeholder="Enter Title Text"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseButton :loading="title_delete.busy" size="sm" type="dark">
             Delete Threads
          </BaseButton>
        </div>
      </div>
    </form>
    <form @submit.prevent="threadsSearchAndDeleteBody">
      <div class="form-group row">
        <label for="delete_thread_body" class="col-sm-5 col-form-label"
          >Delete thread: if thread body contains	</label
        >
        <div class="col-sm-4">
          <BaseInput
            :form="body_delete"
            size="form-control-sm"
            field="delete_thread_body"
            inputType="text"
            v-model="body_delete.delete_thread_body"
            id="delete_thread_body"
            placeholder="Enter Body Text"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseButton :loading="body_delete.busy" size="sm" type="primary">
             Delete Threads
          </BaseButton>
        </div>
      </div>
    </form>
     <form @submit.prevent="threadsSearchAndDeleteTag">
      <div class="form-group row">
        <label for="delete_thread_tag" class="col-sm-5 col-form-label"
          >Delete thread: if thread tag contains	</label
        >
        <div class="col-sm-4">
          <BaseInput
            :form="tag_delete"
            size="form-control-sm"
            field="delete_thread_tag"
            inputType="text"
            v-model="tag_delete.delete_thread_tag"
            id="delete_thread_tag"
            placeholder="Enter Tag Name"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseButton :loading="tag_delete.busy" size="sm" type="success">
            Delete Threads
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
      title_delete: this.$vform({
        delete_thread_title: '',
      }),
      body_delete: this.$vform({
        delete_thread_body: '',
      }),
      tag_delete: this.$vform({
        delete_thread_tag: '',
      }),


    };
  },
  methods: {
    async threadsSearchAndDeleteTitle(){
      try {
       await this.title_delete.post(`admin/batch-tool/threads/delete-threads-title`, this.title_delete);
         this.title_delete.delete_thread_title = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads Delete Successfully',
        });
      } catch (e) {}
    },
    async threadsSearchAndDeleteBody(){
      try {
       await this.body_delete.post(`admin/batch-tool/threads/delete-threads-body`, this.body_delete);
         this.body_delete.delete_thread_body = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads Delete Successfully',
        });
      } catch (e) {}
    },
    async threadsSearchAndDeleteTag(){
      try {
       await this.tag_delete.post(`admin/batch-tool/threads/delete-threads-tag`, this.tag_delete);
         this.tag_delete.delete_thread_tag = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads Delete Successfully',
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


