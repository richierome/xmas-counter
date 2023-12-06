// import React, { Component } from 'react';

// class CountdownTimer extends Component {
//   constructor(props) {
//     super(props);
//     this.audio = new Audio('public/Mariah Carey - All I Want for Christmas Is You (Make My Wish Come True Edition)_1_1.mp3'); // Replace with your MP3 file path
//     this.state = {
//       targetDate: '',
//       countdown: '',
//       intervalId: null,
//       countdownExpired: false,
//     };
//   }

//   handleChange = (event) => {
//     this.setState({ targetDate: event.target.value });
//   };

//   startCountdown = () => {
//     const { targetDate } = this.state;

//     if (!targetDate) {
//       alert('Please enter a valid target date.');
//       return;
//     }

//     const targetTime = new Date(targetDate).getTime();
//     if (isNaN(targetTime)) {
//       alert('Invalid date format. Please use yyyy-mm-ddThh:mm:ss format.');
//       return;
//     }

//     const currentTime = new Date().getTime();
//     const timeDifference = targetTime - currentTime;

//     if (timeDifference <= 0) {
//       alert('The target date and time must be in the future.');
//       return;
//     }

//     // Start the countdown
//     const intervalId = setInterval(this.updateCountdown, 1000);
//     this.setState({ intervalId });
//   };

//   updateCountdown = () => {
//     const { targetDate } = this.state;
//     const targetTime = new Date(targetDate).getTime();
//     const currentTime = new Date().getTime();
//     const timeDifference = targetTime - currentTime;

//     if (timeDifference <= 0) {
//       clearInterval(this.state.intervalId);
//       this.setState({ countdown: 'Countdown expired', countdownExpired: true });
//       this.playAudio(); // Play audio when countdown expires
//     } else {
//       const seconds = Math.floor((timeDifference / 1000) % 60);
//       const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
//       const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
//       const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

//       this.setState({
//         countdown: `${days}d ${hours}h ${minutes}m ${seconds}s`,
//       });
//     }
//   };

//   playAudio = () => {
//     this.audio.play();
//   };

//   resetCountdown = () => {
//     clearInterval(this.state.intervalId);
//     this.setState({
//       targetDate: '',
//       countdown: '',
//       intervalId: null,
//       countdownExpired: false,
//     });
//     this.audio.pause(); // Pause audio when resetting countdown
//     this.audio.currentTime = 0; // Reset audio to the beginning
//   };

//   render() {
//     return (
//       <div>
//         <h1>Countdown Timer</h1>
//         <div className='Counter-container'>
//           <label htmlFor="targetDate">Target Date:</label>
//           <input
//             type="datetime-local"
//             id="targetDate"
//             value={this.state.targetDate}
//             onChange={this.handleChange}
//           />
//         </div>
//         <div className='Start-Reset'>
//           <button onClick={this.startCountdown}>Start Countdown</button>
//           <button onClick={this.resetCountdown}>Reset</button>
//         </div>
//         <div>
//           <h2>{this.state.countdown}</h2>
//         </div>
//       </div>
//     );
//   }
// }

// export default CountdownTimer;

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

  // updateCountdown = () => {
  //   const { targetDate } = this.state;
  //   const targetTime = new Date(targetDate).getTime();
  //   const currentTime = new Date().getTime();
  //   const timeDifference = targetTime - currentTime;

  //   if (timeDifference <= 0) {
  //     clearInterval(this.state.intervalId);
  //     this.playAudio();
  //     this.setState({ countdown: 'Countdown expired', countdownExpired: true });
  //   } else {
  //     const seconds = Math.floor((timeDifference / 1000) % 60);
  //     const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
  //     const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  //     const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  //     this.setState({
  //       countdown: `${days}d ${hours}h ${minutes}m ${seconds}s`,
  //     });
  //   }
  // };
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
      <div>
        <h1></h1>
        <div className="Date">
          <label>
            
            <input
              type="datetime-local"
              value={this.state.targetDate}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <div>
          {this.state.countdown && (
            <p>Countdown: {this.state.countdown}</p>
          )}
        </div>
        <div>
          {this.state.audioIsPlaying ? (
            <div>
              <p>Song is playing</p>
              <button onClick={this.pauseAudio}>Pause Music</button>
            </div>
          ) : this.state.countdownExpired ? (
            <div>
              <button onClick={this.playAudio}>Play Music</button>
            </div>
          ) : (
            <div>
              <button className="Start" onClick={this.startCountdown}>Start Countdown</button>
              <button className="Restart" onClick={this.resetCountdown}>Reset Countdown</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default AudioTest;
