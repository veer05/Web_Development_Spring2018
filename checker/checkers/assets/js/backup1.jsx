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
       
       previously_clicked:-1,
       previous_player:'hello'            
   };
   //getSquare()
   console.log("Before Channel");
   this.channel.join()
        .receive("ok", this.gotView.bind(this))//this.gotView.bind(this))
        .receive("error",resp => {console.log("unable to join",resp)});

    //this.getSquares = this.getSquares.bind(this);

 }


 gotView(view){

    console.log("inside got view");
    console.log(view);
    this.setState(view.game);
    //console.log("after set state");
    //console.log(this.state);

  
  }

  getSquares()
  {
    let allSquares = [];
    console.log("in getsquare");
    console.log(this.state);

    for(let i=0;i<64;i++)
    {
      let oneSquare = (<Square id={i} key={i} pawns={this.state.pawns} prevclick={this.state.previously_clicked} player={this.state.previous_player} pawnClicked={this.pawnClicked.bind(this)}
      movepawn={this.movepawn.bind(this)}/>);
      allSquares.push(oneSquare);
    }

    return allSquares;
  }

  movepawn(id,pawn_id,color){
    console.log("Breakthrough")

    console.log(pawn_id)
    if (color == 'red'){
        console.log(this.state.pawns.red[pawn_id].position)
        this.state.pawns.red[pawn_id].position = id;
        let temp = this.state.pawns
        this.setState({pawns: temp});
    }else{
        console.log(this.state.pawns.red[pawn_id].position)
    }
  }

  pawnClicked(id,pawn_id,color)
  {

    console.log("At Square Position")
    console.log(id)
    console.log("pawn clicked");
    console.log(pawn_id)
    console.log("pawn color");
    console.log(color)
    
    var valid_pos1;
    var valid_pos2;

    // Get the Pawn Object 
    var selected_pawn;
    var valid_move1;
    var valid_move2;

    this.setState({previously_clicked:pawn_id})
    this.setState({previous_player:color})
    
    if(color == 'red')
    {
      selected_pawn = this.state.pawns.red[pawn_id];
      console.log(this.state.pawns.red[pawn_id].position+7)
      console.log(this.state.pawns.red[pawn_id].position+9)
    }
    else{
      selcted_pawn = this.state.pawns.black[pawn_id]
      console.log(this.state.pawns.black[pawn_id].position-7)
      console.log(this.state.pawns.black[pawn_id].position-9)
    }

    console.log(selected_pawn);
  }
  
  render()
  {
   // let squares = this.getSquares.bind(this);
    //this.channel.join()
    //    .receive("ok", this.gotView.bind(this))//this.gotView.bind(this))
    //    .receive("error",resp => {console.log("unable to join",resp)});
    // if (this.state.previously_clicked === -1){
    //      return(
    //        <div >
    //        meh 
    //        </div>
    //      );
   // }
  
    //else
    //{ 
    return(
            <div>
            kousthubh 
            </div>
          );
    /*return(
            <div id="gameboard">
            {squares} 
            </div>
          );*/
  //}
  }
}

function Square(props) {
  const {id, pawns}= props;
  let found = 'none'
  let p_id = 100
  var color ='';

  if((parseInt(id / 8))%2==0)
  {
    
    if(id % 2 == 0)
    {
      color = "BurlyWood";
    }
    else
    {
      color = "#663300";
    }
  } 
  else
  {
    if(id % 2 == 0)
    {
      color = "#663300";
    }
    else
    {
      color = "BurlyWood";
    }
  }
  
  var clickable = false;
  if (props.player == 'red'){
      let position = pawns.red[props.prevclick].position; 
      let validmove1 = position+7;
      let validmove2 = position+9;
      if(validmove1 === id || validmove2 === id){
          clickable = true;
      }

  }
  else if(props.player == 'black'){
      let position = pawns.black[props.prevclick].position; 
      let validmove1 = position-7;
      let validmove2 = position-9;
      if(validmove1 == id || validmove2 == id){
            clickable = true;
      }
  }

  console.log("in square functin");
  console.log(pawns.red);
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
  var className = classnames(
               'empty':true,
              {'red pawn king': (found === 'red') && (pawns.red[p_id].king) === true},
              {'black pawn king': (found === 'black') && (pawns.black[p_id].king) === true},
              {'red pawn': (found === 'red') && (pawns.red[p_id].king === false)},
              {'black pawn': (found === 'black') && (pawns.black[p_id].king === false)},
              );

  return (
            <div className="square" style={{backgroundColor: color}} 
            onClick={clickable ? () => props.movepawn(id, props.prevclick, props.player) : null}>
              <div className ={className} onClick={() => props.pawnClicked(id, p_id, found)}/>
            </div>

  );
}