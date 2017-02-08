import Vue from 'vue'
import App from './App'
import store from './store';

/* eslint-disable no-new */
new Vue({
    data: function() {
        return {
            val: 'hi'
        };
    },
    el: '#app',
    store,
    components: { App },
    render: h => h(App)
});
