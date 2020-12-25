<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="renameTagName">
      <div class="form-group row">
        <label for="old_tag_name" class="col-sm-4 col-form-label"
          >Rename tag: for tag</label
        >
        <div class="col-sm-3">
          <base-input
            :form="rename_tag"
            size="form-control-sm"
            field="old_tag_name"
            inputType="text"
            v-model="rename_tag.old_tag_name"
            id="old_tag_name"
            placeholder="Enter Old Text"
          ></base-input>
        </div>
        <div class="col-sm-3">
          <base-input
            :form="rename_tag"
            size="form-control-sm"
            field="new_tag_name"
            inputType="text"
            v-model="rename_tag.new_tag_name"
            id="new_tag_name"
            placeholder="Enter New Text"
          ></base-input>
        </div>
        <div class="col-sm-2">
          <base-button :loading="rename_tag.busy" size="sm" type="dark">
            Rename Tag
          </base-button>
        </div>
      </div>
    </form>
    <form @submit.prevent="TagDelete">
      <div class="form-group row">
        <label for="delete_tag_name" class="col-sm-7 col-form-label"
          >Delete tag: for tag</label
        >
        <div class="col-sm-3">
          <base-input
            :form="delete_tag"
            size="form-control-sm"
            field="delete_tag_name"
            inputType="text"
            v-model="delete_tag.delete_tag_name"
            id="delete_tag_name"
            placeholder="Enter Tag Name"
          ></base-input>
        </div>
        <div class="col-sm-2">
          <base-button :loading="delete_tag.busy" size="sm" type="danger">
            Delete Tag
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
      rename_tag: this.$vform({
        old_tag_name: '',
        new_tag_name: '',
      }),
       delete_tag: this.$vform({
        delete_tag_name: '',
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


  },
};
</script>

<style lang="scss" scoped>
  .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-6, .col-sm-7{
    padding: 0px 5px;
  }
</style>


