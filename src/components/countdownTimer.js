import React, { Component } from 'react';



class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetDate: '', // Target date input by the user
      countdown: '', // Remaining time as a countdown
      intervalId: null, // Interval ID to manage the countdown
    };
  }

  handleChange = (event) => {
    this.setState({ targetDate: event.target.value });
  };

  startCountdown = () => {
    const { targetDate } = this.state;

    if (!targetDate) {
      alert('Please enter a valid target date.');
      return;
    }

    const targetTime = new Date(targetDate).getTime();
    if (isNaN(targetTime)) {
      alert('Invalid date format. Please use yyyy-mm-ddThh:mm:ss format.');
      return;
    }

    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      alert('The target date and time must be in the future.');
      return;
    }

    // Start the countdown
    const intervalId = setInterval(this.updateCountdown, 1000);
    this.setState({ intervalId });
  };

  updateCountdown = () => {
    const { targetDate } = this.state;
    const targetTime = new Date(targetDate).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      clearInterval(this.state.intervalId);
      this.setState({ countdown: 'Countdown expired' });
    } else {
      const seconds = Math.floor((timeDifference / 1000) % 60);
      const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
      const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      this.setState({
        countdown: `${days}d ${hours}h ${minutes}m ${seconds}s`,
      });
    }
  };

  resetCountdown = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      targetDate: '',
      countdown: '',
      intervalId: null,
    });
  };

  render() {
    return (
      <div>
        <h1></h1>
        <div className='Counter-container'>
          <label htmlFor="targetDate"></label>
          <input
            type="datetime-local"
            id="targetDate"
            value={this.state.targetDate}
            onChange={this.handleChange}
          />
        </div>
        <div className='Start-Reset'>
          <button  onClick={this.startCountdown}>Start Countdown</button>
          <button  onClick={this.resetCountdown}>Reset</button>
        </div>
        <div>
          <h2> {this.state.countdown}</h2>
        </div>
      </div>
    );
  }
}

export default CountdownTimer;
