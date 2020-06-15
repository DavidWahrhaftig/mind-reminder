<template>
    <div>
        <h3 class="px-2 py-0 ml-1" style="display:flex;">
            <span class="mr-3" style="flex:2">Name: </span>
            <input style="overflow: visible;" placeholder="timer name..." class="timerNameInput" v-model="newName" type="text"/>
        </h3>
         
        <div class="form-group my-0 row justify-content-center">
            <!-- <div class="col-12">
                <div class="row justify-content-center"> 
                    <label class="col-4 align-self-center">Timer Name: </label>
                    <input v-model="timer.name" class="form-control col-5" type="text"/>
                </div>
            </div> -->
            <div class="col-sm-12 col-lg-4" >
                <label>From: </label>
                <input type="time" 
                class="form-control" 
                placeholder="Select time"
                v-model="newStartTime"/>
            </div>
            <div class="col-sm-12 col-lg-4">
                <label>To:</label>
                <input type="time" 
                class="form-control" 
                placeholder="Select time"
                v-model="newEndTime"/>
            </div>
            <div class="col-sm-6 col-lg-3">
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
        <div class="ml-2">
            <button class="btn btn-success d-inline" @click="save()">
                <i class="fas fa-save"></i>
            </button>
            <button class="btn btn-danger d-inline m-1" @click="removeTimer(index)">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>        
        
    </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    props: ['timer', 'index'],
    data() {
        return {
            newStartTime: '',
            newEndTime: '',
            newPeriod: 1,
            newName: ''
        }
    },
    methods: {
        ...mapMutations ([
            'updateTimer',
            'removeTimer'
        ]),
        save() {
            const newValues = {
                startTime: this.newStartTime,
                endTime: this.newEndTime,
                period: Number(this.newPeriod),
                name: this.newName
                // startTime: this.timer.startTime,
                // endTime: this.timer.endTime,
                // period: Number(this.timer.period),
                // name: this.timer.name
            }
            //  update database 
            this.updateTimer(
                {
                    index: this.index, 
                    timer: newValues
            });
            // trigger save to switch between Edit to Display of timer
            this.$emit("save");
        }
    },
    created() {
        console.log("Created TimerEdit");
        this.newStartTime = this.timer.startTime;
        this.newEndTime = this.timer.endTime;
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

