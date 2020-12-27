<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateLogo" enctype="multipart/form-data">
        <div class="form-group row">
            <label for="site_logo" class="control-label col-sm-3">Select Logo Image</label>
            <div class="col-sm-9">
                <div class="image-placeholder" @click="OpenLogoImgUpload">
                  <img :src="logoThumb" width="100%" >
              </div>
              <input style="display:none" type="file" name="site_logo" id="site_logo" accept="image/*" class="form-control"  @change="onLogoFileSelected">
            </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-9 offset-sm-3">
              <button class="btn btn-primary" :disabled="selectLogoFile == null">Update Logo</button>
          </div>
        </div>
      </form>
    <hr>
      <form @submit.prevent="updateFavicon" enctype="multipart/form-data">
        <div class="form-group row">
            <label for="site_favicon" class="control-label col-sm-3">Select Favicon Image</label>
            <div class="col-sm-9">
                <div class="image-placeholder" @click="OpenFaviconImgUpload">
                  <img :src="faviconThumb" width="100%" >
              </div>
              <input style="display:none" type="file" name="site_favicon" id="site_favicon" accept="image/*" class="form-control"  @change="onFaviconFileSelected">
            </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-9 offset-sm-3">
              <button class="btn btn-primary" :disabled="selectFaviconFile == null">Update Favicon</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      site_logo: null,
      site_favicon: null,
      selectLogoFile: null,
      selectFaviconFile: null
    };
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
    logoThumb(){
      return this.site_logo != null ? this.site_logo : this.settings.logo_path;
    },
    faviconThumb(){
      return this.site_favicon != null ? this.site_favicon : this.settings.favicon_path;
    },
  },
  methods: {
    OpenLogoImgUpload(){
        document.getElementById('site_logo').click();
    },
    onLogoFileSelected(event){
      if (! event.target.files.length) return;
      let file =  event.target.files[0];
      this.selectLogoFile = event.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
          let src = e.target.result;
          this.site_logo = src
      };
    },
    async updateLogo(){
      const formData = new FormData()
      formData.append('site_logo', this.selectLogoFile, this.selectLogoFile.name)
      try{
        const response = await this.$axios.$post('admin/settings/logo', formData)
         this.selectLogoFile = null;
        this.$store.commit('SET_SETTINGS', response)
        this.$toast.open({
          type:'success',
          position: 'top-right',
          message: 'Logo Update Successfully'
        });
      }catch(e){
         if(e.response.status === 422){
          this.$toast.open({
           type:'error',
           position: 'top-right',
           message: e.response.data.errors.site_logo[0]
         });
        }else{
          this.$toast.open({
           type:'error',
           position: 'top-right',
           message: 'Server Error'
         });
        }
        this.selectLogoFile = null;
      }
    },

    OpenFaviconImgUpload(){
        document.getElementById('site_favicon').click();
    },
    onFaviconFileSelected(event){
      if (! event.target.files.length) return;
      let file =  event.target.files[0];
      this.selectFaviconFile = event.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
          let src = e.target.result;
          this.site_favicon = src
      };
    },
    async updateFavicon(){
      const formData = new FormData()
      formData.append('site_favicon', this.selectFaviconFile, this.selectFaviconFile.name)
      try{
        const response = await this.$axios.$post('admin/settings/favicon', formData)
        this.selectFaviconFile = null;
        this.$store.commit('SET_SETTINGS', response)
        this.$toast.open({
          type:'success',
          position: 'top-right',
          message: 'Favicon Update Successfully'
        });
      }catch(e){
        if(e.response.status === 422){
          this.$toast.open({
           type:'error',
           position: 'top-right',
           message: e.response.data.errors.site_favicon[0]
         });
        }else{
          this.$toast.open({
           type:'error',
           position: 'top-right',
           message: 'Server Error'
         });
        }
        this.selectFaviconFile = null;
      }
    }

  },
};
</script>

<style lang="scss" scoped>

.image-placeholder{
    width: 150px;
    height: 150px;
    background-color: #eeeeee;
    /* overflow: hidden; */
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      max-height: stretch;
    }
}
</style>
