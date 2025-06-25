import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeInMinutes: 0,
  timeInSeconds: 0,
}

class Stopwatch extends Component {
  state = {...initialState}

  componentWillUnmount() {
    this.clearIntervalId()
  }

  timerCountDown = () => {
    const {timeInSeconds} = this.state

    if (timeInSeconds >= 59) {
      this.setState(prevState => ({
        timeInMinutes: prevState.timeInMinutes + 1,
        timeInSeconds: 0,
      }))
    } else {
      this.setState(prevState => ({
        timeInSeconds: prevState.timeInSeconds + 1,
      }))
    }
  }

  startTimer = () => {
    const {isTimerRunning} = this.state

    if (!isTimerRunning) {
      this.setState({isTimerRunning: true})
      this.timerId = setInterval(this.timerCountDown, 1000)
    }
  }

  onStopTimer = () => {
    this.setState({isTimerRunning: false})
    this.clearIntervalId()
  }

  onResetTimer = () => {
    this.setState({...initialState})
    this.clearIntervalId()
  }

  clearIntervalId = () => {
    if (this.timerId) {
      clearInterval(this.timerId)
      this.timerId = null
    }
  }

  getFormattedTime = time => time.toString().padStart(2, '0')

  render() {
    const {timeInMinutes, timeInSeconds} = this.state

    return (
      <div className="app-container">
        <div className="stopwatch-bg-container">
          <h1 className="heading">Stopwatch</h1>
          <div className="stopwatch-container">
            <div className="stopwatch-logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
                className="stopwatch-logo"
              />
              <p className="timer-text">Timer</p>
            </div>
            <h1 className="stopwatch-time">
              {this.getFormattedTime(timeInMinutes)}:
              {this.getFormattedTime(timeInSeconds)}
            </h1>
            <div className="control-btn">
              <button
                type="button"
                className="start-btn"
                onClick={this.startTimer}
              >
                Start
              </button>
              <button
                type="button"
                className="stop-btn"
                onClick={this.onStopTimer}
              >
                Stop
              </button>
              <button
                type="button"
                className="reset-btn"
                onClick={this.onResetTimer}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
