import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import './App.css';
import Footer from "./Footer";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {userInput:"", list:[],};
    }
    
    updateInput(val){
        this.setState({userInput:val,});
    }

    addItem(){
        if(this.state.userInput!==""){
            const userInput = {id:Math.random(),val:this.state.userInput};
            const list = [...this.state.list];
            list.push(userInput);
            this.setState({list,userInput:""});
    
        }
    }

    deleteItem(key){
        const list = [...this.state.list];
        const updatedList = list.filter((item)=>item.id!==key);
        this.setState({list:updatedList});

    }

    editItem = (index) => {
        const todolist = [...this.state.list];
        const editedList = prompt("Edit your Todo here: ");
        if(editedList !== null && editedList.trim() !== ""){
              let updated = [...todolist];
              updated[index].val = editedList;
              this.setState({list:updated,});
        }

    }

    addbyenter = (event) => {
        if(event.keyCode === 13){
          this.addItem();
        }
    }
    
    render(){
      return(
      <div>
        <Container id="base">
          <Row id="header">
              NeedSupport's first TodoList
          </Row>
          <hr />
          <Row>
            <Col md={{span:4,offset:3}}>
              <InputGroup className="mb-4">
                <FormControl placeholder="Enter your todo..." 
                size="lg" 
                value={this.state.userInput}
                onChange={(item)=>this.updateInput(item.target.value)}
                onKeyDown={this.addbyenter}
                >
                </FormControl>  
                <InputGroup>
                  <Button variant="dark" className="mt-3" onClick={()=>this.addItem()}>
                    Add Todo
                  </Button>
                </InputGroup>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col md={{span:4,offset:3}}>
              <ListGroup>
                {this.state.list.map((item,index) => {
                  return(
                    <div key={index}>
                      <ListGroup.Item
                        id="todo">
                          {item.val}
                          <span>
                            <Button id="edit"
                              variant="light"
                              onClick={() => this.editItem(index)}>
                                Edit
                            </Button>
                            <Button id="delete"
                              variant="light"
                              onClick={() => this.deleteItem(item.id)}>
                                Delete
                            </Button>
                          </span>
                        </ListGroup.Item>
                    </div>
                  );
                })}
              </ListGroup>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
      );
    }
}

export default App;