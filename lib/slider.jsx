'use strict'

import React, {Component} from 'react'
import Slider, {Range} from 'rc-slider'
import Draggable from 'react-draggable'

export default

class RangeSlider extends Component {
  constructor() {
    super()
    this.state = { x: 0, y: 0, width: 50, start: 0 }
    this.handleDrag = this.handleDrag.bind(this)
    this.slideChanged = this.slideChanged.bind(this)
  }

  slideChanged(e) {
    console.log(e)
    const {max} = this.props
    const width = (e[1] - e[0]) * 100 / max
    const start = e[0] * 100 / max
    this.setState({width: width, start: start})
  }

  handleDrag(e, ui) {
    const {x, y} = this.state
    this.setState({x: x + ui.deltaX, y: y + ui.deltaY})
  }

  render() {
    console.log(this.state.x)
    const {value, min, max, start, end} = this.props
    return (
      <div className="slider-container">
        <img className="timeline" src="http://www.myhimalayas.com/namtso/image/large/panorama_lalungla_wide_shishapangma_small.jpg" />
        <div className="slider-wrapper">
          <Range defaultValue={[0, 5]} min={min} max={max} onChange={this.slideChanged}>
            <Draggable grid={[70, 70]} bounds="parent" onDrag={this.handleDrag} axis="x">
              <div
                className="drag-body"
                style={{width: `${this.state.width}%`, left: `${this.state.start}%`}}>
              </div>
            </Draggable>
          </Range>
        </div>
      </div>
    )
  }
}
