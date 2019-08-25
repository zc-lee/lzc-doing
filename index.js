const echo =require('lzc-echo')
class Doing {
    constructor({
        interval = 100,
        text = 'doing'
    }) {
        Object.assign(this, {
            interval,
            _text: text,
            stream: process.stdout,
            timer: null,
            animate: {
                start: ['-', '\\', '|', '/'],
                end: ['      ', '.     ', '..    ', '...   ', '....  ', '..... ', '......']
            },
            startIndex: 0,
            endIndex: 0
        })
    }
    set text(text) {
        this._text = text
    }
    get text() {
        return this._text
    }
    frame() {
        let { animate, text, startIndex, endIndex } = this,
            starts = animate.start,
            ends = animate.end,
            start = starts[startIndex],
            end = ends[endIndex]
        this.startIndex = ++startIndex % starts.length;
        this.endIndex = ++endIndex % ends.length;
        return start + ' ' + text + end
    }
    clear() {
        this.stream.clearLine();
        this.stream.cursorTo(0);
    }
    render() {
        this.clear()
        this.stream.write(this.frame())
    }
    start(text='start...') {
        echo.success(`${text}`)
        this.timer = setInterval(this.render.bind(this), this.interval);
        return this
    }
    stop() {
        clearInterval(this.timer)
        this.timer = null
        this.frameIndex = 0
        this.clear()
        return this
    }
    success(text='success!!!') {
        clearInterval(this.timer)
        this.timer = null
        this.frameIndex = 0
        this.clear()
        echo.success(`✅   ${text}`)
        return this
    }
    fail(text='error!!!') {
        clearInterval(this.timer)
        this.timer = null
        this.frameIndex = 0
        this.clear()
        echo.error(`❌   ${text}`)
        return this
    }
}

module.exports = function (option = {}) {
    return new Doing(option)
}