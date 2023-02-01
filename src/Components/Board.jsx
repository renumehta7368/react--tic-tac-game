import  { Component } from "react";
import Box from "./Board-box";
import './Styles/box.css'
import './Styles/board.css'
import * as utils from './utils/Utility'
class Board extends Component{
    constructor(props){
        super(props)
        //initialise the coponent state
        //array of 9 elements that are fillend wih none
        this.state = {
            boxes:Array(9).fill(null),
            history :[],
            xIsNext: true
        }
    }
    //function when the box is clicked
    handelBoxClicked(index) {
       //create the copy of the state
        const boxes = this.boxes.slice()
        //get current state of the history
        //cheak for no duble clicks
        if(boxes[index] != null){
            return
        }
        let history = this.state.history
       //stop the game if board has winning combination

   if (utils.findWinner(boxes)){
    return
   }
   if (utils.areAllBoxesClicked(boxes) == true){
    return
   }
       //stop the game if all boxes are clicked or filled

       // mark the box either x or o 

   boxes [index] = this.state.xIsNext ? 'x' : 'o'
       //add the moves to the history
       history.push(this.state.xIsNext ? 'x' : 'o')
       
       //update the state with the new data
       this.setState({
        boxes: boxes,
        history: history,
        xIsNext: !this.state.xIsNext
       })
       //handle game restart
       

    }
    handleBoardRestart(){
        this.setState({
            boxes:Array(9).fill(null),
            history:[],
            xItNext:true
        })
    }
    render(){
        //get the winner if there is any winner
        const winner = utils.findWinner(this.state.boxes)
        //if all the boxes are filled or not 
        const isFilled = utils.areAllBoxesClicked(this.state.boxes)
        let status 
        if (winner){
            status = `the winner is${winner}`
        }else if (~winner && isFilled ){
            status = 'Game Drawn'
        }else{
            status = `its ${this.status.xIsNext ? 'x' :'0'} turn`
        }
        <div>

        </div>
       
            return(
            <div className="board-wrapper">
                <div className="board">
                    <h2 className="board-heading">{status}</h2>
                <div className="board-row">
                    <Box value={this.state.boxes[0]} 
                    handelBoxClicked={()=> this.handelBoxClicked(0)}/>
                    <Box value={this.state.boxes[1]} 
                     handelBoxClicked={()=> this.handelBoxClicked(1)}/>
                    <Box value={this.state.boxes[2]} 
                     handelBoxClicked={()=> this.handelBoxClicked(2)}/>
                </div> 
                <div className="board-row">
                    <Box value={this.state.boxes[3]} 
                    handelBoxClicked={()=> this.handelBoxClicked(3)}/>
                    <Box value={this.state.boxes[4]} 
                     handelBoxClicked={()=> this.handelBoxClicked(4)}/>
                    <Box value={this.state.boxes[5]} 
                     handelBoxClicked={()=> this.handelBoxClicked(5)}/>
                </div> 
                <div className="board-row">
                    <Box value={this.state.boxes[6]} 
                    handelBoxClicked={()=> this.handelBoxClicked(6)}/>
                    <Box value={this.state.boxes[7]} 
                     handelBoxClicked={()=> this.handelBoxClicked(7)}/>
                    <Box value={this.state.boxes[8]} 
                     handelBoxClicked={()=> this.handelBoxClicked(8)}/>
                </div> 
                </div>
                {/*history of moves */}
                <ul className="board-historyList">
                    {this.state.history.length == 0 && (
                        <span>no moves to show</span>
                    )}
                    {
                      this.state.history.length !== 0 && 
                      this.state.history.map(( move,index )=> {
                        return(
                            <li>Move {index + 1}: <strong>{move}</strong></li>
                        )
                      })
                    }
                </ul>
            
              
              {winner &&(
                  <button className="btn"
                  onClick={this.handleBoardRestart}
                     > start new game </button>  
                       )}
               </div>        
        
    }
}
export default Board