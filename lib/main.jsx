'use strict'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import VideoPlayer from './player'
import RangeSlider from './slider'

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
    const end = this.state.start + 5
    return (
      <div>
        <input type="file" accept="video/mp4,video/x-m4v,video/*" name="file" onChange={this.loadVideo} />
        <div className="player">
          <VideoPlayer start={this.state.start} videoBlob={this.state.videoBlob} changeDuration={this.setDuration} />
          <RangeSlider defaultValue={0} min={0} max={this.state.videoDuration || 10}
            start={this.state.start} end={end}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<VideoCutter />,
		document.getElementById('react-container'))
