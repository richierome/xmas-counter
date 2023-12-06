
import './App.css';
import './components/Snowfall';
import Snowfall from './components/Snowfall';

//  import CountdownTimer from './components/countdownTimer';

import CountdownTimer from './components/countdownTimer';


function App() {
  return (
    <div className="App-container">
       
        <Snowfall/>
        <CountdownTimer/>
       
      {/* <header className="App-header">
       
        <CountdownTimer/>
             </header> */}
    </div>
  );
}

export default App;
