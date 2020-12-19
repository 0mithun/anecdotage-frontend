<template>
  <div class="container">
    <div class="card card-m-5">
       <div class="card-header">
         <div class="left float-left">
          Add an Image
         </div>
          <div class="right float-right">
            <button class="btn btn-success btn-lg" type="button" @click.prevent="skip">Skip</button>
          </div>
        </div>
      <div class="card-body">
        <div class="row justify-content-center align-items-center text-center">
          <div class="col-md-6">
            <div class="card bg-white shadow-sm">
              <div class="d-flex flex-column justify-content-center p-1">
                <div class="alert alert-danger" v-if="error">
                  <p>An error occurred during the upload process</p>
                  <p>{{ error }}</p>
                </div>
                <slim-cropper :options="slimOptions" :src="src">
                  <input type="file" name="image" />
                </slim-cropper>
                <div class="text-success caption-sm mt-2" v-if="uploading" >
                  <i class="fas fa-spinner fa-spin"></i>
                </div>
              </div>
            </div>
            <div class="upload-para mt-2">
              <p class="font-14 fw-400">
                Your image dimensions must be at least 800px x 600px in size.
                Also the image size should be a maximum of 2MB. Please resize
                your file accordingly before you upload.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>

    <div class="card card-m-5">
      <div class="card-header">
Or Enter Image link
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-12">
            <form action="" @submit.prevent="imageDescriptionSubmit">
                <div class="col-md-6">

                    <div class="form-group ">
                        <label for="wiki_info_page_url" class="control-label"> Enter Image link </label>
                        <input type="text" id="wiki_info_page_url" class="form-control" v-model="form.temp_image_url">
                    </div>
                    <div class="form-group" v-if="form.temp_image_url !=''">
                        <label for="">
                            <input type="checkbox" v-model="form.image_copyright_free" >
                            This image is copyright-free (or the description includes license information)
                        </label>
                        <span class="help-block error" v-if="form.temp_image_url && !form.image_copyright_free">Please confirm your right to post this image.</span>
                    </div>

                    <div class="form-group ">
                        <label for="temp_image_description" class="control-label"> Image description</label>
                        <textarea name=""  cols="30" rows="2"  class="form-control" id="temp_image_description" v-model="form.temp_image_description"></textarea>
                    </div>
                    <div class="form-group">
                      <button class="btn btn-primary btn-block" :disabled="form.temp_image_url && !form.image_copyright_free">Save</button>
                    </div>
                </div>

              </form>
          </div>
        </div>
      </div>
    </div>

      <!-- Modal -->
      <div class="modal fade " id="shareThreadModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog modal-sm" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title" id="myModalLabel">Share article on social media</h4>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                  </div>
                  <div class="modal-body">
                      <div class="form-group">
                          <div class="checkbox">
                              <label><input type="checkbox" value="1" name="share_on_facebook" v-model="share_on_facebook">Share on Facebook</label>
                          </div>
                          <div class="checkbox">
                              <label><input type="checkbox" value="1" name="share_on_twitter" v-model="share_on_twitter">Share on Twitter</label>
                          </div>
                      </div>
                  </div>
                  <div class="modal-footer">
                      <button class="btn btn-default btn-sm" type="button" @click.prevent="closeShareModal">close</button>
                      <button class="btn btn-primary btn-sm" type="button" @click.prevent="shareThread">Share</button>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Slim from '@/components/slim/slim.vue'
export default {
  middleware: ['auth'],
  components:{
    'slim-cropper': Slim
  },
  data(){
    return{
      slimOptions:{
        service: this.slimService,
        post:'output',
        defaultInputName:'image',
        minSize:'200,300',
        label:'Select image...',
        maxFileSize:2,

      },
      uploading:false,
      error:'',
      form: {
        temp_image_url: '',
        image_copyright_free: '',
        temp_image_description: '',
      },
      share_on_facebook:false,
      share_on_twitter:false,
    }
  },
  computed:{
    thread(){
      return this.$store.state.threads.thread;
    },
    src(){
      return this.$store.state.threads.thread.thread_image_path;
    }
  },
  methods:{
    slimService(formdata, progress, success, failure, slim){
      this.uploading = true;
      this.$axios.post(`threads/${this.thread.slug}/thumbnail`, formdata)
        .then(res=>{
          console.log(res)
          // this.$router.push({name:'designs.edit',params:{id:res.data.id}})

        }).catch(err=>{
          const message = err.response.data.errors;
          this.error = message[Object.keys(message)[0]][0]
          failure(500)
        })
        .finally(()=> {
          this.uploading = false;
          $('#shareThreadModal').modal('show');
        })
    },
    imageDescriptionSubmit(){
      this.$axios.$put(`threads/${this.thread.slug}/imageDescription`, this.form).then(res=>{
        $('#shareThreadModal').modal('show');
      }).catch(err=>{

      })
    },
    shareThread(){
      axios.post('/thread/share', {
          thread: this.thread.id,
          share_on_facebook:this.share_on_facebook,
          share_on_twitter:this.share_on_twitter,
      }).then(res=>{
          $('#shareThreadModal').modal('hide');
          window.location = this.thread.path
      }).catch(err=>{

      })
    },
    closeShareModal(){
        $('#shareThreadModal').modal('hide');
       this.$router.push({name:'threads.show', params:{slug: this.thread.slug}});
    },
    skip(){
      this.$axios.$put(`threads/${this.thread.slug}/skipThumbnailEdit`).then(res=>{
        this.$router.push({name:'threads.show', params:{slug: this.thread.slug}});
      })
    }
  },
  async fetch({ params, query, error, $axios, store }) {
    try {
      const threadRresponse = await $axios.$get(`threads/${params.slug}`);
      // return { thread: threadRresponse.data};
      store.commit('threads/setCurrentThread', threadRresponse.data)

    } catch (err) {
      if(err.response.status === 404){
        error({statusCode : 404, message:'Thread Not Found'})
      }else if(err.response.status === 429){
        error({statusCode : 429, message:'Too Many Attempt'})
      }else if(err.response.status === 401){
        redirect('/login');
      }else{
        error({statusCode : 500, message:'Server Error'})
      }
    }
  },
};
</script>

<style></style>
