import {isSP} from '../consist/UA'

// 4. The API will call this function when the video player is ready.
const onPlayerReady = (event) => {
  event.target.mute()
  if(!isSP){
    event.target.playVideo()
  }
}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
const onYouTubeIframeAPIReady = (id, str) => {
  let player
  player = new YT.Player(id, {
    videoId: str,
    playerVars: {
      autoplay: 1,
      controls: 0,
      loop: 1,
      playlist: str,
      modestbranding: 1,
      disablekb: 1,
      showinfo: 0,
      rel: 0,
      playsinline: 1
    },
    events: {
      'onReady': onPlayerReady
    }
  })
}


const init = (id) => {
  let el = document.getElementById(id)
  if (el) {
    let str = el.dataset.id

    // 2. This code loads the IFrame Player API code asynchronously.
    if (typeof(YT) === 'undefined' || typeof(YT.Player) === 'undefined') {
      let tag = document.createElement('script')

      tag.src = "https://www.youtube.com/iframe_api"
      let firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      window.onYouTubePlayerAPIReady = () => {
        onYouTubeIframeAPIReady(id, str)
      }
    } else {
      onYouTubeIframeAPIReady(id, str)
    }
  }
}

const bind = () => {
  // onPlayer()
}

export default{
  init,
  bind
}