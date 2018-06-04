<template>
    <div class="container">
        <Steps :current="currentStep">
            <Step title="Pick a date"></Step>
            <Step title="Pick a time"></Step>
            <Step title="How many person?"></Step>
            <Step title="Need a specific equipement?"></Step>
            <Step title="Select a room"></Step>
            <Step title="Recap"></Step>
        </Steps>
        <br>
        <br>
        <Row type="flex" justify="center">
            <Col span="4">
                <DatePicker v-model="searchRoomParams.date" format="ddd-MMMM-dd-yyyy" type="date" placeholder="Select date" size="large" style="width: 100%" @on-open-change="currentStep = 0"></DatePicker>
            </Col>
        </Row>
        <br>
        <br>
        <Row type="flex" justify="center">
            <Col span="4">
                <TimePicker v-model="searchRoomParams.time" type="time" placeholder="Select time" size="large" style="width: 100%" @on-open-change="currentStep = 1"></TimePicker>
            </Col>
        </Row>
        <br>
        <br>
        <Row type="flex" justify="center">
            <Col span="2">
                <InputNumber :max="30" :min="1" v-model="searchRoomParams.capacity" style="width: 100%" @on-focus="currentStep = 2"></InputNumber>
            </Col>
        </Row>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class booking extends Vue {

    searchRoomParams: object = {
        date: '',
        time: '',
        capacity: 30,
        equipements: [],
    }
    currentStep: number = 0

    get rooms() {
        return this.$store.state.rooms
    }
    mounted() {
        this.$store.dispatch(`getRoomsFromAPI`)
    }
}
</script>