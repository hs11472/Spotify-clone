console.log("It's Working");

const secondToMinuteSecond = (seconds) => {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`
}



const getSongs = async () => {
    let song = await fetch("http://127.0.0.1:5500/songs/")  //fetching data
    song = await song.text();   //converting it into text
    const div = document.createElement('div');  //creating div for accessing data of the song
    div.innerHTML = song;
    let a = div.querySelectorAll('a')

    let songs = [];
    let audio = new Audio();
    a.forEach((a) => {
        if (a.href.endsWith('.mp3')) {
            songs.push(a.href);

            const li = document.createElement("li");
            li.innerHTML = `<div class="lists">
                        <img src="assets/song_icon.svg">
                        <div class="name">
                           <p class="song_name">${a.href.split("/songs/")[1]}</p>
                        </div>
                        <div class="play">
                           <p>Play Now</p>
                           <img src="assets/play_circle_icon.svg">
                           </div>
                           </div>`
            const ul = document.querySelector('.left .library .content ul')
            ul.appendChild(li)


            audio.src = songs[0];
            document.querySelector(".controlers .buttons .name p").innerHTML = `${audio.src.split("/songs/")[1]}`


            // adding event listner for playing songs when we clicked on the list of the songs
            li.addEventListener("click", () => {
                audio.src = a.href;
                audio.play();
                document.querySelector('.images .play_icon').innerHTML = `<img src="assets/push_button.png">`;
                document.querySelector(".controlers .buttons .name p").innerHTML = `${audio.src.split("/songs/")[1]}`
            })

        }
    })



    audio.addEventListener("timeupdate", () => {
        document.querySelector(".bar .currentTime p").innerHTML = `${secondToMinuteSecond(audio.currentTime)}`;
        document.querySelector(".bar .duration p").innerHTML = `${secondToMinuteSecond(audio.duration)}`;

        let seekbar = document.querySelector(".seekbar");
        let circle = document.querySelector(".seekbar .circle");

        circle.style.left = (audio.currentTime / audio.duration) * 100 - 0.5 + '%'

        seekbar.addEventListener("click", (e) => {

            let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

            circle.style.left = percent + '%'
            audio.currentTime = (audio.duration * percent / 100)

        })
    })

    const play_button = document.querySelector('.images .play_icon')
    play_button.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            play_button.innerHTML = `<img src="assets/push_button.png">`
        }
        else {
            audio.pause();
            play_button.innerHTML = `<img src="assets/play_circle_icon.svg">`
        }
    })


    const next = document.querySelector(".images .next")
    next.addEventListener("click", () => {
        let index = songs.indexOf(audio.src)
        
        if(index<songs.length-1){
            if(audio.paused){
                audio.src=songs[index+1];
                audio.pause();
                play_button.innerHTML = `<img src="assets/play_circle_icon.svg">`
            }
            else{
                audio.src=songs[index+1];
                audio.play();
                play_button.innerHTML = `<img src="assets/push_button.png">`
            }
        }
        
        document.querySelector(".controlers .name p").innerHTML = audio.src.split("/songs/")[1]
    })
    const previous = document.querySelector(".images .previous")
    previous.addEventListener("click", () => {
        let index = songs.indexOf(audio.src)
        
        if(index>0){
            if(audio.paused){
                audio.src=songs[index-1];
                audio.pause();
                play_button.innerHTML = `<img src="assets/play_circle_icon.svg">`
            }
            else{
                audio.src=songs[index-1];
                audio.play();
                play_button.innerHTML = `<img src="assets/push_button.png">`
            }
        }
        
        document.querySelector(".controlers .name p").innerHTML = audio.src.split("/songs/")[1]
    })


}
getSongs();






































// console.log("hello world");

// async function getSongs(){
//     const a=await fetch("http://127.0.0.1:5500/songs/");
//     let response = await a.text();
//     // console.log(response);
//     let div = document.createElement("div");
//     div.innerHTML=response;
//     let as = div.getElementsByTagName("a");
//     // console.log(as)
//     let songs=[]
//     for (let index = 0; index < as.length; index++) {
//         const element = as[index];
//         if(element.href.endsWith(".mp3")){
//             songs.push(element.href)
//             // songs.push(element.href.split("/songs/")[1])
//         }
//     }
//     return songs;
// }



// // const test=(song,name)=>{
// //     const li=document.createElement('li')
// //     li.innerHTML=`<div class="lists">
// //     <img src="assets/song_icon.svg">
// //     <div class="name">
// //        <p class="song_name">${song}</p>
// //        <p class="artist_name">${name}</p>
// //     </div>
// //     <div class="play">
// //        <p>Play Now</p>
// //        <img src="assets/play_circle_icon.svg">
// //     </div>
// //  </div>`
// //  document.querySelector(".left .content ul").appendChild(li)
// // }

// // let i=0;
// // const testing=(songs)=>{
// //     console.log(songs[i])
// //     test(songs[i].split("/songs/")[1],"testing");
// //     i+=1;
// // }


// async function main(){
//     let songs = await getSongs();
//     console.log(songs);
//     let audio = new Audio(songs[0])
//     audio.src=songs[1];
//     document.querySelector("ul li .lists").addEventListener("click",()=>{
//         audio.play();
//         let duration=audio.duration;
//         console.log(duration);
//     })
//     // setInterval(() => {
//     //     testing(songs)
//     // }, 500);
// }
// main();


