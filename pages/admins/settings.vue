<template>
  <div class="row">
    <div class="col-md-12">
      <form @submit.prevent="updateInfo">
        <div class="form-group row">
          <label for="site_name" class="col-sm-4 col-form-label"
            >Site name</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="site_name"
              placeholder="Site Name"
              v-model="form.site_name"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="site_title" class="col-sm-4 col-form-label"
            >Site Title</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="site_title"
              placeholder="Site Title"
              v-model="form.site_title"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="default_email_address" class="col-sm-4 col-form-label"
            >Default Email Address</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="default_email_address"
              placeholder="Default Email Address"
              v-model="form.default_email_address"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="footer_copyright_text" class="col-sm-4 col-form-label"
            >Footer Copyright Text</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="footer_copyright_text"
              placeholder="Footer Copyright Text"
              v-model="form.footer_copyright_text"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="seo_meta_title" class="col-sm-4 col-form-label"
            >Seo Meta Title</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="seo_meta_title"
              placeholder="Seo Meta Title"
              v-model="form.seo_meta_title"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="seo_meta_description" class="col-sm-4 col-form-label"
            >Seo Meta Description</label
          >
          <div class="col-sm-8">
            <textarea
              cols="30"
              rows="2"
              class="form-control"
              id="seo_meta_description"
              placeholder="Seo Meta Description"
              v-model="form.seo_meta_description"
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label for="seo_meta_keyword" class="col-sm-4 col-form-label"
            >Seo Meta Keyword</label
          >
          <div class="col-sm-8">
            <textarea
              cols="30"
              rows="2"
              class="form-control"
              id="seo_meta_keyword"
              placeholder="Seo Meta Keyword"
              v-model="form.seo_meta_keyword"
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label for="social_facebook" class="col-sm-4 col-form-label"
            >Social Facebook</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="social_facebook"
              placeholder="Social Facebook"
              v-model="form.social_facebook"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="social_twitter" class="col-sm-4 col-form-label"
            >Social Twitter</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="social_twitter"
              placeholder="Social Twitter"
              v-model="form.social_twitter"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="social_instagram" class="col-sm-4 col-form-label"
            >Social Instagram</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="social_instagram"
              placeholder="Social Instagram"
              v-model="form.social_instagram"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="social_linkedin" class="col-sm-4 col-form-label"
            >Social Linkedin</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="social_linkedin"
              placeholder="Social Linkedin"
              v-model="form.social_linkedin"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="social_patreon" class="col-sm-4 col-form-label"
            >Social Patreon</label
          >
          <div class="col-sm-8">
            <input
              type="text"
              class="form-control"
              id="social_patreon"
              placeholder="Social Patreon"
              v-model="form.social_patreon"
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="google_analytics" class="col-sm-4 col-form-label"
            >Google Analytics</label
          >
          <div class="col-sm-8">
            <textarea
              cols="30"
              rows="2"
              class="form-control"
              id="google_analytics"
              placeholder="Google Analytics"
              v-model="form.google_analytics"
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <label for="facebook_pixels" class="col-sm-4 col-form-label"
            >Facebook Pixels</label
          >
          <div class="col-sm-8">
            <textarea
              cols="30"
              rows="2"
              class="form-control"
              id="facebook_pixels"
              placeholder="Facebook Pixels"
              v-model="form.facebook_pixels"
            ></textarea>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-8 offset-sm-4">
            <BaseButton :loading="form.busy"> Update </BaseButton>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import updateSettings from '@/mixins/admin/updateSettings'
import BaseButton from '@/components/form/buttons/BaseButton'
export default {
  components:{
    BaseButton
  },
  mixins: [updateSettings],
  data() {
    return {
      form: this.$vform({
        site_name: '',
        site_title: '',
        default_email_address: '',
        footer_copyright_text: '',
        seo_meta_title: '',
        seo_meta_description: '',
        seo_meta_keyword: '',
        social_facebook: '',
        social_twitter: '',
        social_instagram: '',
        social_linkedin: '',
        social_patreon: '',
        google_analytics: '',
        facebook_pixels: '',
      }),
      message: 'Settings Update Successfully',
      ckEditor: true
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
