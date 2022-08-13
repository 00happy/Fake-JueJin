import copy from './copy'
import lazyLoad from './lazyLoad'
const directives = {copy,lazyLoad}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}