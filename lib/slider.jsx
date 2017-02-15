'use strict'

import React, {Component} from 'react'
import Slider, {Range} from 'rc-slider'
import Draggable from 'react-draggable'
import 'rc-slider/assets/index.css'

export default

class RangeSlider extends Component {
  constructor() {
    super()
    this.state = { x: 0, start: 0, end: 0, step: 0, pos: 0, width: 0 }
    this.handleDrag = this.handleDrag.bind(this)
    this.slideChanged = this.slideChanged.bind(this)
  }

  slideChanged(e) {
    const width = (e[1] - e[0]) * 100 / this.props.max
    this.setState({start: e[0], end: e[1], width: width})
  }

  handleDrag(e, ui) {
    const {x, step, start, end} = this.state
    const newX = x + ui.deltaX
    const pos = Math.round(newX / step)
    const width = end - start
    this.setState({x: newX, start: pos, end: pos+width})
  }

  componentDidMount() {
    const width = document.getElementById('slider').offsetWidth
    const limit = this.props.max - this.props.min
    const step = width / limit
    const pos = Math.round(this.state.x / step)
    this.setState({step, pos, limit})
  }

  render() {
    const {min, max} = this.props
    const {x, step, pos, start, end} = this.state
    console.log(pos)
    return (
      <div className="slider-container">
        <img className="timeline" src="http://www.myhimalayas.com/namtso/image/large/panorama_lalungla_wide_shishapangma_small.jpg" />
        <div className="slider-wrapper" id="slider">
          <Range value={[start, end]} defaultValue={[1, 2]} min={min} max={max} onChange={this.slideChanged} />
          <Draggable grid={[step, 0]} bounds="parent" onDrag={this.handleDrag} axis="x">
            <div
              className="drag-body"
              style={{width: `${this.state.width}%`}}>
            </div>
          </Draggable>
        </div>
      </div>
    )
  }
}
