import moment from 'moment'
import Vue from 'vue';
Vue.filter('date', (value, format = 'YYYY-MM-DD HH:mm') => {
    return moment(value).format(format)
})