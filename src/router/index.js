import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import homePage from '@/components/pages/homePage'
import samplePage from '@/components/pages/samplePage'
import pickMovies from '@/components/pages/pickMovies'
import rankingList from '@/components/pages/rankingList'
import classification from '@/components/pages/classification'
import movieDetail from '@/components/pages/movieDetail'
import actorDetail from '@/components/pages/actorDetail'
import profile from '@/components/pages/profile'
import review from '@/components/pages/review'
import searchResult from '@/components/pages/searchResult'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/samplePage',
      name: 'samplePage',
      component: samplePage
    },
    {
      path: '/pickMovies',
      name: 'pickMovies',
      component: pickMovies
    },
    {
      path: '/rankingList',
      name: 'rankingList',
      component: rankingList
    },
    {
      path: '/classification',
      name: 'classification',
      component: classification
    },
    {
      path: '/review',
      name: 'review',
      component: review
    },
    {
      path: '/movieDetail/:id',
      name: 'movieDetail',
      component: movieDetail
    },
    {
      path: '/actorDetail/:id',
      name: 'actorDetail',
      component: actorDetail
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile
    },
    {
      path: '/searchResult/:str',
      name: 'searchResult',
      component: searchResult
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
