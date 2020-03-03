import Login from '@/views/Login'
import Mode from '@/views/Mode'
import Home from '@/views/Home'
import Chat from '@/components/Chat.vue'

export const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: { hasHeader: false }
  },
  {
    path: '/mode',
    name: 'Mode',
    component: Mode,
    meta: { hasHeader: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { hasHeader: true }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    props: true,
    beforeEnter: (to, from, next) => {
      if (to.params.name) {
        next()
      } else next({ name: 'Login' })
    }
  },

  { path: '*', redirect: { name: 'Login' } }
]
