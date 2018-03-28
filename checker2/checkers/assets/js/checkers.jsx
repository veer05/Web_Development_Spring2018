import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

export default function game_init(root,channel) {
  ReactDOM.render(<Checkers channel={channel} />, root);
}
 
// Chat App Built using reference from 
//https://hexdocs.pm/phoenix/channels.html
//https://hexdocs.pm/phoenix/Phoenix.Channel.html
//https://sheharyar.me/blog/simple-chat-phoenix-elixir/

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
   //console.log("Before Channel");
   this.createSquares = this.createSquares.bind(this);
   this.leaveGame = this.leaveGame.bind(this);
   this.channel.join()
        .receive("ok", this.renderView.bind(this))
        .receive("error",resp => {console.log("unable to join",resp)});
    // Listening to move pawns and reset events so that it can be broadcasted
   this.channel.on("assignPlayerOne", payload => {this.setState(payload.game)})
   this.channel.on("assignPlayerTwo", payload => {this.setState(payload.game)})
    this.channel.on("movepawn", payload => {
    var p1wins = payload.game.p1Won;
    var p2wins = payload.game.p2Won;
 
    this.setState(payload.game)
    if(p1wins == true && p2wins == true){
      alert("Congratulations!The match is a draw");
      this.endGame();
    }
    if(p1wins==true && p2wins==false){
      alert("Congratulations!Player1 wins");
      this.endGame();
    }
    if(p2wins==true && p1wins==false){
      alert("Congratulations!Player2 wins");
      this.endGame();
    }})
       this.channel.on("Reset", payload => {
       alert(payload.msg)
       this.setState(payload.game)}) 


    this.channel.on("endGame", payload => {
    this.setState(payload.game)})
 }
 // WHen the player leaves the game
  leaveGame(){
    alert("Thank you for joining!")
    var msg ="one of the players has left the game!Thanks for joining!";
    this.setReset(msg);
    window.location.href = "http://checkers.veerm.com";
 }

 renderView(view){

    this.setState(view.game);
    //console.log("this is after render")
    //console.log(this.state)
  }
  //Create the squares 
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
 


// Move the pawn to valid pos
  movepawn(id,pawn_id,color){
    //console.log("This is Move Pawn")
    //console.log(window.userName)
    //console.log(this.state)
    if((this.state.player1 == window.userName && this.state.nextChance == "red" && color == "red") ||
       (this.state.player2 == window.userName && this.state.nextChance == "black" && color == "black")){  
    this.channel.push("movepawn", {id: id, pawn_id: pawn_id, color: color})
                .receive("ok", this.renderView.bind(this));
    }
  }

  // On Each click get valid squares
  pawnClicked(id,pawn_id,color,player)
  {
    var valid_pos1;
    var valid_pos2;
    let temp = this.state.validSquares
    if((this.state.player1 == window.userName && this.state.nextChance == "red" && color == "red") ||
       (this.state.player2 == window.userName && this.state.nextChance == "black" 
       && color == "black")){  
      this.channel.push("getNextPos", {id: pawn_id, color: color})
               .receive("ok", this.renderView.bind(this));
    }
    
 }

// If the player wants to reset the game
 setReset(msg){
    this.channel.push("Reset", {id: window.userName, msg: msg})
 }

// In case the player decides to leave the game
 endGame(){
   this.channel.push("endGame", {id: window.userName})
          .receive("ok", this.renderView.bind(this));
 }
 // Assigns Player1 to the game,
 setPlayerOne(){
  this.channel.push("assignPlayerOne", {id: window.userName})
          .receive("ok", this.renderView.bind(this));
 }
 // Assigns Player2 to the game,
  setPlayerTwo(){
  this.channel.push("assignPlayerTwo", {id: window.userName})
          .receive("ok", this.renderView.bind(this));
 }
// Displaying the board chat and the score component
  render()
  {
    var msg1 = "The game is being reset!";
    var msg2 = "One of the players has left the game!"
    let presentChance = this.state.nextChance;
    var isPlayer = false;
    if (this.state.player1 == window.userName || this.state.player2 == window.userName){
      isPlayer = true;
    }
    if (this.state.pawns.length != 0){
      return(
        <div>
          

          <div className = "row">

              <div className = "col-4">

                  <div class="card score-card">
                      <div class="card-body">
                          <h3 class="card-title text-center">Player 1 :</h3>
                          <h4 class= "text-center"> These are your pawns</h4>
                          <div className = "row">
                            <div className = "col-6">
                                <div className= "whitemarbleScore">
                                    <div className = "white scrpiece"></div>
                                </div>
                            </div>
                            <div className = "col-6">
                                <div className= "whitemarbleScore">
                                  <div className = "whiteking scrpiece"></div>
                                </div>
                            </div>
                          </div> 
                          <div className="row">
                            <div className = "col-6">
                                <div className= "scoredesc">
                                    Normal
                                </div>
                            </div>
                            <div className = "col-6">
                                <div className= "scoredesc">
                                     King 
                                </div>
                            </div>
                          </div>
                          <h4 className="text-center"> Pawns Remaining </h4>
                                <div className= "scorerem">
                                  <div className = "scrcircle">
                                    <p>{12 - this.state.p2Score}</p>
                                  </div>
                                </div>
                                <br/>
                                <br/>
                          <div className = "text-center">
                            {this.state.player1 == "none" ? 
                              <button className="btn btn-primary" onClick={this.setPlayerOne.bind(this)}>
                                    Join as Player 1
                                    </button> : null}
                          </div>
                          <div className = "text-center">
                              {(presentChance == "red" && this.state.player1 != "none") 
                           ? 
                           <h4> Player1's Turn </h4> : <h4 className = "invisible">Player1's Turn </h4>}
                          </div>
                      </div>
                  </div>
              
                  <div class="card score-card-black">
                      <div class="card-body">
                          <h3 class="card-title text-center">Player 2 :</h3>
                          <h4 class= "text-center"> These are your pawns</h4>
                          <div className = "row">
                            <div className = "col-6">
                                <div className= "whitemarbleScore">
                                    <div className = "black scrpiece"></div>
                                </div>
                            </div>
                            <div className = "col-6">
                                <div className= "whitemarbleScore">
                                  <div className = "blackking scrpiece"></div>
                                </div>
                            </div>
                          </div> 
                          <div className="row">
                            <div className = "col-6">
                                <div className= "scoredesc">
                                    Normal
                                </div>
                            </div>
                            <div className = "col-6">
                                <div className= "scoredesc">
                                     King 
                                </div>
                            </div>
                          </div>
                          <h4 className="text-center"> Pawns Remaining </h4>
                                <div className= "scorerem">
                                  <div className = "scrcircle">
                                    <p>{12 - this.state.p1Score}</p>
                                  </div>
                                </div>
                                <br/>
                          <div className = "text-center">
                            {this.state.player2 == "none" ? 
                              <button className="btn btn-primary" onClick={this.setPlayerTwo.bind(this)}>
                                    Join as Player 2
                                    </button> : null}
                          </div>
                          <div className = "text-center">
                              {(presentChance == "black" && this.state.player2 != "none") 
                           ? 
                           <h4> Player2's Turn </h4> : <h4 className = "invisible">Player1's Turn </h4>}
                          </div>
                      </div>
                  </div>

              </div>

              <div className = "col-8 ">
                  <div className =  "row align-text-center">
                      {this.state.player1 == "none" ?
                                <div className = "card player-details">
                                <div className = "card-body">
                                  <p> Player1 : Unassigned </p>
                                </div>
                                </div>
                  :
                          
                                <div className = "card player-details">
                                <div className = "card-body">
                                    <p>Player1 Name : {this.state.player1}</p>
                                </div>
                                </div>
                                }
                  </div>  
                  <br/>
                  <div className =  "row">
                    <div className = "containerboard tmp">
                      <div id="checkerbgboard">
                           {this.createSquares()}
                      </div>
                  </div>
                </div>
                  <br/>
                  <div className =  "row align-text-center">
                        {this.state.player2 == "none" ?
                               <div className = "card player-details">
                                <div className = "card-body">
                                  <p> Player 2 : Unassigned </p>
                                </div>
                                </div>
                  :
                                <div className = "card player-details">
                                <div className = "card-body">
                                    <p>Player2 Name : {this.state.player2}</p>
                                </div>
                                </div>
                              }
                  </div>  

                  <div className = "row">
                      <div className="col-md-6">
                          {isPlayer ? 
                                <button className="btn btn-info btn-lg" onClick={this.setReset.bind(this,msg1)}>
                                Reset </button>:null}
                      </div>
                      <div className="col-md-6 text-right" id='score'>
                              {isPlayer ? 
                              <button className="btn btn-danger  btn-lg" onClick={this.leaveGame.bind(this)}>
                              Leave Game
                              </button>
                              :
                              <a class="btn btn-danger  btn-lg" href="http://checkers.veerm.com" role="button">Leave Game</a>}
                      </div>
                  </div>
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

// Setting color to the square 
function getColor(id){
  switch(true){

    case((parseInt(id / 8)) % 2 == 0):
                                  if(id % 2 == 0)
                                  {
                                      return "white"; 
                                  }
                                  else
                                  {
                                      return "black"; 
                                  }
    case(id % 2 == 0):
                      return "black";

    default:
            return "white";

  } 

}

// Referes to each square component for the checker board
function EachCheck(props) {

  const {id, pawns}= props;
  let found = 'none'
  let p_id = 100
  var color ='';
  var highlight_Square = false;
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
  }
  
  var pieceClass = classnames(
               'empty':true,
              {'ghostwhite piece': (props.dict[id] !== undefined)},
              {'whiteking piece': (found === 'red') && (pawns.red[p_id].king) === true},
              {'blackking piece': (found === 'black') && (pawns.black[p_id].king) === true},
              {'white piece': (found === 'red') && (pawns.red[p_id].king === false)},
              {'black piece': (found === 'black') && (pawns.black[p_id].king === false)},
              );


  var hightlightclass = classnames(
          {'whitemarble_highlight': (color === "white") && highlight_Square},
          {'blackmarble_highlight': (color === "black") && highlight_Square},
          {'whitemarble': (color === "white")},
          {'blackmarble': (color === "black")}  
  );

  return (
          <div className= {hightlightclass}
            onClick={clickable ? () => props.movepawn(id, props.prevclick, props.player) : null}>
          <div className ={pieceClass} onClick={() => props.pawnClicked(id, p_id, found, props.player)}/>
          </div>
  );
}