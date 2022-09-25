<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div></div>
        <div class="card card-m-5">
          <div class="card-body" >
              <form @submit.prevent="save">
                <div class="form-group">
                  <label for="image">Image <span class="required">*</span> </label> <br>
                    <input ref="imageInput" @change="fileChange" type="file" name="" id="image" accept="image/jpg, image/jpeg" :class="[{ 'is-invalid': form.errors.has('description') }]">
                </div>
                <div class="form-group">
                  <label for="description" class="form-label" >Description <span class="required">*</span> </label>
                    <textarea class="form-control" id="description" cols="30" rows="5" v-model="form.description" :class="[{ 'is-invalid': form.errors.has('image') }]"></textarea>
                </div>
                <div class="form-group">
                  <button type="submit" class="btn btn-primary">Save</button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {serialize} from 'object-to-formdata'
  export default {
    data(){
      return {
        form: this.$vform({
          description: '',
          image: null
        }),
      }
    },
    methods: {
      async save(){
        // console.log('save')
        // console.log(this.form)
        try {
          const res = await this.form.post('/pix/upload',{
              transformRequest: [ function (data, headers) {
                return serialize(data)
              }],
            })
          this.$refs.imageInput.value = null
          this.form.reset();

          this.$toast.open({
            type:'success',
            position: 'top-right',
            message: 'Image upload Successfully'
          });
        } catch (error) {
          console.log(error)
        }
      },
      fileChange(event){
        const file = event.target.files[0]

        // Set the file object onto the form...
        this.form.image = file
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
