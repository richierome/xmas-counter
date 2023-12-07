import React from "react";
import './Background.css';
import audio from './../../src/assets/mc_song.mp3';



class AudioTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targetDate: '',
      countdown: '',
      intervalId: null,
      audioIsPlaying: false,
      countdownExpired: false,
    };
    this.audioElement = new Audio(audio);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  handleChange = (event) => {
    this.setState({ targetDate: event.target.value });
  };

  startCountdown = () => {
    const { targetDate } = this.state;
    const targetTime = new Date(targetDate).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    if (!targetDate || isNaN(targetTime)) {
      alert('Please enter a valid target date.');
      return;
    }

    if (timeDifference <= 0) {
      alert('Target date must be in the future.');
      return;
    }

    const intervalId = setInterval(this.updateCountdown, 1000);
    this.setState({ intervalId });
  };

  resetCountdown = () => {
    clearInterval(this.state.intervalId);
    this.setState({
      targetDate: '',
      countdown: '',
      intervalId: null,
      audioIsPlaying: false,
      countdownExpired: false,
    });
  };

  
  updateCountdown = () => {
    const { targetDate } = this.state;
    const targetTime = new Date(targetDate).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = targetTime - currentTime;

    if (timeDifference <= 0) {
      clearInterval(this.state.intervalId);
      this.playAudio();
      this.setState({ countdown: 'Free at last!', countdownExpired: true });

      // Change the background image when countdown is complete
      document.body.classList.add("countdown-complete");
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

  

  playAudio = () => {
    this.audioElement.play();
    this.setState({ audioIsPlaying: true });
  };

  pauseAudio = () => {
    this.audioElement.pause();
    this.setState({ audioIsPlaying: false });
  };

  render() {
    return (
      <div className="UserInput">
        <h1></h1>
        <div className="Date">
          <label >
            
            <input className="Calender"
              type="datetime-local"
              value={this.state.targetDate}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          {this.state.countdown && (
            <p className="Countdown">{this.state.countdown}</p>
          )}
        </div>
        <div>
          {this.state.audioIsPlaying ? (
            <div className="Pause-btn-container">
              <p></p>
              <button className="P-button" onClick={this.pauseAudio}>Pause Music</button>
            </div>
          ) : this.state.countdownExpired ? (
            <div className="Play-btn-container">
              <button className="P-button" onClick={this.playAudio}>Play Music</button>
            </div>
          ) : (
            <div>
              <button className="T-button" onClick={this.startCountdown}>Start Countdown</button>
              <button className="T-button" onClick={this.resetCountdown}>Reset Countdown</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AudioTest;
