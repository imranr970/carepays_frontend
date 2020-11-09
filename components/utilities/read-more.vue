<template>
    <div>
        <span v-if="!activated">
            {{item.slice(0, this.length)}}
            <a href="#" @click.prevent="activate" class="text--sm">more</a>
        </span>
        <span v-else>
            {{item}} <a href="#" @click.prevent="activate" class="text--sm">less</a>
        </span>
    </div>
</template>

<script>
export default {
    
    props: {
        item: {
            required: true,
            type: String
        },
        length: {
            default: '30',
            type: String
        }
    },

    data() {
        return {
            activated: false
        }
    },
    methods: {
        activate() {
            this.activated = !this.activated
        }
    }
}
</script>
