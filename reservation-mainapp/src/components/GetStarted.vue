<template>
  <div class="container">
    <Row type="flex" justify="center"> 
      <!-- <Col span=""></Col> -->
        <Col span="16">
          <img src="../assets/stationf-og-image.jpg">
        </Col>
    </Row>
    <br>
    <Row type="flex" justify="center">
      <Col span="16">
          <Button type="info" shape="circle" size="large" @click="$router.push(`rooms`)">Get started</Button>
      </Col>
    </Row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GetStarted extends Vue {}
</script>
<style>
img {
  height: auto;
  width: 100%;
}
</style>


