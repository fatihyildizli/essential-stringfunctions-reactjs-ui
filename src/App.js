import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import icon from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: [],
      loading: true,
      error: false,
      func: ''
    };
    this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
    this.inputData = this.inputData.bind(this);
  }


  inputData(e) {
    this.setState({
      func: e
    });
    console.log(this.state.func);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
    console.log(this.state.value);
  }

  handleButtonSubmit = () => {

    var bodyFormData = new FormData();
    bodyFormData.set('input', this.state.value);

    var config = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      responseType: "text"
    };

    axios({
      method: 'post',
      url: `https://essentialfy.herokuapp.com/${this.state.func}`,
      data: bodyFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
        config: config
      }
    }).then(res => {
      const data = res.data;

      this.setState({
        data
      });
    })
      .catch(err => {
        this.setState({ loading: false, error: true });
      });
  };


  render() {
    const { data, value } = this.state;

    const ButtonSummit = () => {
      return (
        <button
          className="btn btn-dark btn-lg"
          onClick={this.handleButtonSubmit}
          type="submit"
        >
          Execute
        </button>
      );
    };
    const Header = () => {
      return (
        <div class="container">
          <div class="row">
            <div class="col-sm">
            </div>
            <div class="col-sm ">
              <img src={icon} />
              <center><b> ESSENTIALFY </b> </center>
              <center><small>Backend: Flask -  Frontend: Reactjs</small></center>
            </div>
            <div class="col-sm">

            </div>
          </div>
        </div>

      );
    };

    const Output = (data) => {
      return (

        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text btn-danger" style={{ backgroundColor: '#dc3545', color: 'white' }}>Output</span>
          </div>
          <textarea class="form-control" readOnly={true} aria-label="With textarea" onChange={e => this.onChange(e)} value={this.state.data}></textarea>
        </div>

      )
    };

    const Menu = () => {
      return (
        <div class="input-group-prepend">
          <button class="btn btn-outline-secondary dropdown-toggle btn-lg btn-block" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.func.length > 0 ? this.state.func : "Please Select Function"}</button>
          <div class="dropdown-menu">
            <a class="dropdown-item" onClick={() => this.inputData('length')}>String Length</a>
            <a class="dropdown-item" onClick={() => this.inputData('binary')}>String to Binary</a>
            <a class="dropdown-item" onClick={() => this.inputData('removewhitespace')}>String Remove Whitespace</a>
            <a class="dropdown-item" onClick={() => this.inputData('encode')}>String Encode</a>
            <a class="dropdown-item" onClick={() => this.inputData('decode')}>String Decode</a>
            <a class="dropdown-item" onClick={() => this.inputData('base64encode')}>String to Base64</a>
            <a class="dropdown-item" onClick={() => this.inputData('base64decode')}>Base64 to String </a>
            <a class="dropdown-item" onClick={() => this.inputData('encodehex')}>String to HEX </a>
          </div>

        </div>


      )
    };


    return (
      <div className="container">
        <div className="row">
          <Header />
          <div class="input-group -lg">
            <Menu />
            <input
              type="text"
              className="col-md-6"
              aria-describedby="search"
              onChange={e => this.onChange(e)}
              placeholder="to type a string.."
            />
            <ButtonSummit />
          </div>
        </div>
        <br />
        <div className="row">
          <Output data={this.state.data ? "" : this.state.data} />
        </div>
      </div>
    )

  };
}

export default App;
