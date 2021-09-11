<template>
  <div class="">
      <div class="safe-fearch" v-if="postCounts < totalThreadsCount" >
          <input type="checkbox" value="1" checked @mouseover="showPrivacyModal">
          <label for="safe_search_label" class="safe_search_label">Safe search on (Showing {{ postCounts | formatCount }} of {{ totalThreadsCount | formatCount }}) </label>
      </div>
       <div
        class="modal fade"
        :id="`edit-privacy`"
        tabindex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <template v-if="signedIn">
                  To turn this off, please confirm your age
                </template>
                <template v-else>
                  To turn this off, please create an account and confirm your age.
                </template>
                </h5>
              <button
                type="button"
                class="close"
                aria-label="Close"
                data-dismiss="modal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <template v-if="signedIn">
                <p class="font-14 fw-400 text-center">
                  <a href="#" class="btn btn-success btn-sm " @click.prevent="goToUserPrivacySetting">Goto user settings page</a>
                </p>
              </template>
              <template v-else>
                <p class="font-14 fw-400 text-center">
                  Don't have an account yet?
                  <a href="#" class="color-blue" @click.prevent="goToRegister">
                    Create an account
                  </a>
                </p>
                <p class="font-14 fw-400 text-center">
                  Already have an account?
                  <a href="#" class="color-blue"  @click.prevent="goToLogin"
                    >Login</a
                  >
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>


  </div>
</template>

<script>
import StrPlural from '@/mixins/strPlural'
import formatCount from '@/mixins/formatCount'
import userStatus from '@/mixins/userStatus'
  export default {
    mixins:[StrPlural, formatCount, userStatus],
    props:{
      postCounts: {
        type: Number,
        required: true,
      },
      totalThreadsCount: {
        type: Number,
        required: true,
      },
    },
    methods: {
      showPrivacyModal(){
        $('#edit-privacy').modal('show')
      },
      setRedirectUrl(){
        // let routeData = this.$router.resolve({
        //   name: 'tags',
        //   params: { slug: this.tag.slug },
        // }).href;
        let routeData = this.$nuxt.$route.fullPath;

        localStorage.setItem('privacy-redirect-route', 'profile.settings.search');
        localStorage.setItem('after-login-url', routeData);
      },
      goToLogin(){
        this.setRedirectUrl()
        $('#edit-privacy').modal('hide')
        this.$router.push({name:'login'})
      },
      goToRegister(){
        this.setRedirectUrl()

        $('#edit-privacy').modal('hide')
        this.$router.push({name:'register'})
      },
      goToUserPrivacySetting(){
        this.setRedirectUrl()

        $('#edit-privacy').modal('hide')
        this.$router.push({name:'profile.settings.search', params:{username: this.$auth.user.username}})
      },
    },
  }
</script>

<style lang="scss" scoped>
  label.safe_search_label {
    font-size: 12px;
    margin-left: 5px;
  }

  .safe-fearch {
      display: flex;
      align-items: center;
  }
</style>
