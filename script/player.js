class Soundtrack {
    constructor(name, author, img, music) {
        this.name = name
        this.author = author
        this.img = img
        this.music = music
    }
}
class Player {
    constructor(musicList) {
        //vars
        this.audio = new Audio()
        this.progressListening = true
        this.audio.volume = 0.5
        this.curId = 0
        this.elementsSize = 0
        this.changeable = false
        this.changeableVolume = false
        this.isPlaying = false
        this.musicList = musicList
        this.size = musicList.length - 1
        this.visualized = false
        //dom
        this.wrapper = document.querySelector('.wrapper')
        this.equalizer = document.querySelector('.player .equalizer')
        this.player = document.querySelector('.player')
        this.titleDOM = document.querySelector('.player .title')
        this.authorDOM = document.querySelector('.player .author')
        this.pictDiv = document.querySelector('.pictures')
        this.progressbar = document.getElementById('progressbar')
        this.volume = document.getElementById('volume')
        //listeners
        document.getElementById('next').addEventListener('click', () => this.changeSong(() => {this.incrementCurId()}))
        document.getElementById('play').addEventListener('click', () => this.playOrPause())
        document.getElementById('prev').addEventListener('click', () => this.changeSong(() => {this.decrementCurId()}))
        this.audio.addEventListener('timeupdate', () => this.updateProgress())
        this.audio.addEventListener('ended', () => this.changeSong(() => {this.incrementCurId()}))
        this.progressbar.addEventListener('mousedown', () => {this.pauseProgressListening()})
        this.progressbar.addEventListener('mouseup', () => {this.setProgress(); this.continueProgressListening()})
        this.progressbar.addEventListener('touchstart', () => {this.pauseProgressListening()})
        this.progressbar.addEventListener('touchend', () => {this.setProgress(); this.continueProgressListening()})
        this.volume.addEventListener('mouseup', () => {this.setVolume()})
        this.volume.addEventListener('touchend', () => {this.setVolume()})
        this.init()
    }

    equalizingPreparation() {
        if (this.visualized) return
        this.visualized = true
        this.context = new AudioContext()
        this.analyzer = this.context.createAnalyser()
        this.elementsSize = 16
        this.src = this.context.createMediaElementSource(this.audio)
        this.src.connect(this.analyzer)
        this.analyzer.connect(this.context.destination)
        this.fillVisualizer()
        this.visualize()
    }
    
    visualize() {
        window.requestAnimationFrame(() => {this.visualize()})
        let array = new Uint8Array(this.analyzer.frequencyBinCount)
        this.analyzer.getByteFrequencyData(array)
        //const trap = this.pictDiv.querySelector('.album__photo')
        
        for (let i = 0; i < this.elementsSize; i++) {
            /*let item = array[i]
            this.elements[i].borderRadius = `${array[i]/2}px`
            this.elements[i].style.transform = `rotateZ(${i * (360 / this.analyzer.frequencyBinCount) + 180 + this.audio.currentTime * 100}deg) translate(-50%, ${clamp(item + i * 7 * this.isPlaying, trap.clientWidth/7, trap.clientWidth*this.audio.currentTime)}px)`
            */
           this.elements[i].style.height = Math.max(0, array[(i+10)*2]/10 || 0) + 'px'
        }
        /*
        const trap = this.pictDiv.querySelector('.album__photo')
        trap.style.boxShadow = `${array[1]+100}px ${array[2]+100}px ${array[3]+1000}px ${array[4]+100}px ${this.domainColor},` +
            `${-array[6]-100}px ${-array[7]-100}px ${array[8]+1000}px ${array[9]+100}px ${this.domainColor},` +
            `${array[12]+100}px ${-array[13]-100}px ${array[14]+1000}px ${array[15]+100}px yellow,` + 
            `${-array[16]-100}px ${array[17]+100}px ${array[18]+1000}px ${array[19]+100}px yellow`*/
        
    }

    fillVisualizer() {
        this.elements = []
        this.equalizer.innerHTML = ''
        for (let i = 0; i < this.elementsSize; i++) {
            const element = document.createElement('div')
            this.elements.push(element)
            this.equalizer.appendChild(element)
        }
    }

    pauseProgressListening() {this.progressListening = false}

    continueProgressListening() {this.progressListening = true}

    changeTitle() {
        this.titleDOM.innerHTML = this.musicList[this.curId].name
        this.authorDOM.innerHTML = this.musicList[this.curId].author
        this.pictDiv.innerHTML = `<img class="album__photo" src="${this.musicList[this.curId].img}">`
        setTimeout(() => {
            this.domainColor = getDominantColor(document.querySelector('.album__photo'))
            this.wrapper.style.backgroundColor = this.domainColor !== '#000000' ? this.domainColor : '#808080'
        }, 30)
    }

    init() {this.audio.src = this.musicList[this.curId].music;this.changeTitle()}

    incrementCurId() {this.curId = (this.curId === this.size) ? 0 : this.curId + 1}

    decrementCurId() {this.curId = (this.curId === 0) ? this.size : this.curId - 1}

    play() {this.audio.play(); this.isPlaying = true; this.equalizingPreparation()}

    pause() {this.audio.pause(); this.isPlaying = false}

    playOrPause() {
        if (this.isPlaying) {
            this.pause()
            document.getElementById('play').src = './resources/buttons/play.svg'
        } else {
            this.play()
            document.getElementById('play').src = './resources/buttons/pause.svg'
        }
    }

    pauseWithStateSaving() {const state = this.isPlaying;this.pause();this.isPlaying = state}
    
    changeSong(dir) {
        this.pauseProgressListening()
        this.pauseWithStateSaving()
        dir()
        this.changeTitle()
        this.fillVisualizer()
        this.audio.src = this.musicList[this.curId].music
        this.progressbar.value = 0
        setTimeout(() => {
            this.audio.currentTime = 0
            this.continueProgressListening()
            if (this.isPlaying) this.play()
        }, 0)
    }

    updateProgress() {if (this.progressListening) this.progressbar.value = this.audio.currentTime / this.audio.duration}

    setProgress() {this.audio.currentTime = this.progressbar.value * this.audio.duration}

    setVolume() {this.audio.volume = this.volume.value}
}