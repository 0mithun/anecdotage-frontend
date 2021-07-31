<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="renameTagName">
      <div class="form-group row">
        <label for="old_tag_name" class="col-sm-4 col-form-label"
          >Rename tag: for tag</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="rename_tag"
            size="form-control-sm"
            field="old_tag_name"
            inputType="text"
            v-model="rename_tag.old_tag_name"
            id="old_tag_name"
            placeholder="Enter Old Text"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseInput
            :form="rename_tag"
            size="form-control-sm"
            field="new_tag_name"
            inputType="text"
            v-model="rename_tag.new_tag_name"
            id="new_tag_name"
            placeholder="Enter New Text"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="rename_tag.busy" size="sm" type="dark">
            Rename Tag
          </BaseButton>
        </div>
      </div>
    </form>
    <form @submit.prevent="TagDelete">
      <div class="form-group row">
        <label for="delete_tag_name" class="col-sm-7 col-form-label"
          >Delete tag: for tag</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="delete_tag"
            size="form-control-sm"
            field="delete_tag_name"
            inputType="text"
            v-model="delete_tag.delete_tag_name"
            id="delete_tag_name"
            placeholder="Enter Tag Name"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="delete_tag.busy" size="sm" type="danger">
            Delete Tag
          </BaseButton>
        </div>
      </div>
    </form>

    <form @submit.prevent="removeBodyTag">
      <div class="form-group row">
        <label for="old_tag_name" class="col-sm-4 col-form-label"
          >Remove tag: If body has string</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="remove_tag_body"
            size="form-control-sm"
            field="body"
            inputType="text"
            v-model="remove_tag_body.body"
            id="body"
            placeholder="Enter body text"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseInput
            :form="remove_tag_body"
            size="form-control-sm"
            field="tag"
            inputType="text"
            v-model="remove_tag_body.tag"
            id="tag"
            placeholder="Enter remove tag text"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="remove_tag_body.busy" size="sm" type="danger">
            Remove Tag
          </BaseButton>
        </div>
      </div>
    </form>
    <form @submit.prevent="removeTagTag">
      <div class="form-group row">
        <label for="find_tag" class="col-sm-4 col-form-label"
          >Remove tag: If thread has tag</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="remove_tag_tag"
            size="form-control-sm"
            field="find_tag"
            inputType="text"
            v-model="remove_tag_tag.find_tag"
            id="find_tag"
            placeholder="Enter find tag text"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseInput
            :form="remove_tag_tag"
            size="form-control-sm"
            field="remove_tag"
            inputType="text"
            v-model="remove_tag_tag.remove_tag"
            id="remove_tag"
            placeholder="Enter remove tag text"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="remove_tag_tag.busy" size="sm" type="danger">
            Remove Tag
          </BaseButton>
        </div>
      </div>
    </form>


    <form @submit.prevent="changeChannelName">
      <div class="form-group row">
        <label for="find_tag" class="col-sm-4 col-form-label"
          >Change Channel ID</label
        >
        <div class="col-sm-3">
          <BaseInput
            :form="change_channel"
            size="form-control-sm"
            field="tag"
            inputType="text"
            v-model="change_channel.tag"
            id="tag"
            placeholder="Enter tag name"
          ></BaseInput>
        </div>
        <div class="col-sm-3">
          <BaseInput
            :form="change_channel"
            size="form-control-sm"
            field="channel"
            inputType="text"
            v-model="change_channel.channel"
            id="channel"
            placeholder="Enter channel name"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="change_channel.busy" size="sm" type="dark">
            Change Channel
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
      rename_tag: this.$vform({
        old_tag_name: '',
        new_tag_name: '',
      }),
       delete_tag: this.$vform({
        delete_tag_name: '',
      }),
       remove_tag_body: this.$vform({
        body: '',
        tag: '',
      }),
       remove_tag_tag: this.$vform({
        find_tag: '',
        remove_tag: '',
      }),
      change_channel: this.$vform({
        tag: '',
        channel: '',
      }),

    };
  },
  methods: {
    async renameTagName(){
      try {
       await this.rename_tag.post(`admin/batch-tool/tag/rename-tag`, this.rename_tag);
         this.rename_tag.old_tag_name = '';
         this.rename_tag.new_tag_name = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Tag Rename Successfully',
        });
      } catch (e) {}
    },
    async TagDelete(){
      try {
       await this.delete_tag.post(`admin/batch-tool/tag/delete-tag`, this.delete_tag);
         this.delete_tag.delete_tag_name = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Tag Delete Successfully',
        });
      } catch (e) {}
    },
    async removeBodyTag(){
      try {
       const res = await this.remove_tag_body.post(`admin/batch-tool/tag/remove-body-tag`,);
       console.log(res)
         this.remove_tag_body.body = '';
         this.remove_tag_body.tag = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Tag remove Successfully',
        });
      } catch (e) {}
    },

    async removeTagTag(){
      try {
       await this.remove_tag_tag.post(`admin/batch-tool/tag/remove-tag-tag`,);
         this.delete_tag.find_tag = '';
         this.delete_tag.remove_tag = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Tag remove Successfully',
        });
      } catch (e) {}
    },

    async changeChannelName(){
      try {
       await this.change_channel.post(`admin/batch-tool/tag/change-channel`,);
         this.change_channel.tag = '';
         this.change_channel.channel = '';
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Chnnel Change Successfully',
        });
      } catch (e) {}
    },

  },
};
</script>

<style lang="scss" scoped>
  .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-6, .col-sm-7{
    padding: 0px 5px;
  }
</style>


