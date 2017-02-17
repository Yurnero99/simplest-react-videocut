'use strict'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import VideoPlayer from './player'
import RangeSlider from './slider'

class VideoCutter extends Component {
  constructor() {
    super()
    this.state = {videoBlob: '', videoDuration: 0, start: 0, end: 1, time: '00:00'}
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
          <VideoPlayer
            start={this.state.start} end={this.state.end}
            videoBlob={this.state.videoBlob}
            changeDuration={this.setDuration}
            setTimer={(time) => this.setState({time})} />
          <RangeSlider
            src={'http://www.myhimalayas.com/namtso/image/large/panorama_lalungla_wide_shishapangma_small.jpg'}
            min={0} max={this.state.videoDuration || 5}
            start={this.state.start} end={this.state.end}
            updateRange={(start, end) => this.setState({start, end})}
            time={this.state.time}
          />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<VideoCutter />,
		document.getElementById('react-container'))
