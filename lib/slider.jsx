'use strict'

import React, {Component} from 'react'
import Slider, {Range} from 'rc-slider'
import Draggable from 'react-draggable'
import 'rc-slider/assets/index.css'

export default

class RangeSlider extends Component {
  constructor() {
    super()
    this.state = { x: 0, start: 0, end: 0, step: 0, pos: 0, width: 0, dragPos: 0 }
  }

  slideChanged(e) {
    const width = (e[1] - e[0]) * 100 / this.props.max
    const dragPos = e[0] * this.state.step - this.state.x
    this.props.updateRange(e[0], e[1])
    this.setState({start: e[0], end: e[1], width, dragPos})
  }

  handleDrag(e, ui) {
    const {x, step, start, end} = this.state
    const newX = x + ui.deltaX
    const posStart = newX / step
    const width = end - start
    const posEnd = posStart + width
    this.props.updateRange(posStart, posEnd)
    this.setState({x: newX, start: posStart, end: posEnd, dragPos: 0})
  }

  componentDidMount() {
    const {max, min, start, end} = this.props
    const elementWidth = document.getElementById('slider').offsetWidth
    const limit = max - min
    const step = elementWidth / limit
    const width = (end - start) * 100 / max
    this.setState({step, limit, width, end, start})
  }

  render() {
    const {min, max} = this.props
    const {x, step, pos, start, end, dragPos} = this.state
    const percentage = 100 / max
    const percentageLeft = start * percentage
    const percentageRight = (max - end) * percentage
    return (
      <div className="slider-container">
        <img className="timeline" src={this.props.src} />
        <div className="slider-wrapper" id="slider">
          <div className={'cover cover-left'} style={{width: `${percentageLeft}%`}}></div>
          <Range className={'range-body'} value={[start, end]} min={min} max={max} onChange={(e) => this.slideChanged(e)} />
          <Draggable grid={[step, 0]} bounds="parent" onDrag={(e, f) => this.handleDrag(e, f)} axis="x">
            <div
              className="drag-body"
              style={{width: `${this.state.width}%`, left: `${this.state.dragPos}px`}}>
            </div>
          </Draggable>
          <div className={'cover cover-right'} style={{width: `${percentageRight}%`}}></div>
        </div>
      </div>
    )
  }
}
