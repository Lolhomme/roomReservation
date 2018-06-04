<template>
    
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export class booking extends Vue {
    get rooms() {
        return this.$store.state.rooms
    }
}
</script>

