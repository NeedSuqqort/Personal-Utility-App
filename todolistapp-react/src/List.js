import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

class List extends Component{
    constructor(props){
        super(props);
        this.state = {userInput:"", list:this.loadList(Object.keys(localStorage))};
        this.curId = this.state.list.length;
    }
    
    updateInput(val){
        this.setState({userInput:val});
    }

    addItem(){
        if(this.state.userInput!==""){
            const userInput = {id:++this.curId,val:this.state.userInput};
            const list = [...this.state.list];
            list.push(userInput);
            this.setState({list,userInput:""},this.saveList);
        }
    }

    deleteItem(key){
        const list = [...this.state.list];
        const updatedList = list.filter((item)=>item.id!==key);
        this.setState({list:updatedList},this.saveList);
    }

    editItem = (index) => {
        const todolist = [...this.state.list];
        const editedList = prompt("Edit your Todo here: ");
        if(editedList !== null && editedList.trim() !== ""){
              let updated = [...todolist];
              updated[index].val = editedList;
              this.setState({list:updated},this.saveList);
        }
    
    }

    addByEnter = (event) => {
        if(event.keyCode === 13){
          this.addItem();
        }
    }

    saveList(){
        localStorage.clear();
        const list = [...this.state.list];
        console.log(list);
        for(let i=0; i<list.length; i++){
            localStorage.setItem(JSON.stringify(list[i].id),list[i].val);
        }
    }

    loadList(list){
      let loaded = [];
      for(let i=0; i<list.length; i++){
          const item = localStorage.getItem(list[i]);
          loaded.push({id:JSON.parse(list[i]),val:item});
      } 
      loaded = [...loaded].sort((a,b) => a.id > b.id ? 1 : -1);
      return loaded;
    }

    createItem = (item,index) => {
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
    }

    render(){
      return(
      <div>
        <Container id="base">
          <Row>
            <Col md={{span:4,offset:3}}>
              <InputGroup className="mb-4">
                <FormControl placeholder="Enter your todo..." 
                size="lg" 
                value={this.state.userInput}
                onChange={(item)=>this.updateInput(item.target.value)}
                onKeyDown={this.addByEnter}
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
                {this.state.list.map(this.createItem)}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </div>
      );
    }
}

export default List;