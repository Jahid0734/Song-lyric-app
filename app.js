const searchLyrics = document.getElementById('search-lyrics');
const searchBtn = document.getElementById('search-btn');
const result = document.getElementById('result')
const mainApi = 'https://api.lyrics.ovh'


function searchSong(){
    fetch(`${mainApi}/suggest/${searchLyrics.value}`)
    .then(res => res.json())
    .then(data => songTitleAndArtist(data))
}


function songTitleAndArtist(data){
    let songNameArtistShow = '';
    const song = data.data;
    for(let i = 0; i < 10; i++){
        const titleSong = song[i]
        
        songNameArtistShow += ` 
        <div>
        <!-- single result -->
        <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${titleSong.title}</h3>
                <p class="author lead">Album by <span>${titleSong.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" data-artist = "${titleSong.artist.name}" data-songName="${titleSong.title}">Get Lyrics</button>
            </div>
        </div>
        <!-- ./ single result -->
        </div>`
       
    }
        result.innerHTML = songNameArtistShow;

};
    searchBtn.addEventListener('click', () => {
    if (searchLyrics.value == '' || searchLyrics.value == ' ' ) {
        alert('Please Enter a song name')
    }
    else{
        searchSong();
        searchLyrics.value = '';
    }

    
});

result.addEventListener('click', (button)=> {
    const btnTarget = button.target;
    if (btnTarget.tagName =='BUTTON') {
        const artist = btnTarget.getAttribute('data-artist');
        const title = btnTarget.getAttribute('data-songName');
        
        getLyrics(artist, title);
    }
});

function getLyrics(artistName, songTitle){
    fetch(`${mainApi}/v1/${artistName}/${songTitle}`)
    .then(res => res.json())
    .then(data => {
        const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')
        console.log(lyrics)
        result.innerHTML = `<div style="text-align: center;">
         <h1 style="color:  #28A745">${artistName} - ${songTitle}</h1>
        <div>${lyrics}</div>
        </div>`
        
    })
}
