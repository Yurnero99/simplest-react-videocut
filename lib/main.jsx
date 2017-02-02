'use strict'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'

class VideoCutter extends Component {
  constructor() {
    super()
  }

  componentDidMount(){
    console.log('Mounted')
  }

  render() {
    let styles = {color: 'red'}
    return (
      <div>
        <p>Hello World!</p>
      </div>
    )
  }
}

ReactDOM.render(<VideoCutter />,
		document.getElementById('react-container'))
