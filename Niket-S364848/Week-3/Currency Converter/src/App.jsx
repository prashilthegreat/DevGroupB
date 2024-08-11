import { useEffect, useState } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import { HiSwitchHorizontal } from 'react-icons/hi';
// import 'react-select/dist/react-select.css';
import './App.css';

function App() {
  const [info, setInfo] = useState({});
  const [input, setInput] = useState(0);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const [options, setOptions] = useState([]);
  const [output, setOutput] = useState(0);

  useEffect(() => {
    Axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then((res) => {
        setInfo(res.data.rates);
      });
  }, []);

  useEffect(() => {
    const optionsArray = Object.keys(info).map((key) => ({
      value: key,
      label: key,
    }));
    setOptions(optionsArray);
    convert();
  }, [info, from, to]);

  function convert() {
    const rate = info[to] / info[from];
    setOutput(input * rate);
  }

  function flip() {
    const temp = from;
    setFrom(to);
    setTo(temp);
  }

  const handleFromChange = (selectedOption) => {
    setFrom(selectedOption.value);
  };

  const handleToChange = (selectedOption) => {
    setTo(selectedOption.value);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Currency Converter</h1>
      </header>
      <main className="main">
        <div className="card">
          <div className="input-container">
            <h3>Amount</h3>
            <input
              type="text"
              placeholder="Enter the amount"
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div className="currency-container">
            <div className="from-container">
              <h3>From</h3>
              <Select
                options={options}
                onChange={handleFromChange}
                value={{ value: from, label: from }}
                placeholder="From"
              />
            </div>
            <div className="switch-container">
              <HiSwitchHorizontal size="30px" onClick={() => flip()} />
            </div>
            <div className="to-container">
              <h3>To</h3>
              <Select
                options={options}
                onChange={handleToChange}
                value={{ value: to, label: to }}
                placeholder="To"
              />
            </div>
          </div>
          <div className="result-container">
            <button onClick={() => convert()}>Convert</button>
            <div className="result">
              <h2>Converted Amount:</h2>
              <p>{input + ' ' + from + ' = ' + output.toFixed(2) + ' ' + to}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;