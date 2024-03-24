function giveTime(index, callback) {
    let song = new Audio(data[index].src);
    song.addEventListener('loadedmetadata', function () {
        let songtime = song.duration;
        let minutes = Math.floor(songtime / 60);
        let seconds = Math.floor(songtime % 60);
        let durationString = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
        callback(durationString);
    });
    song.addEventListener('error', function () {
        console.error('Error loading song duration');
        callback(null); // Pass null to indicate error
    });
}

var inp = document.querySelector('input');
var Card = document.querySelector('.card');
var backword = document.querySelector('.ri-skip-back-fill')
var play = document.querySelector('#play')
var forward = document.querySelector('.ri-skip-forward-fill')
var audio = document.querySelector('#play-audio')
var audioPlayer = document.querySelector("#audioPlayer")
let ctrlIcon = document.getElementById("ctrlIcon");
let changingTIme = document.querySelector('.changingTime');
const volumeslider = document.getElementById('volumeslider');
let music_slider = document.getElementById("music_slider");
let songName = document.getElementById("songName");
let artistName = document.getElementById("artistName");
let songDuration = document.querySelector(".songDuration");
audioPlayer.volume = volumeslider.value / 100;

volumeslider.addEventListener('input', function () {
    audioPlayer.volume = volumeslider.value / 100;
});
var data = [
    { name: "Breathe", artist: "john Newman", src: "./audio/Breathe.mp4", imgsrc: "./images/th.jpeg" },
    { name: "YoungBoy Never Broke Again", artist: "Act A Donkey", src: "./audio/YoungBoy Never Broke Again - Act A Donkey.mp4", imgsrc: "./images/th.jpeg" },
    { name: "IDGAF", artist: "Drake", src: "./audio/Drake - IDGAF (feat. Yeat).mp4", imgsrc: "./images/Drake.jpeg" },
    { name: "Rich Baby Daddy", artist: "Drake", src: "./audio/Drake - Rich Baby Daddy (feat. Sexyy Red & SZA).mp4", imgsrc: "./images/th.jpeg" },
    { name: "Think U The Shit", artist: "Ice Spice", src: "./audio/Ice Spice - Think U The Shit (Fart).mp4", imgsrc: "./images/th.jpeg" },
    { name: "ONE CALL", artist: "john Newman", src: "./audio/ONE CALL.mp4", imgsrc: "./images/th.jpeg" },
    { name: "Power Trip", artist: "john Newman", src: "./audio/Power Trip.mp4", imgsrc: "./images/th.jpeg" },
    { name: "Psycho CEO", artist: "john Newman", src: "./audio/Psycho CEO.mp4", imgsrc: "./images/th.jpeg" }
]
var i = 0;
// function playcurrentsong() {
//     audioPlayer.src = data[i].src;
//     audioPlayer.play();
// }

function necessary() {
    artistName.innerHTML = data[i].artist;
    songName.innerHTML = data[i].name;
    audioPlayer.play();
    ctrlIcon.classList.remove('ri-play-fill');
    ctrlIcon.classList.add('ri-pause-line');
}
audioPlayer.src = data[i].src;
songName.innerHTML = data[i].name;
artistName.innerHTML = data[i].artist;


audioPlayer.onloadedmetadata = function () {
    music_slider.max = audioPlayer.duration;
    music_slider.value = audioPlayer.currentTime;
    let minutes = Math.floor(audioPlayer.duration / 60);
    let seconds = Math.floor(audioPlayer.duration % 60);
    let durationString = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    songDuration.innerHTML = durationString;
}

// audioPlayer.onloadedmetadata = function () {
//     music_slider.max = audioPlayer.duration;
//     music_slider.value = audioPlayer.currentTime;
// }

// function pausecurrentsong() {
//     audioPlayer.src = data[i].src;
//     audioPlayer.pause();
// }

ctrlIcon.addEventListener('click', function () {
    if (ctrlIcon.classList.contains("ri-play-fill")) {
        audioPlayer.play();
        ctrlIcon.classList.remove('ri-play-fill');
        ctrlIcon.classList.add('ri-pause-line');
    }
    else {
        audioPlayer.pause();
        ctrlIcon.classList.remove('ri-pause-line');
        ctrlIcon.classList.add('ri-play-fill');
    }
    // if (audioPlayer.paused) {
    //     audioPlayer.play();
    // } 
    // else {
    //     audioPlayer.pause();
    // }
});
backword.addEventListener('click', function () {
    i--;
    if (i < 0) {
        i = 0;
    }
    audioPlayer.src = data[i].src;
    songDuration.innerHTML = "";
    songDuration.innerHTML = audioPlayer.duration / 60 + ":" + audioPlayer.duration % 60;
    necessary();
    // playcurrentsong();
})
forward.addEventListener('click', function () {
    i++;
    if (i > data.length - 1) {
        i = data.length - 1;
    }
    audioPlayer.src = data[i].src;
    songDuration.innerHTML = "";
    songDuration.innerHTML = audioPlayer.duration / 60 + ":" + audioPlayer.duration % 60;
    necessary();
})


audioPlayer.addEventListener('timeupdate', function () {
    music_slider.value = audioPlayer.currentTime;
});

music_slider.onchange = function () {     // to jump to the clicked time directly
    audioPlayer.currentTime = music_slider.value;
}


function updateDuration() {
    let minutes = Math.floor(audioPlayer.currentTime / 60);
    let seconds = Math.floor(audioPlayer.currentTime % 60);
    let durationString = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

    changingTIme.innerHTML = durationString;
}

let checkDuration = setInterval(() => {
    if (!isNaN(audioPlayer.duration)) {
        updateDuration();
    }

}, 10);



// Iterate through the data array and generate HTML for each song
data.forEach(function (elem, index) {
    giveTime(index, function (durationString) {
        if (durationString) {
            let songCard = document.createElement('div');
            songCard.classList.add('card');
            songCard.innerHTML = `
                <div class="Card_img" style="cursor: pointer">
                    <img src="${data[index].imgsrc}" alt="songs">
                </div>
                <div class="mid">
                    <h1>${elem.name}</h1>
                    <h2>${elem.artist}</h2>
                </div>
                <div class="duration">${durationString}</div>
            `;
            // Add click event listener to play the corresponding song
            songCard.addEventListener('click', function () {
                // Set the audio source to the clicked song
                audioPlayer.src = elem.src;
                // Update song name and artist
                songName.innerHTML = elem.name;
                artistName.innerHTML = elem.artist;
                // Play the song
                audioPlayer.play();
                // Update play/pause button icon
                ctrlIcon.classList.remove('ri-play-fill');
                ctrlIcon.classList.add('ri-pause-line');
            });
            // Append the song card to the songs container
            document.querySelector('#Songs').appendChild(songCard);
        }
    });
});
