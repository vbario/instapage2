import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueMask from 'v-mask'
import Meta from 'vue-meta';
import VTooltip from 'v-tooltip'
import wysiwyg from "vue-wysiwyg";

Vue.config.productionTip = false

// This variable will hold the reference to
// document's click handler
let handleOutsideClick
Vue.directive('closable', {
  // created(){}
  bind (el, binding, vnode) {
  	// console.log
    // Here's the click/touchstart handler
    // (it is registered below)
    handleOutsideClick = (e) => {
      e.stopPropagation()
      // Get the handler method name and the exclude array
      // from the object used in v-closable
      const { handler, exclude } = binding.value
      // This variable indicates if the clicked element is excluded
      let clickedOnExcludedEl = false
      if (exclude) {
	      exclude.forEach(refName => {
	        // We only run this code if we haven't detected
	        // any excluded element yet
	        if (!clickedOnExcludedEl) {
	          // Get the element using the reference name
	          const excludedEl = vnode.context.$refs[refName]
	          // See if this excluded element
	          // is the same element the user just clicked on
	          clickedOnExcludedEl = excludedEl ? excludedEl.contains(e.target) : false
	        }
	      })
    	}
      // We check to see if the clicked element is not
      // the dialog element and not excluded
      if (!el.contains(e.target) && !clickedOnExcludedEl) {
        // If the clicked element is outside the dialog
        // and not the button, then call the outside-click handler
        // from the same component this directive is used in
        vnode.context[handler]()
      }
    }
    // Register click/touchstart event listeners on the whole page
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('touchstart', handleOutsideClick)
  },
  unbind () {
    // If the element that has v-closable is removed, then
    // unbind click/touchstart listeners from the whole page
    document.removeEventListener('click', handleOutsideClick)
    document.removeEventListener('touchstart', handleOutsideClick)
  }
})

Vue.use(VueMask);
Vue.use(Meta);

import { setupCalendar, Calendar, DatePicker } from 'v-calendar';
Vue.use(setupCalendar, {})
Vue.use(VTooltip)

Vue.component('VCalendar', Calendar)
Vue.component('VDatePicker', DatePicker)
Vue.use(wysiwyg, {
    // { [module]: boolean (set true to hide) }
    // hideModules: { `bold`: true },
    // you can override icons too, if desired
    // just keep in mind that you may need custom styles in your application to get everything to align
    // iconOverrides: { `bold`: `<i class="your-custom-icon"></i>` },
    // if the image option is not set, images are inserted as base64
    // image: {
    //   uploadURL: `/api/myEndpoint`,
    //   dropzoneOptions: {}
    // },
    // limit content height if you wish. If not set, editor size will grow with content.
    // maxHeight: `500px`
  }
)
// app.use(VCalendar, {})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data: {
  },
  computed: {
  }
})
