class Timer {
    constructor(minutes) {
        this.minutesOrig = minutes;
        this.timeLeft = 1000 * 60 * minutes
        let begin = new Date(this.timeLeft);
        this.minutes = begin.getMinutes();
        this.seconds = begin.getSeconds();
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
            this.timeLeft -= 1000
            if (this.minutes <= 0 && this.seconds <= 0) {
                this.running = false
                clearInterval(this.updateID)
            }
        }, 1000)
    }
    stop() {
        if (!this.running) return
        clearInterval(this.updateID)
        this.running = false
    }
    reset() {
        this.timeLeft = 1000 * 60 * this.minutesOrig
        this.start()
    }
    isOver() {
        if (this.minutes <= 0 && this.seconds <= 0) return true
        return false
    }
}