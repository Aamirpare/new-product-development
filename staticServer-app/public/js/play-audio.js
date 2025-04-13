/*
    Author      :  Aamir Pare
    Description :  Manipulating Web Page Backgound Audio
    Location    :  G-11/4 Home, Islamabad 
    Date        :  10 March, 2025
*/
let isPlay = false;
const audio = document.getElementById('audio-player');

//play/pause audio on 'intro' aread when click 
document.querySelector(".introduction, body")
    .addEventListener("click", () => togglePaly());

//Aslo play/pause audio when keyboard spacebar is pressed
document.addEventListener("keydown", (args) => {
    if (args.code === 'Space') {
        togglePaly();
    }
    args.preventDefault();
});

document.addEventListener("click", (args) => {
    if (args.code === 'Space') {
        togglePaly();
    }
});

function togglePaly() {
    if (!isPlay) {
        audio.play();
    }
    else {
        audio.pause();
    }
    isPlay = !isPlay;
}

