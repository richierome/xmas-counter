import logo from './logo.svg';
import './App.css';
import CountdownTimer from './components/countdownTimer';

function App() {
  return (
    <div className="App-container">
      
      <header className="App-header">
         {/* <img src={logo} className="App-logo" alt="logo" />  */}
       
        <CountdownTimer/>
      </header>
    </div>
  );
}

export default App;
