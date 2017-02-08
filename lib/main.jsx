'use strict'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class VideoCutter extends Component {
  constructor() {
    super()
    this.state = {videoBlob: ''}
    this.loadVideo = this.loadVideo.bind(this)
  }

  loadVideo(e) {
    const currentFile = e.target.files[0]
    var video = document.getElementById('video')
    let blob = ''
    if (e.target.files && currentFile) {
      blob = URL.createObjectURL(currentFile);
      console.log(blob)
      this.setState({videoBlob: blob})
    }
    video.load()
  }

  componentDidMount(){
    console.log('Mounted')
  }

  render() {
    return (
      <div>
        <p>Hello World!</p>
        <input type="file" accept="video/mp4,video/x-m4v,video/*" name="file" onChange={this.loadVideo} />
        <video id="video" controls preload="auto" width="640" height="264">
          <source src={this.state.videoBlob} type="video/mp4" />
        </video>
      </div>
    )
  }
}

ReactDOM.render(<VideoCutter />,
		document.getElementById('react-container'))
