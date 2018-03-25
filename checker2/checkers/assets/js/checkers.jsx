import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

export default function game_init(root,channel) {
  ReactDOM.render(<Checkers channel={channel} />, root);
}
 
class Checkers extends React.Component {
 
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
       pawns: [],
       validSquares: {},
       player1: null,
       player2: null,
       spectator: false,         
   };
   console.log("Before Channel");
   this.createSquares = this.createSquares.bind(this);
   this.channel.join()
        .receive("ok", this.renderView.bind(this))
        .receive("error",resp => {console.log("unable to join",resp)});
   this.channel.on("assignPlayerOne", payload => {this.setState(payload.game)})
   this.channel.on("assignPlayerTwo", payload => {this.setState(payload.game)})
   this.channel.on("movepawn", payload => {this.setState(payload.game)}) 
   this.channel.on("Reset", payload => {this.setState(payload.game)}) 
   //this.channel.on("movepawn", resp => {this.render.bind(this)})
   //this.channel.on("getNextPos", payload => {this.setState(payload.game)})
   //this.channel.on("movepawn", {id: id, pawn_id: pawn_id, color: color})
   //       .receive("ok", this.renderView.bind(this)); 
 }

 render(view){
    console.log('Hit render')
    this.setState(view.game);
    console.log("this is after")
    console.log(this.state)
  }

 renderView(view){

    this.setState(view.game);
    console.log("this is after render")
    console.log(this.state)
  }

  createSquares()
  {
    let allSquares = [];
    for(let i=0;i<64;i++)
    {
      let oneSquare = <EachCheck id={i} key={i} pawns={this.state.pawns} prevclick={this.state.previously_clicked} player={this.state.previous_player} pawnClicked={this.pawnClicked.bind(this)}
      dict = {this.state.validSquares}
      movepawn={this.movepawn.bind(this)}/>;
      allSquares.push(oneSquare);
    }
    return allSquares;
  }

  pawnToRemove(remove_pawn, pos){
    let pawnlist = this.state.pawns;
    for(let i =0;i<12;i++){
      if(pawnlist[remove_pawn][i].position == pos)
      {
        return pawnlist[remove_pawn][i]
      }
    }
  }

  movepawn(id,pawn_id,color){
    console.log("This is Move Pawn")
    console.log(window.userName)
    console.log(this.state)
    if((this.state.player1 == window.userName && this.state.nextChance == "red" && color == "red") ||
       (this.state.player2 == window.userName && this.state.nextChance == "black" && color == "black")){  
    this.channel.push("movepawn", {id: id, pawn_id: pawn_id, color: color})
                .receive("ok", this.renderView.bind(this));
    }
  }

  pawnClicked(id,pawn_id,color,player)
  {
    var valid_pos1;
    var valid_pos2;
    this.setState({previously_clicked:pawn_id})
    this.setState({previous_player:color})
    //console.log('Setting the Dict')
    let temp = this.state.validSquares
    console.log("This is pawnCLicked")
    console.log(this.state)
   //if(this.state.nextChance === color){
    if((this.state.player1 == window.userName && this.state.nextChance == "red" && color == "red") ||
       (this.state.player2 == window.userName && this.state.nextChance == "black" 
       && color == "black")){  
      this.channel.push("getNextPos", {id: pawn_id, color: color})
               .receive("ok", this.renderView.bind(this));
    }
    
 }

 setReset(){
    this.channel.push("Reset", {id: window.userName})
          .receive("ok", this.renderView.bind(this));
 }
 setPlayerOne(){
  this.channel.push("assignPlayerOne", {id: window.userName})
          .receive("ok", this.renderView.bind(this));
 }

  setPlayerTwo(){
  this.channel.push("assignPlayerTwo", {id: window.userName})
          .receive("ok", this.renderView.bind(this));
 }

  render()
  {

    var isPlayer = false;
    if (this.state.player1 == window.userName || this.state.player2 == window.userName){
      isPlayer = true;
    }
    
    if (this.state.p1Score == 12 || this.state.p2Score == 12)
    {
      setTimeout(() => {
              alert("Congrats you have completed the game \n" + 
              "Your Winner is :")
              this.setReset();
      }, 1000);
    }
    if (this.state.pawns.length != 0){
      return(
        <div>
          <div className="text-center">
              {this.state.player1 == "none" ?
              <span>
              <p> This Player will control  the red pawns </p>
              <button class="btn btn-primary" onClick={this.setPlayerOne.bind(this)}>
                  Join as Player 1
              </button>
              </span> 
              :null}
          </div>
          <br/>

          <div class="row justify-content-between">
            
            <div class="col-2 d-flex align-items-center" >
              {this.state.player1 == "none" ? null :
                  <span>  
                  <h2> Welcome,</h2>
                  <h3>{this.state.player1}</h3>
                  <h3> Playing as color : Red </h3>
                  <p> Pawns Removed </p>
                  <p> {this.state.p1Score}</p>
                  </span>}
            </div>
            
            <div class="col-8"> 
              <div id="checkerbgboard">
                  {this.createSquares()}
              </div>
            </div>
            
            <div class="col-2 d-flex align-items-center">
              {this.state.player2 == "none" ? null : 
                  <span>
                  <h2> Welcome,</h2>
                  <h3>{this.state.player2}</h3>
                  <h3> Playing as color : Black </h3>
                  <p> Pawns Removed </p>
                  <p>{this.state.p2Score}</p> 
                  </span>}
            </div>

          </div>
          <br/>
          <div className="text-center">
              {this.state.player2 == "none" ?
              <span>
              <p> This Player gets the black pawns</p>
              <button class="btn btn-primary" onClick={this.setPlayerTwo.bind(this)}>
                      Join as Player 2
              </button>
              </span>
              :null}
          </div>
          <div className = "row">
              <div className="col-md-6">
                  {isPlayer ? 
                  <button class="btn btn-primary" onClick={this.setReset.bind(this)}>
                      Reset
                  </button>
                  :null}
              </div>
              <div className="col-md-6 text-right" id='score'>
                    <button class="btn btn-primary" onClick={this.setPlayerTwo.bind(this)}>
                      Leave the Game
                    </button>
              </div>
          </div>

        </div>
        );
      }
    else{
      return null;
    }
  }
}

function getColor(id){
  switch(true){

    case((parseInt(id / 8)) % 2 == 0):
                                  if(id % 2 == 0)
                                  {
                                      return "#d5c8b8"; //1#9f0707
                                  }
                                  else
                                  {
                                      return "#353230"; //2#090909
                                  }
    case(id % 2 == 0):
                      return "#353230";

    default:
            return "#d5c8b8";

  } 

}

function EachCheck(props) {

  const {id, pawns}= props;
  let found = 'none'
  let p_id = 100
  var color ='';
  var highlight_Square = false;
  var normal_Square = true;
  var color = getColor(id);
  var clickable = false;
  for(let i=0;i<12;i++)
  {
        if(pawns.red[i].position === id) {
            found = 'red'
            p_id  = pawns.red[i].id 
        }
        else if (pawns.black[i].position === id){
            found = 'black'
            p_id = pawns.black[i].id
        }
  } 
  if(props.dict[id] !== undefined){
          clickable = true;
          highlight_Square = true;
          normal_Square = false;
  }
  var className = classnames(
               'empty':true,
              {'red pawn king': (found === 'red') && (pawns.red[p_id].king) === true},
              {'black pawn king': (found === 'black') && (pawns.black[p_id].king) === true},
              {'red pawn': (found === 'red') && (pawns.red[p_id].king === false)},
              {'black pawn': (found === 'black') && (pawns.black[p_id].king === false)},
              );
  var hightlightclass = classnames(
          {'square': normal_Square},
          {'square_highlight': highlight_Square}  
  );
  return (
          <div className= {hightlightclass} style={{backgroundColor: color}} 
            onClick={clickable ? () => props.movepawn(id, props.prevclick, props.player) : null}>
          <div className ={className} onClick={() => props.pawnClicked(id, p_id, found, props.player)}/>
          </div>
  );
}