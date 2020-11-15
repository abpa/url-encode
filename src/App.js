import './App.css';
import React from 'react';

// todo take from .env
const BASE_URL = 'http://127.0.0.1:5000'
const SHORTEN_API_URL = `${BASE_URL}/shorten`
const FETCH_ALL_API_URL = `${BASE_URL}/all`

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      short: null,
      count: 0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.setState({
      fetching: true
    })
    //api call
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    const response = await fetch(SHORTEN_API_URL, {
      method: 'post',
      body: JSON.stringify({
        'url': this.state.value
      }),
      mode: 'cors',
      headers: headers
    }).catch(e => {
      console.log(e)
    });
    
    const data = await response.json();
    await this.setState({
      short: data,
      fetching: false,
      count: this.state.count + 1
    })
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="shorten-form">
          <label>
            <input type="url" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Shorten this" className="btn"/>
        </form>
        <div>
          <>
          {
            this.state.fetching? <div>Fetching...</div>: null
          }
          </>
          <>
          {
            !this.state.short? null: <div className="redirect-box"><a className="redirect-link" href={this.state.short.result}>{this.state.short.result}</a></div> 
          }
          </>
        </div>
      </>
    );
  }
}

class PreviousData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    
    return (
      <></>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Enter a URL below to shorten
        </p>
          <Form />
          <PreviousData />
      </header>
    </div>
  );
}

export default App;
