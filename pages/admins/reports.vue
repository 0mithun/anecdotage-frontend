<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table table-bordered table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Reason</th>
            <th scope="col">Type</th>
            <th scope="col">Contact</th>
            <th scope="col">Report User</th>
            <th scope="col">Report Item</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.id">
            <th scope="row">{{ report.id }}</th>
            <td>{{ report.reason }}</td>
            <td>{{ report.report_type }}</td>
            <td>{{ report.contact }}</td>
            <td>
              <nuxt-link
                :to="{
                  name: 'profile.show',
                  params: { username: report.report_user.username },
                }"
                target="_blank"
              >
                {{ report.report_user.name }}
              </nuxt-link>
            </td>
            <td>
              <template v-if="report.reported_type == 'Thread'">
                <nuxt-link
                  :to="{
                    name: 'threads.show',
                    params: { slug: report.reported_item.slug },
                  }"
                  target="_blank"
                >
                  {{ report.reported_item.title }}
                </nuxt-link>
              </template>
            </td>
            <td>
              <button
                class="btn btn-danger"
                @click.prevent="deleteReport(report.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :pagination="pageinateData"
        routeName="admin.show.reports"
        :param="{ key: '', value: '' }"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Pagination from '@/components/Pagination';
export default {
  data() {
    return {};
  },
  components: { Pagination },
  head() {
    return {
      title: this.settings.site_title,
    };
  },
  computed: {
    ...mapGetters({
      settings: 'settings',
      reports: 'admin/reports',
      pageinateData: 'admin/pageinateData',
    }),
  },
  methods: {
    async deleteReport(report) {
      try {
        await this.$axios.$delete(`admin/reports/${report}`);
        this.$store.commit('admin/REMOVE_FROM_REPORTS', report);
        this.$toast.open({
          type: 'success',
          position: 'top-right',
          message: 'Report Delete Successfully',
        });
      } catch (error) {}
    },
  },
  watchQuery: true,

  async fetch({ params, query, error, $axios, store, redirect }) {
    const q = await Object.keys(query)
      .map((k) => `${k}=${query[k]}`)
      .join('&');
    try {
      const reportRresponse = await $axios.$get(`admin/reports?${q}`);

      store.commit('admin/SET_REPORTS', reportRresponse.data);
      store.commit('admin/SET_PAGINATE_DATA', reportRresponse.meta);
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'user Not Found' });
      } else if (err.response.status === 403) {
        redirect('/');
      } else if (err.response.status === 429) {
        error({ statusCode: 429, message: 'Too Many Attempt' });
      } else if (err.response.status === 401) {
        redirect('/login');
      } else {
        error({ statusCode: 500, message: 'Server Error' });
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
