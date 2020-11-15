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
    if(!this.state.value || this.state.value == '') {
      this.setState({
        short: '',
      })
      return;
    }
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
            <input type="url" value={this.state.value} onChange={this.handleChange} placeholder="Enter an URL to encode"/>
          </label>
          <br></br>
          <input type="submit" value="Encode" className="btn"/>
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
      <>
      <h3>All URL</h3>
      </>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">
          Encode URL
        </h1>
          <Form />
      </header>
      <div className="previous-data-wrap">
        <PreviousData />
      </div>
    </div>
  );
}

export default App;
