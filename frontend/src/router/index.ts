import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './routes'

import CheckAuth from '@/middleware/CheckAuth'
import PermissionGate from '@/Gate/PermissionGate'
import AppGate from '@/Gate/AppGate'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(AppGate)
router.beforeEach(CheckAuth)
router.beforeEach(PermissionGate)

export default router
