<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="threadSearchReplaceTitle">
      <div class="form-group row">
        <label for="replace_title_old" class="col-sm-4 col-form-label"
          >Thread body search & replace: every thread, in body replace</label
        >
        <div class="col-sm-3">
          <base-input
            :form="replace_title"
            size="form-control-sm"
            field="replace_title_old"
            inputType="text"
            v-model="replace_title.replace_title_old"
            id="replace_title_old"
            placeholder="Enter Old Text"
          ></base-input>
        </div>
        <div class="col-sm-3">
          <base-input
            :form="replace_title"
            size="form-control-sm"
            field="replace_title_new"
            inputType="text"
            v-model="replace_title.replace_title_new"
            id="replace_title_new"
            placeholder="Enter New Text"
          ></base-input>
        </div>
        <div class="col-sm-2">
          <base-button :loading="replace_title.busy" size="sm" type="dark">
            Replace
          </base-button>
        </div>
      </div>
    </form>
     <form @submit.prevent="threadSearchReplaceBody">
      <div class="form-group row">
        <label for="replace_body_old" class="col-sm-4 col-form-label"
          >Thread body search & replace: every thread, in body replace</label
        >
        <div class="col-sm-3">
          <base-input
            :form="replace_body"
            size="form-control-sm"
            field="replace_body_old"
            inputType="text"
            v-model="replace_body.replace_body_old"
            id="replace_body_old"
            placeholder="Enter Old Text"
          ></base-input>
        </div>
        <div class="col-sm-3">
          <base-input
            :form="replace_body"
            size="form-control-sm"
            field="replace_body_new"
            inputType="text"
            v-model="replace_body.replace_body_new"
            id="replace_body_new"
            placeholder="Enter New Text"
          ></base-input>
        </div>
        <div class="col-sm-2">
          <base-button :loading="replace_body.busy" size="sm" type="dark">
            Replace
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
      replace_title: this.$vform({
        replace_title_old: '',
        replace_title_new: '',
      }),
       replace_body: this.$vform({
        replace_body_old: '',
        replace_body_new: '',
      }),



    };
  },
  methods: {
    async threadSearchReplaceTitle(){
      try {
       await this.replace_title.post(`admin/batch-tool/threads/threads-replace-title`, this.replace_title);
         this.replace_title.replace_title_old = ''
         this.replace_title.replace_title_new = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads Title Replace Successfully',
        });
      } catch (e) {}
    },
    async threadSearchReplaceBody(){
      try {
       await this.replace_body.post(`admin/batch-tool/threads/threads-replace-body`, this.replace_body);
         this.replace_body.replace_body_old = ''
         this.replace_body.replace_body_new = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads body Replace Successfully',
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


