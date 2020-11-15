import './App.css';
import React from 'react';
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

  handleSubmit(event) {
    //api call
    this.setState({
      short: this.state.value,
      count: this.state.count + 1
    })
    event.preventDefault();
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
          {
            !this.state.short? null: <div>{this.state.count}</div> 
          }
        </div>
      </>
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
      </header>
    </div>
  );
}

export default App;
