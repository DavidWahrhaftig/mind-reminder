<template>
    <div class="mx-2 mx-lg-2" style="overflow: hidden;">
        <h3 class="py-0" style="display:flex;">
            <span class="mr-3" style="flex:2">Name: </span>
            <input style="overflow: visible;" placeholder="timer name..." class="timerNameInput" v-model="newName" type="text"/>
        </h3>
         
        <div class="form-group my-0 row justify-content-start">
            <div class="col-12 col-xl-4  pr-xl-0" >
                <label>From: </label>
                <input type="time" 
                class="form-control" 
                placeholder="Select time"
                v-model="newStartTime"/>
            </div>
            <div class="col-12 col-xl-4 pr-xl-0">
                <label>To:</label>
                <input type="time" 
                class="form-control" 
                placeholder="Select time"
                v-model="newEndTime"/>
            </div>
            <div class="col-6 col-xl-4">
                <label>Every:</label>
                <div>
                    <input class="form-control" type="number" min="0" max="59" 
                           v-model="newPeriod">
                </div>
                <div>
                    min
                </div>
            </div>           
        </div>
            <!-- <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6-offset-3 form-group">
                <label for="enabled">
                    <input 
                        type="radio" 
                        id="enabled"
                        value="Enabled"
                        v-model="activityStatus"> Enabled
                </label>
                <label for="disabled">
                    <input 
                        type="radio" 
                        id="disabled"
                        value="Disabled"
                        v-model="activityStatus"> Disabled
                </label>
            </div> -->
        <div class="float-right mt-0 mt-lg-2">
            <button class="btn btn-success mr-1" @click="updateTimer(editedTimer)">
                <i class="fas fa-save"></i>
            </button>
            <button class="btn btn-danger" @click="removeTimer">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>        
        
    </div>
</template>

<script>
// import { mapActions } from 'vuex';
// import { mapMutations } from 'vuex';

export default {
    props: ['timer', 'updateTimer', 'removeTimer'],
    data() {
        return {
            newStartTime: '',
            newEndTime: '',
            newPeriod: 1,
            newName: ''
        }
    },
    computed: {
        editedTimer() {
            return {
                start: this.newStartTime,
                end: this.newEndTime,
                period: Number(this.newPeriod),
                name: this.newName,
                enabled: this.timer.enabled
            }
        }
    },
    methods: {
        // ...mapActions([
        //     'update',
        //     'remove',
        //     'getTimers'
        // ]),
        // async updateTimer() {
        //     const updatedTimer = {
        //         start: this.newStartTime,
        //         end: this.newEndTime,
        //         period: Number(this.newPeriod),
        //         name: this.newName,
        //         enabled: this.timer.enabled
        //     }
        //     //  update database 
        //     await this.update(
        //         {
        //             id: this.timer._id,
        //             timer: updatedTimer
        //     });

        //     // get timers
        //     await this.getTimers();

        //     // // trigger save to switch between Edit to Display of timer
        //     // this.$emit("save");
        // },
        // async removeTimer() {
        //     // let res = await remove(this.timer._id);
        // }
    },
    created() {
        console.log("Created TimerEdit");
        this.newStartTime = this.timer.start;
        this.newEndTime = this.timer.end;
        this.newPeriod = this.timer.period;
        this.newName = this.timer.name;
    }
}
</script>

<style lang="css" scoped>

    input[type="time"], input[type="number"] {
        font-size:0.9rem;
    } 
</style>

