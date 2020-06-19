<template>
        <div class="mx-4 py-0">
            <h4 class="row">
                <!-- Timer Name -->
                <!-- <h5 class="col-9 p-0" style="overflow: hidden"> -->
                {{ timer.name }}
                <!-- </h5> -->
                <!-- <h5 class="col-3 text-right p-0" 
                    v-if="showTimer">
                    {{ displayTimeRemaining }}
                </h5> -->
            </h4>
            <div class="row">
                <!-- Timer Settings -->
                <div class="col-9">
                    <div class="row">
                        From <div class="settings">{{ timer.start }}</div> 
                        To <div class="settings">{{ timer.end }}</div> 
                        Every <div class="settings">{{ timer.period }}</div> min
                    </div>
                    <h2 class="row p-0 mt-1 justify-content-center align-self-center"
                        v-if="showTimer">
                        {{ displayTimeRemaining }}
                    </h2>
                    <h5 class="row p-0 justify-content-center align-self-center"
                        v-else>
                        {{ statusMessage }}
                    </h5>
                    <h1 class="row p-0 justify-content-center align-self-center"
                        v-if="!timer.enabled">
                        <i class="fas fa-ban"></i>
                    </h1>
                </div>
                <!-- Edit Button and On Switch -->
                <div class="col-3 pr-0">
                    <button class=" row btn btn-sm btn-warning text-light m-0 mb-2 btn-block" 
                            @click="$emit('edit')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <div class="onoffswitch">
                        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" :id="`myonoffswitch${timer._id}`" tabindex="0" 
                            v-model="enabled">
                        <label class="onoffswitch-label" :for="`myonoffswitch${timer._id}`">
                            <span class="onoffswitch-inner"></span>
                            <!-- <span class="onoffswitch-switch"></span> -->
                        </label>
                    </div>

                </div>
            </div>
        </div>            
</template>

<script>
export default {
     props: [
           'timer',
           'showTimer',
           'timeRemainingInSeconds',
           'index',
           'updateTimer'
     ],
     data() {
         return {
             enabled: true
         }
    },
    computed: {
        displayTimeRemaining() {
            let minutes = Math.floor(this.timeRemainingInSeconds / 60);
            let seconds = ('0' + this.timeRemainingInSeconds % 60).slice(-2);
            return `${minutes} : ${seconds}`;
        },
        statusMessage(){
            // time is on and future call is activated
            if (this.timer.enabled) return `I'll start at ${this.timer.start}`;
            return `` 
        }
    },
    watch: {
        enabled(newValue, oldValue) {
            console.log("New Value: " + newValue);
            console.log("Old Value: " + oldValue);
            this.updateTimer({enabled: newValue}, oldValue, newValue)
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
        console.log("Created TimerDisplay");
        this.enabled = this.timer.enabled;
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
    margin-right: 0.3em;
    margin-left: 0.3em;
    /* color: darkcyan; */
    color: #2a8599;
}
</style>