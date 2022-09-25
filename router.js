import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const page = path => () => import(`~/pages/${path}`).then(m => m.default || m);

const routes = [
  { path: '/', name: 'index', component: page('index.vue') },
  { path: '/index.php', name: 'index', component: page('aid.vue') },
  { path: '/browse.php', name: 'index', component: page('aid.vue') },
  { path: '/articles/:attribute/:value', name: 'index', component: page('aid.vue') },
  { path: '/faq', name: 'faq', component: page('faq.vue') },
  { path: '/tos', name: 'tos', component: page('tos.vue') },
  { path: '/privacy', name: 'privacy', component: page('privacy.vue') },
  { path: '/delete-account', name: 'delete', component: page('delete.vue') },
  { path: '/contact', name: 'contact', component: page('contact.vue') },
  { path: '/login', name: 'login', component: page('auth/login.vue') },
  { path: '/register', name: 'register', component: page('auth/register.vue') },
  {
    path: '/auth/social-callback',
    name: 'social.callback',
    component: page('auth/socialCallback.vue')
  },
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
    redirect: { name: 'profile.show.about' },
    component: page('users/profile.vue'),
    children: [
      {
        path: '',
        name: 'profile.show.about',
        component: page('users/about.vue')
      },
      {
        path: 'friends',
        name: 'profile.show.friends',
        component: page('users/friends.vue')
      },
      {
        path: 'followings',
        name: 'profile.show.followings',
        component: page('users/followings.vue')
      },
      {
        path: 'posts',
        name: 'profile.show.posts',
        component: page('users/posts.vue')
      },
      {
        path: 'favorites',
        name: 'profile.show.favorites',
        component: page('users/favorites.vue')
      },
      {
        path: 'likes',
        name: 'profile.show.likes',
        component: page('users/likes.vue')
      },
      {
        path: 'subscriptions',
        name: 'profile.show.subscriptions',
        component: page('users/subscriptions.vue')
      }
    ]
  },
  {
    path: '/profile/:username/settings',
    name: 'profile.settings',
    component: page('users/settings/index.vue'),
    children: [
      {
        path: '',
        name: 'profile.settings.info',
        component: page('users/settings/info.vue')
      },
      {
        path: 'avatar',
        name: 'profile.settings.avatar',
        component: page('users/settings/avatar.vue')
      },
      {
        path: 'password',
        name: 'profile.settings.password',
        component: page('users/settings/password.vue')
      },
      {
        path: 'privacy',
        name: 'profile.settings.privacy',
        component: page('users/settings/privacy.vue')
      },
      {
        path: 'search',
        name: 'profile.settings.search',
        component: page('users/settings/searchSettings.vue')
      },
      {
        path: 'notifications',
        name: 'profile.settings.notifications',
        component: page('users/settings/notifications.vue')
      },
      // {
      //   path: 'delete-account',
      //   name: 'profile.settings.delete.account',
      //   component: page('users/settings/delete.vue')
      // }
    ]
  },

  {
    path: '/anecdotes/emojis/:emoji',
    name: 'emojis',
    component: page('emojis/index.vue')
  },
  { path: '/anecdotes/maps', name: 'maps', component: page('maps/index.vue') },
  {
    path: '/anecdotes/search',
    name: 'search',
    component: page('search/index.vue')
  },
  {
    path: '/anecdotes/messanger',
    name: 'chat',
    component: page('chat/index.vue')
  },
  // { path: '/anecdotes/messanger', name: 'chat', component: page('chat/messenger.vue') },
  // { path: '/anecdotes/messanger', name: 'chat', component: page('chat/test.vue') },

  { path: '/anecdotes/tags/:slug', name: 'tags', component: page('tags/index.vue') },
  { path: '/tags/:slug', redirect: { name: 'tags' } },
  {
    path: '/anecdotes/tags/:slug/edit',
    name: 'tag.edit',
    component: page('tags/edit.vue')
  },
  {
    path: '/anecdotes/top-rated',
    name: 'threads.rated',
    component: page('threads/filters/rated.vue')
  },
  {
    path: '/anecdotes/trending',
    name: 'threads.trending',
    component: page('threads/filters/trending.vue')
  },
  {
    path: '/anecdotes/most-viewed',
    name: 'threads.viewed',
    component: page('threads/filters/viewed.vue')
  },
  {
    path: '/anecdotes/newest',
    name: 'threads.recent',
    component: page('threads/filters/recent.vue')
  },
  {
    path: '/anecdotes/last-viewed',
    name: 'threads.last.viewed',
    component: page('threads/filters/lastViewed.vue')
  },
  {
    path: '/anecdotes/closest',
    name: 'threads.closest',
    component: page('threads/filters/closest.vue')
  },
  // {
  //   path: '/anecdotes/video',
  //   name: 'threads.video',
  //   component: page('threads/filters/video.vue')
  // },

  // {
  //   path: '/anecdotes/sort-by-title-length',
  //   name: 'admin.sortbytitle.length',
  //   component: page('admins/sortByTitleLength.vue')
  // },
  {
    path: '/anecdotes/sort-by-title-length',
    name: 'threads.sortbytitle.length',
    component: page('threads/filters/sortByTitleLength.vue')
  },

  {
    path: '/threads/create',
    name: 'threads.create',
    component: page('threads/create.vue')
  },
  {
    path: '/anecdotes/:slug/edit',
    name: 'threads.edit',
    component: page('threads/edit.vue')
  },
  {
    path: '/anecdotes/:slug',
    name: 'threads.show',
    component: page('threads/show.vue')
  },
  {
    path: '/anecdotes/:slug/thumbnail/',
    name: 'threads.thumbnail',
    component: page('threads/thumbnail.vue')
  },
  {
    path: '/books/mexico/pix',
    name: 'pix.index',
    component: page('pix/index.vue')
  },
  {
    path: '/books/mexico/pix/upload',
    name: 'pix.upload',
    component: page('pix/upload.vue')
  },

  {
    path: '/admin',
    name: 'admin.show',
    redirect: { name: 'admin.show.settings' },
    component: page('admins/index.vue'),
    children: [
      {
        path: '',
        name: 'admin.show.settings',
        component: page('admins/settings.vue')
      },
      {
        path: 'logo',
        name: 'admin.show.settings.logo',
        component: page('admins/logo.vue')
      },
      {
        path: 'create-post',
        name: 'admin.show.create.post',
        component: page('admins/createpost.vue')
      },
      {
        path: 'batch-tools',
        name: 'admin.show.batch.tools',
        component: page('admins/batchTools.vue')
      },
      {
        path: 'manage-users',
        name: 'admin.show.manage.users',
        component: page('admins/manageUsers.vue')
      },
      {
        path: 'reports',
        name: 'admin.show.reports',
        component: page('admins/reports.vue')
      },

      {
        path: 'faq',
        name: 'admin.show.faq',
        component: page('admins/faq.vue')
      },
      {
        path: 'terms',
        name: 'admin.show.terms',
        component: page('admins/terms.vue')
      },
      {
        path: 'privacy',
        name: 'admin.show.privacy',
        component: page('admins/privacy.vue')
      },
      {
        path: 'delete-account',
        name: 'admin.show.delete',
        component: page('admins/delete.vue')
      },
    ]
  },

];

export function createRouter() {
  return new Router({
    routes,
    mode: 'history'
  });
}
