import React from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

export default function checker_init(root) {
  ReactDOM.render(<Checkers />, root);
}

function fill_info_p1()
  {
    let makepawns=[];
    let newarray = [1,3,5,7,8,10,12,14,17,19,35,23]; 
    

    for(let i=0;i<12;i++)
    {
      let pawn={
        id:i,
        player_color:'red',
        position:newarray[i],
        defeated:false,
        king:false,};
        makepawns.push(pawn);
    }
  return makepawns;

}

function fill_info_p2()
  {
    let makepawns=[];
    let newarray = [40,42,44,46,49,51,53,55,56,58,60,62]; 
    

    for(let i=0;i<12;i++)
    {
      let pawn={
        id:i,
        player_color:'black',
        position:newarray[i],
        defeated:false,
        king:false,};
        makepawns.push(pawn);
    }
  return makepawns;

}

class Checkers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
       pawns: {
            red: fill_info_p1(),
            black: fill_info_p2()
       },
       previosly_clicked:100,
       previous_player:'none'            
   };
   //getSquare()
   this.getSquares = this.getSquares.bind(this);

 }


  getSquares()
  {
    let allSquares = [];

    for(let i=0;i<64;i++)
    {
      let oneSquare = (<Square id={i} key={i} pawns={this.state.pawns} prevclick={this.state.previosly_clicked} player={this.state.previous_player} pawnClicked={this.pawnClicked.bind(this)}
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

    this.setState({previosly_clicked:pawn_id})
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
    let squares = this.getSquares();

    return(
            <div id="gameboard">
            {squares} 
            </div>
          );
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
  //console.log(props.prevclick);
  //console.log("Inside Square Function")
  //console.log(props.player);

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
  //  console.log(found)
  //  console.log(p_id)
 //Attribution: 
  var className = classnames(
               'empty':true,
              {'red pawn king': (found === 'red') && (pawns.red[p_id].king) === true},
              {'black pawn king': (found === 'black') && (pawns.black[p_id].king) === true},
              {'red pawn': (found === 'red') && (pawns.red[p_id].king === false)},
              {'black pawn': (found === 'black') && (pawns.black[p_id].king === false)},
              );
  //var hightlightclass = classnames{
  //        'squrare'  
 // }

  return (
            <div className="square" style={{backgroundColor: color}} 
            onClick={clickable ? () => props.movepawn(id, props.prevclick, props.player) : null}>
              <div className ={className} onClick={() => props.pawnClicked(id, p_id, found)}/>
            </div>

  );
}