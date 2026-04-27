const wrapper = document.getElementById("wrapper")
const envelope = document.getElementById("envelope")
const music = document.getElementById("music")

let started = false

envelope.addEventListener("click", () => {

    wrapper.classList.toggle("open")

    if(started === false){
        music.volume = 0.8
        music.play()
        started = true
    }

})