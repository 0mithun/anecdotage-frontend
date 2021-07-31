<template>
  <div class="border-bottom">
    <form @submit.prevent="age13TitleUpdate">
      <div class="form-group row">
        <label for="title_13" class="col-sm-6 col-form-label"
          >Set age 13 : if thread title contains</label
        >
        <div class="col-sm-4">
          <BaseInput
            :form="age_13_title"
            size="form-control-sm"
            field="title_13"
            inputType="text"
            v-model="age_13_title.title_13"
            id="title_13"
            placeholder="Enter Title Text"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="age_13_title.busy" size="sm" type="dark">
            set age 13+
          </BaseButton>
        </div>
      </div>
    </form>

    <form @submit.prevent="age13BodyUpdate">
      <div class="form-group row">
        <label for="body_13" class="col-sm-6 col-form-label"
          >Set age 13 : if thread body contains</label
        >
        <div class="col-sm-4">
          <BaseInput
            :form="age_13_body"
            size="form-control-sm"
            field="body_13"
            inputType="text"
            v-model="age_13_body.body_13"
            id="body_13"
            placeholder="Enter Title Text"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="age_13_body.busy" size="sm">
            set age 13+
          </BaseButton>
        </div>
      </div>
    </form>


    <form @submit.prevent="age13TagUpdate">
      <div class="form-group row">
        <label for="tag_13" class="col-sm-6 col-form-label"
          >Set age 13 : if thread has tag</label
        >
        <div class="col-sm-4">
          <BaseInput
            :form="age_13_tag"
            size="form-control-sm"
            field="tag_13"
            inputType="text"
            v-model="age_13_tag.tag_13"
            id="tag_13"
            placeholder="Enter tag name"
          ></BaseInput>
        </div>
        <div class="col-sm-2">
          <BaseButton :loading="age_13_tag.busy" size="sm" type="success">
            set age 13+
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
      age_13_title: this.$vform({
        title_13: '',
      }),
      age_13_body: this.$vform({
        body_13: '',
      }),
      age_13_tag: this.$vform({
        tag_13: '',
      }),


    };
  },
  methods: {
    async age13TitleUpdate(){
      try {
        await this.age_13_title.post(`admin/batch-tool/threads/set-age-thirteen-threads-title`, this.age_13_title);
         this.age_13_title.title_13 = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads set age 13 Successfully',
        });
      } catch (e) {}
    },
    async age13BodyUpdate(){
      try {
        await this.age_13_body.post(`admin/batch-tool/threads/set-age-thirteen-threads-body`, this.body_13);
         this.age_13_body.body_13 = ''
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Threads set age 18 Successfully',
        });
      } catch (e) {}
    },

     async age13TagUpdate(){
      try {
        await this.age_13_tag.post(`admin/batch-tool/threads/set-age-thirteen-threads-tag`, this.tag_13);
         this.age_13_tag.tag_13 = ''
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


