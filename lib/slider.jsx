'use strict'

import React, {Component} from 'react'
import Slider, {Range} from 'rc-slider'
import Draggable from 'react-draggable'
import 'rc-slider/assets/index.css'

export default

class RangeSlider extends Component {
  constructor() {
    super()
    this.state = { x: 0, step: 0, pos: 0, width: 0, elementWidth: 0}
  }

  componentDidMount() {
    const {max, min, start, end} = this.props
    const elementWidth = document.getElementById('slider').offsetWidth
    const limit = max - min
    const step = elementWidth / limit
    const width = (end - start) * 100 / max
    this.setState({step, limit, width, elementWidth})
  }

  componentDidUpdate() {
    const {max, min, start, end} = this.props
    const limit = max - min
    const step = this.state.elementWidth / limit
    const x = start * this.state.step
    const width = (end - start) * 100 / max
    this.setState({step, width, x})
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
    JSON.stringify(this.state) !== JSON.stringify(nextState)
  }

  slideChanged(e) {
    const x = e[0] * this.state.step
    this.props.updateRange(e[0], e[1])
    this.setState({x})
  }

  handleDrag(e, ui) {
    const {start, end} = this.props
    const {x, step} = this.state
    const newX = x + ui.deltaX
    const posStart = newX / step
    const width = end - start
    const posEnd = posStart + width
    this.props.updateRange(posStart, posEnd)
    this.setState({x: newX})
  }

  seekBySecond(amount) {
    const {start, end, max, min} = this.props
    if(start + amount >= min && end + amount <= max) {
      const newStart = start + amount
      const newEnd = end + amount
      const x = newStart * this.state.step
      this.setState({x})
      this.props.updateRange(newStart, newEnd)
    }
  }

  render() {
    const {min, start, end, max} = this.props
    const {x, step, pos} = this.state
    const percentageLeft = start * 100 / max
    const percentageRight = end > max ? 0 : 100 - this.state.width - percentageLeft
    return (
      <div>
        <div className="slider-container">
          <img className="timeline" src={this.props.src} />
          <div className="slider-wrapper" id="slider">
            <div className={'cover cover-left'} style={{width: `${percentageLeft}%`}}></div>
            <Range step={0.1} className={'range-body'} value={[start, end]} min={min} max={max} onChange={(e) => this.slideChanged(e)} />
            <Draggable grid={[step, 0]} bounds="parent"
              onDrag={(e, f) => this.handleDrag(e, f)} axis="x"
              position={{x: this.state.x, y: 0}}>
              <div
                className="drag-body"
                style={{width: `${this.state.width}%`}}>
              </div>
            </Draggable>
            <div className={'cover cover-right'} style={{width: `${percentageRight}%`}}></div>
          </div>
        </div>
        <div className={'control-panel'}>
          <div className={'container'}>
            <div className={'seek-control back'}>
              <span className={'seek-amount'}>{'-1sec'}</span>
              <span className={'button'} onClick={() => this.seekBySecond(-1)}>
                <i className={'fa fa-caret-left'} aria-hidden='true'></i>
              </span>
            </div>
            <div className={'time'}>
              {this.props.time}
            </div>
            <div className={'seek-control forward'}>
              <span className={'button'} onClick={() => this.seekBySecond(+1)}>
                <i className={'fa fa-caret-right'} aria-hidden='true'></i>
              </span>
              <span className={'seek-amount'}>{'+1sec'}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
