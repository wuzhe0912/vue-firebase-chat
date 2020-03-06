import Login from '@/views/Login'
import Mode from '@/views/Mode'
import Chat from '@/views/Chat'
import Register from '@/views/Register'
import Home from '@/views/Home'

export const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { hasHeader: false, hasChat: false }
  },
  {
    path: '/mode',
    name: 'Mode',
    component: Mode,
    meta: { hasHeader: true, hasChat: false }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: { hasHeader: true, hasChat: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { hasHeader: true, hasChat: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { hasHeader: true }
  },
  // {
  //   path: '/chat',
  //   name: 'Chat',
  //   component: Chat,
  //   props: true,
  //   beforeEnter: (to, from, next) => {
  //     if (to.params.name) {
  //       next()
  //     } else next({ name: 'Login' })
  //   }
  // },

  { path: '*', redirect: { name: 'Login' } }
]
