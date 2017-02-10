'use strict'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import VideoPlayer from './player'

class VideoCutter extends Component {
  constructor() {
    super()
    this.state = {videoBlob: '', videoDuration: 0, start: 0}
    this.loadVideo = this.loadVideo.bind(this)
    this.setDuration = this.setDuration.bind(this)
  }

  setDuration(duration) {
    this.setState({videoDuration: duration})
  }

  loadVideo(e) {
    const currentFile = e.target.files[0]
    if (e.target.files && currentFile) {
      this.setState({videoBlob: URL.createObjectURL(currentFile)})
    }
  }

  render() {
    return (
      <div>
        <input type="file" accept="video/mp4,video/x-m4v,video/*" name="file" onChange={this.loadVideo} />
        <div className="player">
          <VideoPlayer start={this.state.start} videoBlob={this.state.videoBlob} changeDuration={this.setDuration} />
          <div>
            <img className="timeline" src="http://www.myhimalayas.com/namtso/image/large/panorama_lalungla_wide_shishapangma_small.jpg" />
            <div></div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<VideoCutter />,
		document.getElementById('react-container'))
