import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './App.css';

function App() {

	// Initializing all the state variables 
	const [info, setInfo] = useState({});
	const [input, setInput] = useState(0);
	const [from, setFrom] = useState("USD");
	const [to, setTo] = useState("INR");
	const [options, setOptions] = useState([]);
	const [output, setOutput] = useState(0);

	// Fetching currency data
	useEffect(() => {
		Axios.get('https://open.er-api.com/v6/latest/USD')
			.then((res) => {
				setInfo(res.data.rates);
				setOptions(Object.keys(res.data.rates));
			});
	}, []);

	// Convert function
	useEffect(() => {
		if (info[to]) {
			convert();
		}
	}, [input, from, to, info]);

	// Function to convert the currency
	function convert() {
		const rate = info[to] / info[from];
		setOutput(input * rate);
	}

	// Function to switch between two currencies
	function flip() {
		const temp = from;
		setFrom(to);
		setTo(temp);
	}

	return (
		<div className="App">
			<div className="heading">
				<h1>Currency converter</h1>
			</div>
			<div className="container">
				<div className="left">
					<h3>Amount</h3>
					<input type="number"
						placeholder="Enter the amount"
						onChange={(e) => setInput(parseFloat(e.target.value))} />
				</div>
				<div className="middle">
					<h3>From</h3>
					<Dropdown options={options}
						onChange={(e) => { setFrom(e.value) }}
						value={from} placeholder="From" />
				</div>
				<div className="switch">
					<HiSwitchHorizontal size="30px"
						onClick={() => { flip() }} />
				</div>
				<div className="right">
					<h3>To</h3>
					<Dropdown options={options}
						onChange={(e) => { setTo(e.value) }}
						value={to} placeholder="To" />
				</div>
			</div>
			<div className="result">
				<button onClick={() => { convert() }}>Convert</button>
				<h2>Converted Amount:</h2>
				<p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
			</div>
		</div>
	);
}

export default App;
