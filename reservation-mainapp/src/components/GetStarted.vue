<template>
  <div class="container">
    <Row class="row">
      <Col span="4"></Col>
    </Row>
    <Row>
      <Col span="3"><router-link to="rooms">Get started</router-link></Col>
    </Row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GetStarted extends Vue {
    
}
</script>
<style>
</style>


