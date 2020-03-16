import React, { Component } from "react";

export default class App extends Component {
  state = {
    title: "Simple Curd Operation",
    datas: [],
    act: 0,
    index: "",
    name: "",
    address: ""
  };

  componentDidMount() {
    this.refs.name.focus();
  }

  onInputChange = e => {
    if (e.target.name === "name") {
      this.setState({ name: e.target.value });
    } else {
      this.setState({ address: e.target.value });
    }
  };

  onFormSubmit = e => {
    e.preventDefault();
    let datas = this.state.datas;
    let name = this.state.name;
    let address = this.state.address;
    if (this.state.act === 0) {
      //new List
      let data = {
        name,
        address
      };
      datas.push(data);
      this.setState({
        datas: datas
      });
    } else {
      //update List
      let index = this.state.index;
      datas[index].name = name;
      datas[index].address = address;
    }
    this.setState({ datas: datas, act: 0, name: "", address: "" });
    this.refs.name.focus();
  };
  editList(i) {
    let data = this.state.datas[i];
    this.refs.name.focus();
    this.setState({
      name: data.name,
      address: data.address,
      index: i,
      act: 1
    });
  }

  removeList(i) {
    let datas = this.state.datas;
    datas.splice(i, 1);
    this.setState({
      datas: datas
    });
  }

  renderList() {
    return this.state.datas.map((data, i) => {
      return (
        <li className="my-list" key={i}>
          {i + 1}. {data.name} {data.address}
          <button className="edit" onClick={() => this.editList(i)}>
            Edit
          </button>
          <button className="remove" onClick={() => this.removeList(i)}>
            Remove
          </button>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="App">
        <h1 className="heading">{this.state.title}</h1>
        <form className="myForm" refs="myForm" onSubmit={this.onFormSubmit}>
          <input
            className="field"
            name="name"
            type="text"
            ref="name"
            placeholder="Enter Your Name"
            value={this.state.name}
            onChange={this.onInputChange}
          />
          <input
            className="field"
            name="address"
            type="text"
            value={this.state.address}
            ref="address"
            placeholder="Enter Your Address"
            onChange={this.onInputChange}
          />
          <button type="submit" onClick={this.onFormSubmit}>
            Submit
          </button>
        </form>
        <div>
          <ul>{this.renderList()}</ul>
        </div>
        thanks
      </div>
    );
  }
}
