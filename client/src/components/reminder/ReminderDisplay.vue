<template>
        <div class="row mx-4 py-0">
            <div class="col-9">
                <h4 class="row">
                    {{ reminder.name }}
                </h4>
                <div class="row ">
                    <!-- Reminder Settings -->
                    <div class="col-12 px-0" v-if="isInterval">
                        From <span class="settings">{{ reminder.start }}</span> 
                        To <span class="settings">{{ reminder.end }}</span> 
                        Every <span class="settings">{{ reminder.period }}</span> min
                    </div>
                    <div class="col-12 px-0" v-else>    
                        Remind at <span class="settings"> {{ reminder.start }} </span>
                    </div>
                    
                    <h2 class="col-12 p-1 align-self-center"
                        v-if="showTimer">
                        {{ displayTimeRemaining }}
                    </h2>
                    <h4 class="col-12 align-self-center"
                        v-if="!showTimer && reminder.enabled && isInterval">
                        {{ statusMessage }}
                    </h4>
                    <h2 class="col-12"
                        v-if="!reminder.enabled">
                        <i class="fas fa-ban"></i>
                    </h2>
                </div>
            </div>
            <!-- Edit Button and On Switch -->
            <div class="col-3 pr-0 align-self-center">
                <button class=" row btn btn-sm btn-warning text-light m-0 mb-2 btn-block" 
                        @click="$emit('enterEditMode')">
                    <i class="fas fa-edit"></i>
                </button>
                <div class="onoffswitch">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" :id="`myonoffswitch${reminder._id}`" tabindex="0" 
                        v-model="enabled">
                    <label class="onoffswitch-label" :for="`myonoffswitch${reminder._id}`">
                        <span class="onoffswitch-inner"></span>
                        <!-- <span class="onoffswitch-switch"></span> -->
                    </label>
                </div>
            </div>
        </div>            
</template>

<script>
import { mapGetters } from 'vuex';
export default {
     props: [
           'reminder',
           'showTimer',
           'timeRemainingInSeconds',
           'index',
           'updateReminder'
     ],
     data() {
         return {
             enabled: true
         }
    },
    computed: {
        ...mapGetters([
            'reminderTypes'
        ]),
        displayTimeRemaining() {
            let minutes = Math.floor(this.timeRemainingInSeconds / 60);
            let seconds = ('0' + this.timeRemainingInSeconds % 60).slice(-2);
            return `${minutes} : ${seconds}`;
        },
        statusMessage(){
            // time is on and future call is activated
            if (this.reminder.enabled) return `I'll start at ${this.reminder.start}`;
            return `` 
        },
        isInterval() {
            return this.reminder.settings.type == this.reminderTypes.INTERVAL
        }
    },
    watch: {
        enabled(newValue, oldValue) {
            console.log("New Value: " + newValue);
            console.log("Old Value: " + oldValue);
            this.updateReminder({enabled: newValue}, oldValue, newValue)
            // if (res.data.success) {
            //     if (newValue) this.$emit('enable');
            //     else this.$emit('disable');
            // } else {
            //     this.enabled = oldValue;
            //     // revertback 
            // }            
        }
    },
    created() {
        this.enabled = this.reminder.enabled;
    }
    
}
</script>

<style scoped>
    .onoffswitch {
    position: relative; width: 100%;
    -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
}
.onoffswitch-checkbox {
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
.onoffswitch-label {
    display: block; overflow: hidden; cursor: pointer;
    /* border: 2px solid #999999; border-radius: 20px; */
    border: 2px solid #999999; border-radius: 5px;
}
.onoffswitch-inner {
    display: block; width: 200%; margin-left: -100%;
    transition: margin 0.3s ease-in 0s;
}
.onoffswitch-inner:before, .onoffswitch-inner:after {
    display: block; float: left; width: 50%; height: 30px; padding: 0; line-height: 30px;
    font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
    box-sizing: border-box;
}
.onoffswitch-inner:before {
    content: "ON";
    text-align: center;
    /* padding-left: 10px; */
    background-color: #34A7C1; color: #FFFFFF;
}
.onoffswitch-inner:after {
    content: "OFF";
    text-align: center;
    /* padding-right: 10px; */
    background-color: #EEEEEE; color: #999999;
    /* text-align: right; */
}
.onoffswitch-switch {
    display: block; width: 18px; margin: 6px;
    background: #FFFFFF;
    position: absolute; top: 0; bottom: 0;
    right: 55%;
    /* border: 2px solid #999999; border-radius: 20px; */
    border: 2px solid #999999; border-radius: 20px;
    transition: all 0.3s ease-in 0s; 
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
    margin-left: 0;
}
.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
    right: 0px; 
}


/* settings emphasize */
.settings {
    font-weight: 500;
    /* margin-right: 0.3em;
    margin-left: 0.3em; */
    /* color: darkcyan; */
    color: #2a8599;
}
</style>