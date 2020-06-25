export default class Clock{
    constructor(seconds) {
        this.secondsOrig = seconds;
        this.timeLeft = 1000  * seconds
        let begin = new Date(this.timeLeft);
        this.minutes = begin.getMinutes();
        this.seconds = begin.getSeconds();
        this.expecOutput = begin.toLocaleTimeString([], { minute: '2-digit', second: '2-digit', hour12: false })
        this.updateID = null;
        this.running = false;
    }
    start() {
        if (this.running) return
        this.running = true
        let begin
        this.updateID = setInterval(() => {
            begin = new Date(this.timeLeft);
            this.minutes = begin.getMinutes();
            this.seconds = begin.getSeconds();
            this.expecOutput = begin.toLocaleTimeString([], { minute: '2-digit', second: '2-digit', hour12: false })
            this.timeLeft -= 1000
            //console.log(this.expecOutput)
            if (this.minutes <= 0 && this.seconds <= 0) {
                this.running = false
                clearInterval(this.updateID)
            }
        }, 1000)
    }
    pause() {
        if (!this.running) return
        clearInterval(this.updateID)
        this.running = false
    }
    stop(){
        //if (!this.running) return
        this.timeLeft = 0
        //clearInterval(this.updateID)
        //this.running = false
    }
    reset() {
        this.timeLeft = 1000 * this.secondsOrig
        this.start()
    }
    isOver() {
        if (this.timeLeft<= 0) return true
        return false
    }
}