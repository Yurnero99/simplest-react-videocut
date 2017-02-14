'use strict'

import React, {Component} from 'react'
import Slider, {Range} from 'rc-slider'
import Draggable from 'react-draggable'
import 'rc-slider/assets/index.css'

export default

class RangeSlider extends Component {
  constructor() {
    super()
    this.state = { x: 0, start: 0, step: 0, pos: 0 }
    this.handleDrag = this.handleDrag.bind(this)
    this.slideChanged = this.slideChanged.bind(this)
  }

  slideChanged(e) {
    const {max} = this.props
    const start = e[0] * 100 / max
    this.setState({start: start})
  }

  handleDrag(e, ui) {
    const {x, step} = this.state
    const newX = x + ui.deltaX
    const pos = Math.round(newX / step)
    this.setState({x: newX, pos: pos})
  }

  componentDidMount() {
    const width = document.getElementById('slider').offsetWidth
    const limit = this.props.max - this.props.min
    const step = width / limit
    const pos = Math.round(this.state.x / step)
    this.setState({step, pos, limit})
  }

  render() {
    const {min, max, start, end} = this.props
    const {x, step, pos} = this.state
    console.log(pos)
    return (
      <div className="slider-container">
        <img className="timeline" src="http://www.myhimalayas.com/namtso/image/large/panorama_lalungla_wide_shishapangma_small.jpg" />
        <div className="slider-wrapper" id="slider">
          <Range value={[pos, pos+1]} defaultValue={[1, 2]} min={min} max={max} onChange={this.slideChanged} />
          <Draggable grid={[step, 0]} bounds="parent" onDrag={this.handleDrag} axis="x">
            <div
              className="drag-body"
              style={{width: `${100/this.state.limit}%`}}>
            </div>
          </Draggable>
        </div>
      </div>
    )
  }
}
