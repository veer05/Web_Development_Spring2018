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
   this.channel.on("assignPlayer", payload => {this.setState(payload.game)})
   this.channel.on("movepawn", payload => {this.setState(payload.game)})
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
    if((this.state.player1 == window.userName && this.state.nextChance == "red") ||
       (this.state.player2 == window.userName && this.state.nextChance == "black")){  
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

 setPlayer(){
  this.channel.push("assignPlayer", {id: window.userName})
          .receive("ok", this.renderView.bind(this));
 }

  render()
  {
    if (this.state.pawns.length != 0){
      return(
        <div>
         <button className="primary-btn" onClick={this.setPlayer.bind(this)}>
          Join the game
          </button>
         <div id="gameboard">
            {this.createSquares()}
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
                                      return "#d5c8b8";//1#9f0707
                                  }
                                  else
                                  {
                                      return "#353230";//2#090909
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