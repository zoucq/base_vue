import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld/index.vue'

@Component({
    components: {
        HelloWorld
    }
})
export default class Home extends Vue {
}
