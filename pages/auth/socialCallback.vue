<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      token: this.$route.query.token ? this.$route.query.token : null,
    };
  },
  mounted() {
    this.$auth.setToken('local', 'Bearer ' + this.token);
    this.$auth.setStrategy('local');
    this.$auth
      .fetchUser()
      .then(() => {
        return this.$router.push('/');
      })
      .catch((e) => {
        this.$auth.logout();
        let route = this.$route.query.origin
          ? this.$route.query.origin
          : 'register';
        return this.$router.push({ name: route, query: { error: 1 } });
      });
  },
};
</script>

<style lang="scss" scoped>
</style>
