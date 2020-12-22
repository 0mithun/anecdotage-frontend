import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m);

const routes = [
  { path: '/', name: 'index', component: page('index.vue') },
  { path: '/login', name: 'login', component: page('auth/login.vue') },
  { path: '/register', name: 'register', component: page('auth/register.vue') },
  {
    path: '/verification/verify/:id',
    name: 'verify',
    component: page('auth/verification/verify.vue')
  },
  {
    path: '/verification/resend',
    name: 'verification.resend',
    component: page('auth/verification/resend.vue')
  },
  {
    path: '/password/email',
    name: 'password.email',
    component: page('auth/password/reset-email.vue')
  },
  {
    path: '/password/reset/:token',
    name: 'password.reset',
    component: page('auth/password/password-reset.vue')
  },
  {
    path: '/profile/:username',
    name: 'profile.show',
    component: page('users/profile.vue')
  },

  { path: '/anecdotes/emojis/:emoji', name: 'emojis', component: page('emojis/index.vue') },

  { path: '/tags/:slug', name: 'tags', component: page('tags/index.vue') },
  { path: '/anecdotes/rated', name: 'threads.rated', component: page('threads/filters/rated.vue') },
  { path: '/anecdotes/trending', name: 'threads.trending', component: page('threads/filters/trending.vue') },
  { path: '/anecdotes/viewed', name: 'threads.viewed', component: page('threads/filters/viewed.vue') },
  { path: '/anecdotes/recent', name: 'threads.recent', component: page('threads/filters/recent.vue') },
  { path: '/anecdotes/closest', name: 'threads.closest', component: page('threads/filters/closest.vue') },
  { path: '/anecdotes/video', name: 'threads.video', component: page('threads/filters/video.vue') },

  { path: '/threads/:slug', name: 'threads.show', component: page('threads/show.vue') },
  { path: '/threads/:slug/edit', name: 'threads.edit', component: page('threads/edit.vue') },
  { path: '/thread/create', name: 'threads.create', component: page('threads/create.vue') },
  { path: '/thread/:slug/thumbnail/', name: 'threads.thumbnail', component: page('threads/thumbnail.vue') },


];

export function createRouter() {
  return new Router({
    routes,
    mode: 'history'
  });
}
