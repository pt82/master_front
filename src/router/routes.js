const routes = [
  {
    path: "/",
    component: () => import('layouts/DefaultLayout'),
    children: [
      {
        path: '',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/Entries')
      },
      {
        path: '/history-visits',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/HistoryVisits')
      },
      {
        path: '/history-visit',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/HistoryVisit')
      },
      {
        path: '/current-visit',
        meta: {
          requiresAuth: true
        },
        component: () => import('pages/CurrentVisit')
      },
      {
        path: '/profile',
        meta: {
          requiresAuth: true
        },
        component: () => import('layouts/ProfileLayout.vue'),
        children: [
          {
            path: '',
            meta: {
              requiresAuth: true
            },
            component: () => import('pages/Profile')
          },
          {
            path: '/profile/reviews',
            meta: {
              requiresAuth: true
            },
            component: () => import('pages/Reviews')
          },
          {
            path: '/profile/rating',
            meta: {
              requiresAuth: true
            },
            component: () => import('pages/Rating')
          }
        ]
      },
    ]
  },
  {
    path: "/login",
    component: () => import("layouts/AuthLayout"),
    children: [
      {
        path: '',
        component: () => import('pages/Login')
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];


export default routes;
