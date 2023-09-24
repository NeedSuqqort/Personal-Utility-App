import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import Footer from "./Footer";
import List from "./List";
import Row from 'react-bootstrap/Row'
// import React, { useState } from "react";

const App = () => {
    let list = new List();
    //console.log(localStorage);
    //list.loadList(Object.keys(localStorage));
    //console.log(list.state.list);
    window.addEventListener("unload",list.saveList());
    return(
      <div>
        <Row id="header">
            NeedSupport's Personal Utility App
        </Row>
        <hr />
        <List></List>
        <Footer></Footer>
      </div>
    );
}

export default App;