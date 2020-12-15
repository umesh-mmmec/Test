import React, { Component } from "react";
import Router from './navigation'
import { Provider } from "react-redux";
import createStore from "./redux/store";

console.disableYellowBox = true;

export default class Main extends Component {
  render() {
    return <Provider store={createStore}><Router/></Provider>
  }
}