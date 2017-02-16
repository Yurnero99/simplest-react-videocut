'use strict'

import React, {Component} from 'react'

export default
class VideoPlayer extends Component {
  constructor() {
    super()
    this.initialize = this.initialize.bind(this)
  }

  initialize(e) {
    this.props.changeDuration(e.target.duration)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.videoBlob !== nextProps.videoBlob || this.props.start !== nextProps.start
    || this.props.end !== nextProps.end
  }

  componentDidUpdate() {
    this.video.load()
    this.video.play()
  }

  render() {
    return (
      <video
        ref={(ref) => { this.video = ref }}
        onLoadedMetadata={this.initialize}
        preload="auto" height="264">
        <source src={`${this.props.videoBlob}#t=${this.props.start},${this.props.end}`} type="video/mp4" />
      </video>
    )
  }
}
