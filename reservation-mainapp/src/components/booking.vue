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
                <TimePicker v-model="searchRoomParams.time" format="HH:mm" type="timerange" placeholder="Select time" size="large" style="width: 100%" @on-open-change="currentStep = 1"></TimePicker>
            </Col>
        </Row>
        <br>
        <br>
        <Row type="flex" justify="center">
            <Col span="4">
                <InputNumber :max="30" :min="1" v-model="searchRoomParams.capacity" style="width: 100%" @on-focus="currentStep = 2"></InputNumber>
            </Col>
        </Row>
        <br>
        <br>
        <Row type="flex" justify="center">
            <Col span="4">
                <Select v-model="searchRoomParams.equipements" placeholder="Select an equipement" multiple @on-open-change="currentStep = 3">
                    <Option v-for="e in equipements" :value="e" :key="e">{{ e }}</Option>
                </Select>
            </Col>
        </Row>
        <br>
        <br>
        <Row type="flex" justify="center">
            <Col span="4">
                <Select v-model="selectedRoom" placeholder="Select a room" @on-open-change="currentStep = 3">
                    <Option v-for="e in rooms" :value="e._id" :key="e._id">{{ e.name }}</Option>
                </Select>
            </Col>
        </Row>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class booking extends Vue {

    selectedRoom:any = []
    equipements:any = ["Retro Projecteur", "TV"]
    searchRoomParams:any = {
        date: '',
        time: [],
        capacity: 1,
        equipements: [],
    }
    currentStep: number = 0

    get rooms() {
        return this.$store.state.rooms.filter(this.filterMethod)
    }
    get timestamp_start() {
        let timestamp_start
        if (this.searchRoomParams.date !== '' && this.searchRoomParams.time.length > 0) {
            let start = this.searchRoomParams.time[0].split(":")
            let intH = parseInt(start[0])
            let intM = parseInt(start[1])

            /* generate invalid date error in vue dev tool */
            
            // let copy = this.searchRoomParams.date
            // timestamp_start = copy.setHours(intH, intM)
        }
        return timestamp_start
    }

    filterMethod(room: any) {
        if (this.searchRoomParams.date !== '' && room.bookedAt.length > 0) {
            for (var i = 0; i < room.bookedAt.length; i++) {          
                if (this.searchRoomParams.date == room.bookedAt[i].date/*  && (this.searchRoomParams.time[0] >= room.bookedAt[i].startAt && this.searchRoomParams.time[0] < room.bookedAt[i].endAt) */) {
                    return false
                }
                else {
                    return true
                }
            }
        }
        else {
            return true
        }
    }
    mounted() {
        this.$store.dispatch(`getRoomsFromAPI`)
    }
}
</script>