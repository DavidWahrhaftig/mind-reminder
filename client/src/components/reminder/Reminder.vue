<template>
    <div class="col-4">  
        <div class="mx-1 my-2 rounded py-2" :class="[{'timer-on': reminder.enabled}, {'timer-off': !reminder.enabled}, {'timer-edit': editMode}]">      
            <transition enter-active-class="animate__animated animate__fadeIn"
                        leave-active-class="animate__animated animate__fadeOut"
                        mode="out-in">
            <reminder-edit
                :reminder="reminder"
                :updateReminder="updateReminder"
                :removeReminder="removeReminder"
                @exitEditMode="resume"
                v-if="editMode"/>
            <reminder-display
                :reminder="reminder"
                :showTimer="showTimer"
                :timeRemainingInSeconds="timeRemaining"
                :updateReminder="updateReminder"
                @enable="enableReminder"
                @disable="stopTimer"
                @enterEditMode="edit" 
                v-else/>     
            </transition>
        </div>       
    </div>
</template>

<script>
import ReminderDisplay from './ReminderDisplay.vue';
import ReminderEdit from './ReminderEdit.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    props: ['reminder'],
    components: {
        ReminderDisplay,
        ReminderEdit
    },
    data() {
        return {
            timeRemaining: 1,
            editMode: false,
            showTimer: false,
            intervalID: '',
            timeoutID: '',
            alarm: new Audio(require('../../../public/audios/harp-strumming-short.mp3'))
        }
    },
    computed: {
        ...mapGetters([
            'reminderTypes'
        ]),
        startBound() {
            return {
                hour: Number(this.reminder.start.substring(0,2)), 
                minutes: Number(this.reminder.start.substring(3,5))
            }
        },
        endBound() {
            return {
                hour: Number(this.reminder.end.substring(0,2)), 
                minutes: Number(this.reminder.end.substring(3,5))
            }
        }     
    },
    methods: {
        ...mapGetters([
            'isNew'
        ]),
        ...mapActions([
            'getReminders',
            'update',
            'remove'
        ]),
        async updateReminder(modifiedTimer) {

            //  update document in database 
            let res = await this.update({id: this.reminder._id, reminder: modifiedTimer});

            if (res.data.success) {
                this.editMode = false;
                
                // get reminders
                await this.getReminders();
                
                // 
                if (this.reminder.enabled) {
                    this.enableReminder();
                } else {
                    this.stopTimer();
                }
            }
        },
        async removeReminder() {
            await this.remove(this.reminder._id);
            await this.getReminders();
        },
        beginTimer() {
            let date = new Date();
            // check current time lays in boundry of timer 
            // if (!isOn(date, this.startBound, this.endBound)) {
            //     return;
            // }
            this.showTimer = true;

            let interval = getCurrentInterval(date, this.startBound, this.endBound, Number(this.reminder.period));
            this.timeRemaining = getRemainingSeconds(date, interval);
            console.log(this.timeRemaining);
            this.intervalID = setInterval(() => {
                this.timeRemaining--;
                if (this.timeRemaining == 0) {
                    this.playAudio();
                    this.enableReminder(); // reactivate if necessary or set future call
                }               
            }, 1000);
        },
        stopTimer() {
            // move to TimerDisplay
            this.showTimer = false;
            clearInterval(this.intervalID);
            clearTimeout(this.timeoutID);
            console.log('Stopped Timer');
        },
        edit() {
            this.editMode = true;
            this.stopTimer();
        },
        resume() {
            this.editMode = false;
            if(this.reminder.enabled) {
            
                this.enableReminder();
            }
        },
        enableReminder() {
            // either begin timer or set a future call
            clearInterval(this.intervalID);
            clearTimeout(this.timeoutID);
            // don't activate if not enabled
            console.log("enableReminder - enabled: "+ this.reminder.enabled);

            
            let date = new Date();
            // deals with interval option
            console.log(this.reminderTypes.INTERVAL)
            if (this.reminder.settings.type == this.reminderTypes.INTERVAL && isOn(date, this.startBound, this.endBound)) {
                this.beginTimer();
                console.log("automatic begin!");
            } else { 
                console.log("made a future timer call");
                this.futureReminderCall();
            }
        },
        futureReminderCall() {
            let date = new Date();
            this.showTimer = false;
            // calculate when timer needs to be activated
            let minuteDifference = toMinutes(this.startBound.hour, this.startBound.minutes) 
                                    - toMinutes(date.getHours(),date.getMinutes());
            if (this.startBound.hour < date.getHours() || this.startBound.hour == date.getHours() && this.startBound.minutes <= date.getMinutes()) {
                // when the start bound is on the next day
                minuteDifference += 24*60; // add 24 hours in minutes to the minute difference
            }
            let waitInSeconds = minuteDifference * 60 - date.getSeconds();
            console.log("Waiting for: " + waitInSeconds);
            // setTimeOut
            this.timeoutID = setTimeout(() => {
                // if not interval, play audio, then set next futureReminderCall
                // this.playaudio()
                // if interval start the intervals
                this.playAudio();
                if(this.reminder.settings.type == this.reminderTypes.INTERVAL) {
                    this.beginTimer();
                } else {
                    this.enableReminder(); // make another future call by enabling it again
                }
            }, 1000 * waitInSeconds);
            
        },
        playAudio() {
            this.alarm.muted = false;
            this.alarm.play(); // play sound
            this.alarm.onended = () => {
                // Speak the name of the reminder after alarm sound
                let text = new SpeechSynthesisUtterance(this.reminder.name);
                window.speechSynthesis.speak(text);
            }
        }
    },
    created() {
        if (this.reminder.enabled) {
            this.enableReminder();
        }

        this.editMode = this.isNew()(this.reminder._id);
        // this.scrollToElement();
        console.log("Created Timer");
        console.log("New Timer: "+ this.isNew()(this.reminder._id));
    },
    beforeDestroy() {
        clearInterval(this.intervalID);
        clearTimeout(this.timeoutID);
    }
}

// helper functions
function isOn(date, start, end) {
    if (date.getHours() < start.hour || date.getHours() > end.hour) {
        return false;
    } 
    else if (date.getHours() == start.hour && date.getMinutes() < start.minutes) {
        return false;
    }
    else if (date.getHours() == end.hour && date.getMinutes() >= end.minutes) {
        return false;
    }

    return true;
}

function getRemainingSeconds(date, interval){
    let startPoint = interval.startPoint;
    let endPoint = interval.endPoint;
    
    // does current time lay in this interval ?
    let inInterval = isOn; // renaming function 
    if (inInterval(date, startPoint, endPoint)) {
        // found interval
        // convert to remaining minutes
        console.log("=============================================")
        console.log("found Interval")
        console.log("endPoint.hour: " + endPoint.hour);
        console.log("endPoint.minutes: " + endPoint.minutes);
        console.log("date.getHours(): " + date.getHours());
        console.log("date.minutes(): " + date.getMinutes());
        // let x = endPoint.hour - date.getHours();
        // console.log("x: " + x);
        let remainingMinutes = (endPoint.hour * 60 + endPoint.minutes) - (date.getHours() * 60 + date.getMinutes()); 
        //let remaining = endPoint.minutes + (x * 60) - date.getMinutes();
        // console.log("remaining minutes:");
        // console.log(remainingMinutes);
        // console.log("=============================================")
        return remainingMinutes * 60 - date.getSeconds();
    }
}

function getCurrentInterval(date, startBound, endBound, period) {
    // same hour
    let startPoint = {};
    let endPoint = {};
    
    // make minutes conversion
    let nowMinutes = date.getHours() * 60 + date.getMinutes();
    let sbMinutes = startBound.hour * 60 + startBound.minutes;
    let ebMinutes = endBound.hour * 60 + endBound.minutes;

    let difference = nowMinutes - sbMinutes;

    let minutesStartInterval = Math.floor(difference / period) * period + sbMinutes;
    startPoint.hour = Math.floor(minutesStartInterval / 60); // 23
    startPoint.minutes = minutesStartInterval % 60;

    let x = minutesStartInterval + period;
    if (x > ebMinutes) {
        x = ebMinutes;
    }

    endPoint.hour = Math.floor((x) / 60); //230
    endPoint.minutes = (x) % 60;

    // console.log("interval: ");
    // console.log({startPoint, endPoint});
    return {startPoint, endPoint}; 
}

// eslint-disable-next-line no-unused-vars
function toMinutes(hours, minutes) {
    return hours * 60 + minutes;
}

/*
When to setTimeout
1. when creating timer, if current time isn't in bounds
2. when saving timer, if current time isn't in bounds
3. when timer is over, and there isn't another timer after

When to clear setTimeout
1. when editing timer, clear 
2. when stopping, clear
*/

</script>

<style scoped>
    /* .timer-on {
        background: rgb(202, 224, 231);
        border: solid 0.2rem lightskyblue;
    }

    .timer-off {
        background: rgb(202, 224, 231);
        border: solid 0.2rem lightgoldenrodyellow;
    } */
    /* .class:hover {
        animation: shake 0.82s cubic-bezier(.36,.07,.19,.97) both;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        perspective: 1000px;
    } */

    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }

        20%, 80% {
            transform: translate3d(2px, 0, 0);
        }

        30%, 50%, 70% {
            transform: translate3d(-4px, 0, 0);
        }

        40%, 60% {
            transform: translate3d(4px, 0, 0);
        }
    }

    /* This only changes this particular animation duration */
    .animate__animated.animate__fadeIn, .animate__animated.animate__fadeOut  {
        --animate-duration: 0.5s;
    }
</style>
