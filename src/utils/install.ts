import { Vue } from 'vue/types/vue'
import { VueConstructor } from 'vue'
type installPluginKey = '__apis'

export function installPlugin <T extends installPluginKey> (key: T, value: Vue[T]) {
    return function (vm: VueConstructor) {
        vm.mixin({
            beforeCreate () {
                this[key] = value
            }
        })
    }
}
