<template>
    <div class="px-2 mx-lg-2" style="overflow: hidden;">
        <h4 id="name-edit" class="py-0" style="display:flex;">
            <span class="mr-3" style="flex:2">Name: </span>
            <input style="overflow: visible;" placeholder="stretch, drink, rest..." class="timerNameInput" v-model="newName" type="text"/>
        </h4>
        <hr>
         
        <div class="form-group my-0">
            <!-- Type Option -->
            <div class="d-flex mb-3">
                <span class="mr-5"><strong>Type:</strong></span>
                <select v-model="newType">
                        
                        <option :value="reminderTypes.ONCE">Once a day</option>
                        <option :value="reminderTypes.INTERVAL">Interval</option>
                </select>
            </div>
            
            <!-- {{ newType }} -->
            <!-- <hr> -->
            <!-- At/From & Input -->
            <div class="row justify-content-between mb-2">
                <div class="col-4 col-lg-6">
                    <label v-if="newType == reminderTypes.ONCE">At: </label>
                    <label v-else>From: </label>
                </div>
                <div class="col-8 col-lg-6">
                    <input type="time" 
                        class="form-control"
                        placeholder="Select time"
                        v-model="newStartTime"/>
                </div>
            </div>
            <!-- To & Input -->
            <div v-if="newType  == reminderTypes.INTERVAL" class="row justify-content-between mb-2">
                <div class="col-4 col-lg-6">
                    <label>To: </label>
                </div>
                <div class="col-8 col-lg-6">
                    <input type="time" 
                        class="form-control" 
                        placeholder="Select time"
                        v-model="newEndTime"/>
                </div>
            </div>
            <!-- Period Input -->
            <div  v-if="newType == reminderTypes.INTERVAL" class="row justify-content-between mb-2">
                <div class="col-6 col-sm-8">
                    <label>Every (min):</label>
                </div>
                <div class="col-6 col-sm-4">
                    <input type="number" 
                        class="form-control"
                        min="1"
                        max="59"
                        v-model="newPeriod"/>
                </div>
            </div>
            <hr>
            <!-- Type Option -->
            <div class="d-flex mb-3">
                <span class="mr-5"><strong>Regularity:</strong></span>
                <select>
                        
                        <option :value="true">Everyday</option>
                        <option :value="false">Weekly</option>
                        <option :value="false">On Date</option>
                        <option :value="false">Between Dates</option>
                </select>
            </div>
        </div>
        <hr>
        <!-- navigation buttons -->
        <div class="mt-0 mt-lg-2">
            <!-- Back Button -->
            <button class="btn btn-info" @click="$emit('exitEditMode')">
                <i class="fas fa-arrow-left"></i>
            </button>
            <div class="float-right">
                <!-- Save Button -->
                <button class="btn btn-success mr-1" @click="updateReminder(modifiedReminder)">
                    <i class="fas fa-save"></i>
                </button>
                <!-- Delete Button -->
                <button class="btn btn-danger" @click="removeReminder">
                    <i class="fas fa-trash-alt"></i>
                </button>            
            </div>
        </div>    
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import { mapActions } from 'vuex';
// import { mapMutations } from 'vuex';

// const reminderTypes = require('../../../../server/optionTypes');

export default {
    props: ['reminder', 'updateReminder', 'removeReminder'],
    data() {
        return {
            newStartTime: '',
            newEndTime: '',
            newPeriod: 1,
            newName: '',
            newSettings: {},
            // newType: 'Yes',
            // DailyOptions
            newType: 0,
            // dailyOptions: [
            //     {text: 'Once a day', interval: false},
            //     {text: 'Interval', interval: true}
            // ],
            // Weekly/Specific Day Option
            // types: reminderTypes
        }
    },
    computed: {
        ...mapGetters([
            'reminderTypes'
        ]),
        modifiedReminder() {
            return {
                start: this.newStartTime,
                end: this.newEndTime,
                period: Number(this.newPeriod),
                name: this.newName,
                enabled: this.reminder.enabled,
                settings: {
                     type: this.newType
                }
            }
        }
    },
    created() {
        console.log("Created TimerEdit");
        this.newStartTime = this.reminder.start;
        this.newEndTime = this.reminder.end;
        this.newPeriod = this.reminder.period;
        this.newName = this.reminder.name;
        
        this.newType = this.reminder.settings.type;
        // this.newType = this.reminderTypes.ONCE;
    }
}
</script>

<style lang="css" scoped>

    input[type="time"], input[type="number"] {
        font-size:0.9rem;
        border: none;
    }
    input[type='text']:hover {
        color: darkcyan;
    }

    select {
        /* -webkit-appearance: none;
        -moz-appearance : none; */
        background:none;
        border: none;
        /* padding: 0; */
        /* padding-bottom: 0.2em; */
        width: 100%;
    }
    select:hover {
        color:darkcyan;
        background:rgba(184, 129, 11, 0.116);
    }
    select:focus {
        outline: none;
    }

    option:hover {
        border: none;
    }

    hr {
        /* border: 0;
        height: 1px;
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0)); */
        /* height: 12px;
        border: 0;
        box-shadow: inset 0 12px 12px -12px rgba(0, 0, 0, 0.5); */

        border: 0;
        height: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid rgba(255, 166, 0, 0.3);
    }

    #name-edit:hover, #input-edit.input {
        color: darkcyan;
    }

 
</style>

