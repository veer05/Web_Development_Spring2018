import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

export default function game_init(root,channel) {
  console.log('In game_init Below is channel object');
  console.log(channel);
  ReactDOM.render(<Checkers channel={channel} />, root);
}
 
class Checkers extends React.Component {
 
  constructor(props) {
    super(props);
    this.channel = props.channel;
    this.state = {
       pawns: [],
       validSquares: {},         
   };
   console.log("Before Channel");
   this.getSquares = this.getSquares.bind(this);
   this.channel.join()
        .receive("ok", this.renderView.bind(this))
        .receive("error",resp => {console.log("unable to join",resp)});
 }

 renderView(view){

    this.setState(view.game);
  }

  getSquares()
  {
    let allSquares = [];
    for(let i=0;i<64;i++)
    {
      let oneSquare = <Square id={i} key={i} pawns={this.state.pawns} prevclick={this.state.previously_clicked} player={this.state.previous_player} pawnClicked={this.pawnClicked.bind(this)}
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

    this.channel.push("movepawn", {id: id, pawn_id: pawn_id, color: color})
                .receive("ok", this.renderView.bind(this));
  }

  pawnClicked(id,pawn_id,color,player)
  {
    var valid_pos1;
    var valid_pos2;
    this.setState({previously_clicked:pawn_id})
    this.setState({previous_player:color})
    console.log('Setting the Dict')
    let temp = this.state.validSquares

    if(this.state.nextChance === color){
      
      this.channel.push("getNextPos", {id: pawn_id, color: color})
               .receive("ok", this.renderView.bind(this));
    }
    
 }

  render()
  {
    if (this.state.pawns.length != 0){
      return(
         <div id="gameboard">
            {this.getSquares()}
          </div>
        );
      }
    else{
      return null;
    }
  }
}

function Square(props) {

  const {id, pawns}= props;
  let found = 'none'
  let p_id = 100
  var color ='';
  var highlight_Square = false;
  var normal_Square = true;
  if((parseInt(id / 8))%2==0)
  {   
    if(id % 2 == 0)
    {
      color = "BurlyWood";//1#9f0707
    }
    else
    {
      color = "#663300";//2#090909
    }
  } 
  else
  {
    if(id % 2 == 0)
    {
      color = "#663300";//2
    }
    else
    {
      color = "BurlyWood";//1
    }
  }
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