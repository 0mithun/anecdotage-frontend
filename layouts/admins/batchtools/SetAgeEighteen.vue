<template>
  <div class="border-bottom mt-2">
    <form @submit.prevent="age18TitleUpdate">
      <div class="form-group row">
        <label for="title_18" class="col-sm-6 col-form-label"
          >Set age 18 : if thread title contains</label
        >
        <div class="col-sm-4">
          <base-input
            :form="age_18_title"
            size="form-control-sm"
            field="title_18"
            inputType="text"
            v-model="age_18_title.title_18"
            id="title_18"
            placeholder="Enter Title Text"
          ></base-input>
        </div>
        <div class="col-sm-2">
          <base-button :loading="age_18_title.busy" size="sm" type="dark">
            set age 18+
          </base-button>
        </div>
      </div>
    </form>

    <form @submit.prevent="age18BodyUpdate">
      <div class="form-group row">
        <label for="body_18" class="col-sm-6 col-form-label"
          >Set age 18 : if thread body contains</label
        >
        <div class="col-sm-4">
          <base-input
            :form="age_18_body"
            size="form-control-sm"
            field="body_18"
            inputType="text"
            v-model="age_18_body.body_18"
            id="body_18"
            placeholder="Enter Title Text"
          ></base-input>
        </div>
        <div class="col-sm-2">
          <base-button :loading="age_18_body.busy" size="sm">
            set age 18+
          </base-button>
        </div>
      </div>
    </form>


    <form @submit.prevent="age18TagUpdate">
      <div class="form-group row">
        <label for="tag_18" class="col-sm-6 col-form-label"
          >Set age 18 : if thread has tag</label
        >
        <div class="col-sm-4">
          <base-input
            :form="age_18_tag"
            size="form-control-sm"
            field="tag_18"
            inputType="text"
            v-model="age_18_tag.tag_18"
            id="tag_18"
            placeholder="Enter tag name"
          ></base-input>
        </div>
        <div class="col-sm-2">
          <base-button :loading="age_18_tag.busy" size="sm" type="success">
            set age 18+
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
      age_18_title: this.$vform({
        title_18: '',
      }),
      age_18_body: this.$vform({
        body_18: '',
      }),
      age_18_tag: this.$vform({
        tag_18: '',
      }),


    };
  },
  methods: {
    async age18TitleUpdate(){
      try {
       await this.age_18_title.post(`admin/batch-tool/threads/set-age-eighteen-threads-title`, this.age_18_title);
         this.age_18_title.title_18 = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads set age 18 Successfully',
        });
      } catch (e) {}
    },
    async age18BodyUpdate(){
      try {
        await this.age_18_body.post(`admin/batch-tool/threads/set-age-eighteen-threads-body`, this.body_18);
         this.age_18_body.body_18 = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads set age 18 Successfully',
        });
      } catch (e) {}
    },

     async age18TagUpdate(){
      try {
        await this.age_18_tag.post(`admin/batch-tool/threads/set-age-eighteen-threads-tag`, this.tag_18);
         this.age_18_tag.tag_18 = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads set age 18 Successfully',
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


