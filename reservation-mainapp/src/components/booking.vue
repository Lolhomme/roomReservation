<template>
    <div class="container">
        <Steps :current="currentStep">
            <Step title="Pick a date"></Step>
            <Step title="Pick a time"></Step>
            <Step title="How many person?"></Step>
            <Step title="Need a specific equipement?"></Step>
            <Step title="Select a room"></Step>
        </Steps>
        <br>
        <br>
        <Row type="flex" justify="center">
            <Col span="4">
                <DatePicker v-model="searchRoomParams.date" format="ddd-MMMM-dd-yyyy" type="date" placeholder="Select date" size="large" style="width: 100%" @on-change="selectedRoomID = ''" @on-open-change="currentStep = 0" @on-clear="selectedRoom = []"></DatePicker>
            </Col>
        </Row>
        <br>
        <br>
        <Row type="flex" justify="center">
            <Col span="4">
                <TimePicker v-model="searchRoomParams.time" format="HH:mm" type="timerange" placeholder="Select time" size="large" style="width: 100%" @on-change="selectedRoomID = ''" @on-open-change="currentStep = 1"  @on-clear="selectedRoom = []"></TimePicker>
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
                <Select v-model="selectedRoomID" placeholder="Select a room" @on-open-change="currentStep = 4" :disabled="selectState">
                    <Option v-for="e in rooms" :value="e._id" :key="e._id">{{ e.name }}</Option>
                </Select>
            </Col>
        </Row>
        <br>
        <br>
        <Row type="flex" justify="center">
            <Col span="4">
                <Button v-if="formValid()" type="success" @click="modalConfirm" long>VALIDATE</Button>
            </Col>
        </Row>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component
export default class booking extends Vue {

    selectedRoomID:string = ''
    equipements:any = ["Retro Projecteur", "TV"]
    searchRoomParams:any = {
        date: '',
        time: [],
        capacity: 1,
        equipements: [],
    }
    currentStep: number = 0
    save: boolean = false

    get rooms() {
        return this.$store.state.rooms.filter((room: any) => {
            let ret = true
            ret = this.searchRoomParams.capacity > room.capacity ? false : true
            if (this.searchRoomParams.equipements.length > 0) {
                ret = room.equipements.some((e:any) => { return this.searchRoomParams.equipements.indexOf(e.name) !== -1 })
            }
            if (this.timestamp_start !== undefined && this.timestamp_end !== undefined && room.bookedAt.length > 0) {
                for (let i = 0; i < room.bookedAt.length && ret == true; i++) {          
                    if ((this.timestamp_start >= room.bookedAt[i].timestamp_start && this.timestamp_start < room.bookedAt[i].timestamp_end) ||
                    (this.timestamp_end > room.bookedAt[i].timestamp_start  && this.timestamp_end <= room.bookedAt[i].timestamp_end) ||
                    (this.timestamp_start <= room.bookedAt[i].timestamp_start && this.timestamp_end >= room.bookedAt[i].timestamp_end)) {
                        ret = false
                    }
                }
            }
            return ret
        })
    }
    
    get timestamp_start() {
        let timestamp_start
        if (this.searchRoomParams.date !== '' && this.searchRoomParams.time.length > 0) {
            let start = this.searchRoomParams.time[0].split(":")
            let intH = parseInt(start[0])
            let intM = parseInt(start[1])
            let copy = new Date(this.searchRoomParams.date)
            copy.setHours(intH, intM)
            timestamp_start = copy.getTime()
        }
        return timestamp_start
    }
    get timestamp_end() {
        let timestamp_end
        if (this.searchRoomParams.date !== '' && this.searchRoomParams.time.length > 0) {
            let end = this.searchRoomParams.time[1].split(":")
            let intH = parseInt(end[0])
            let intM = parseInt(end[1])
            let copy = new Date(this.searchRoomParams.date)
            copy.setHours(intH, intM)
            timestamp_end = copy.getTime()
        }
        return timestamp_end
    }

    get selectState() {
        if(this.searchRoomParams.date == '' || (this.searchRoomParams.time[0] == '' && this.searchRoomParams.time[1] == '')) {
            this.selectedRoomID = ''
            return true
        }
        else {
            return false
        }
    }

    formValid(){
        if (this.selectedRoomID !== '' && this.searchRoomParams.date !== '' && this.searchRoomParams.time[0] !== '' && this.searchRoomParams.time[1] !== '' && this.searchRoomParams.capacity !== null) {
            return true
        }
        else {
            return false
        }
    }

    modalConfirm(){
        (this as any).$Modal.confirm({
            title: 'Confirmation',
            content: `Do you want book that room?`,
            onOk: () => {
                axios.post(`booking/update/${this.selectedRoomID}/${this.timestamp_start}/${this.timestamp_end}`).then(response => {
                    this.searchRoomParams = {
                        date: '',
                        time: [],
                        capacity: 1,
                        equipements: []
                    },
                    this.selectedRoomID = '',
                    this.currentStep = 0,
                    this.$store.dispatch(`updateAfterSave`, response.data),
                    (this as any).$Message.success('Booking saved')
                })
            },
            onCancel: () => {
                (this as any).$Message.danger('Booking cancel')
            }
        })
    }

    mounted() {
        this.$store.dispatch(`getRoomsFromAPI`)
    }
}
</script>