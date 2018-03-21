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
       to_delete: {},         
   };
   console.log("Before Channel");
   this.channel.join()
        .receive("ok", this.renderView.bind(this))
        .receive("error",resp => {console.log("unable to join",resp)});
    this.getSquares = this.getSquares.bind(this);

 }



 renderView(view){

    console.log("inside render view");
    console.log(view.game);
    this.setState(view.game);
    console.log("after set state");
    console.log(this.state);
  
  }

  // TO CHANGE
  getSquares()
  {
    let allSquares = [];

    for(let i=0;i<64;i++)
    {
      let oneSquare = <Square id={i} key={i} pawns={this.state.pawns} prevclick={this.state.previously_clicked} player={this.state.previous_player} pawnClicked={this.pawnClicked.bind(this)} possibleNextMove={this.getNextMove.bind(this)}
      movepawn={this.movepawn.bind(this)}/>;
      allSquares.push(oneSquare);
    }

    return allSquares;
  }

  getNextMove(pawn,color){
    //console.log(pawn);
    let makepawns={};
    let dictmove1 = {};
    let dictmove2 = {}; 
    if(pawn.king == true){
      dictmove1 = this.getNextRedMove(pawn);
      dictmove2 = this.getNextBlackMove(pawn);
      Object.assign(makepawns,dictmove1,dictmove2)
    }
    else if (pawn.player_color == "red"){
      makepawns = this.getNextRedMove(pawn);
    }
    else {
      makepawns = this.getNextBlackMove(pawn);
    }
    //console.log("GetNextMove")
    //console.log(makepawns)
    return makepawns;
  }


  getNextRedMove(pawn){
    let dictmove = {};
    let makepawns=[];  
    let pawnlist = this.state.pawns;
    makepawns[0] = pawn.position + 7;    
    makepawns[1] = pawn.position + 9;

    //console.log("At getNextMove RED");
    if(pawn.position % 8 == 0){
        makepawns[0] = 100;
    }
    if((pawn.position+1) % 8 == 0){
        makepawns[1] = 100;
    }
    if(pawn.player_color == "black"){
        for(let i=0;i<12;i++)
      {   
        if(pawnlist.red[i].position == makepawns[0]){
            makepawns[0] = pawn.position + 14;    
              for(let i=0;i<12;i++)
                {
                 if(pawnlist.red[i].position == makepawns[0] || pawnlist.black[i].position == makepawns[0]|| ((makepawns[0] + 1) % 8 == 0)) {
                    makepawns[0] = 100        
                 } 
                }
          }
          else if(pawnlist.black[i].position == makepawns[0]){
            makepawns[0] = 100
          }
          if (pawnlist.red[i].position == makepawns[1]){
              makepawns[1] = pawn.position + 18;
                for(let i=0;i<12;i++)
                {
                 if(pawnlist.red[i].position == makepawns[1] || pawnlist.red[i].position == makepawns[1] ||(makepawns[1]) % 8 == 0){
                    makepawns[1] = 100        
                 } 
                }
          }   
          else if(pawnlist.black[i].position == makepawns[1]){
             makepawns[1] = 100
          }
      }
    }
    else{
      for(let i=0;i<12;i++)
      {   
        if(pawnlist.black[i].position == makepawns[0]){     
            makepawns[0] = pawn.position + 14;
              for(let i=0;i<12;i++)
                {
                 if(pawnlist.black[i].position == makepawns[0] || pawnlist.red[i].position == makepawns[0]|| ((makepawns[0] + 1) % 8 == 0)) {
                    makepawns[0] = 100        
                 } 
                }
          }
          else if(pawnlist.red[i].position == makepawns[0]){
            makepawns[0] = 100
          }
          if (pawnlist.black[i].position == makepawns[1]){
              makepawns[1] = pawn.position + 18;
                for(let i=0;i<12;i++)
                {
                 if(pawnlist.black[i].position == makepawns[1] || pawnlist.black[i].position == makepawns[1] ||(makepawns[1]) % 8 == 0){
                    makepawns[1] = 100        
                 } 
                }
          }   
          else if(pawnlist.red[i].position == makepawns[1]){
             makepawns[1] = 100
          }
      }
    }


    dictmove[makepawns[0]] = true;
    dictmove[makepawns[1]] = true;
    return dictmove;
  }

  getNextBlackMove(pawn){
    let dictmove={};
    let makepawns=[];  
    let pawnlist = this.state.pawns;
    makepawns[0] = pawn.position - 9;    
    makepawns[1] = pawn.position - 7;
    console.log("At getNextMove Black");
    
    
    if(pawn.position % 8 == 0){
        makepawns[0] = 100;
    }
    if((pawn.position+1) % 8 == 0){
        makepawns[1] = 100;
    }
    if (pawn.player_color == "red")
    {
      for(let i=0;i<12;i++)
      {   
        if(pawnlist.black[i].position == makepawns[0]){     
            makepawns[0] = pawn.position - 18;
              for(let i=0;i<12;i++)
                {
                 if(pawnlist.red[i].position == makepawns[0] || pawnlist.black[i].position == makepawns[0]|| ((makepawns[0] + 1) % 8 == 0)) {
                    makepawns[0] = 100        
                 } 
                }
          }
          else if(pawnlist.red[i].position == makepawns[0]){
            makepawns[0] = 100
          }
          if (pawnlist.black[i].position == makepawns[1]){
              makepawns[1] = pawn.position - 14;
                for(let i=0;i<12;i++)
                {
                 if(pawnlist.red[i].position == makepawns[1] || pawnlist.black[i].position == makepawns[1] ||(makepawns[1]) % 8 == 0){
                    makepawns[1] = 100        
                 } 
                }
          }   
          else if(pawnlist.red[i].position == makepawns[1]){
             makepawns[1] = 100
          }
      }
    }
    else{
    for(let i=0;i<12;i++)
      {   
        if(pawnlist.red[i].position == makepawns[0]){
            makepawns[0] = pawn.position - 18;    
              for(let i=0;i<12;i++)
                {
                 if(pawnlist.black[i].position == makepawns[0] || pawnlist.red[i].position == makepawns[0]|| ((makepawns[0] + 1) % 8 == 0)) {
                    makepawns[0] = 100        
                 } 
                }
          }
          else if(pawnlist.black[i].position == makepawns[0]){
            makepawns[0] = 100
          }
          if (pawnlist.red[i].position == makepawns[1]){
              makepawns[1] = pawn.position - 14;            
                for(let i=0;i<12;i++)
                {
                 if(pawnlist.black[i].position == makepawns[1] || pawnlist.red[i].position == makepawns[1] ||(makepawns[1]) % 8 == 0){
                    makepawns[1] = 100        
                 } 
                }
          }   
          else if(pawnlist.black[i].position == makepawns[1]){
             makepawns[1] = 100
          }
      }
    }
      dictmove[makepawns[0]] = true;
      dictmove[makepawns[1]] = true;
      return dictmove;
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
    var remove_pawn; 
    var rm_pawn;
    console.log("Breakthrough")
    switch(color){
      case("red"):
        remove_pawn = "black";
        if(id > 55){
          this.state.pawns[color][pawn_id].king = true
        }
        break;
      case("black"):
        remove_pawn = "red"
        
        if(id < 8){
          this.state.pawns[color][pawn_id].king = true
        }
        break;
    }
    console.log("First Switch")    
      switch(id){
          case (this.state.pawns[color][pawn_id].position + 14):
            console.log("Hit here +14")
            rm_pawn = this.pawnToRemove(remove_pawn, id - 7);
            console.log("Pawn to be Removed");
            console.log(rm_pawn);
            this.state.pawns[remove_pawn][rm_pawn.id].position = -100;
            break;
          case (this.state.pawns[color][pawn_id].position + 18):
            console.log("Hit here +18")
            rm_pawn = this.pawnToRemove(remove_pawn, id - 9);
            this.state.pawns[remove_pawn][rm_pawn.id].position = -100;
            break;
          case (this.state.pawns[color][pawn_id].position - 14):
            rm_pawn = this.pawnToRemove(remove_pawn, id + 7);
            this.state.pawns[remove_pawn][rm_pawn.id].position = -100;
            console.log("Hit here -14")
            break;
          case (this.state.pawns[color][pawn_id].position - 18):
            console.log("Hit here -18")
            rm_pawn = this.pawnToRemove(remove_pawn, id + 9);
            this.state.pawns[remove_pawn][rm_pawn.id].position = -100;
            break;
          default:
            console.log("Fail")
      }
      this.state.pawns[color][pawn_id].position = id        
      let temp = this.state.pawns;
      this.setState({pawns: temp})
      this.setState({previously_clicked:100})
      this.setState({previous_player:'none'})
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
    if (this.state.previously_clicked !== 100){
          this.setState({previously_clicked:100})
          this.setState({previous_player:'none'})  
    }
    else{
          this.setState({previously_clicked:pawn_id})
          this.setState({previous_player:color})
    }
    
    if(color == 'red')
    {
      selected_pawn = this.state.pawns.red[pawn_id];
      console.log(this.state.pawns.red[pawn_id].position+7)
      console.log(this.state.pawns.red[pawn_id].position+9)
    }
    else{
      selected_pawn = this.state.pawns.black[pawn_id]
      console.log(this.state.pawns.black[pawn_id].position-7)
      console.log(this.state.pawns.black[pawn_id].position-9)
    }

    //console.log(selected_pawn);
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
  let validmove = {};
  if (props.player == 'red'){
      let pawn = pawns.red[props.prevclick];
      //if (pawns.red[props.prevclick].position == id){
      validmove = props.possibleNextMove(pawn,color);
      //}
      if(validmove[id] !== undefined){
          //console.log(id)
          clickable = true;
          highlight_Square = true;
          normal_Square = false;
  }

  }
  else if(props.player == 'black'){
      let pawn = pawns.black[props.prevclick];
      let validmove = props.possibleNextMove(pawn,color); 
      //let position = pawns.black[props.prevclick].position; 
      //let validmove1 = position-7;
      //let validmove2 = position-9;
      if(validmove[id] !== undefined){
            clickable = true;
            highlight_Square = true;
            normal_Square = false;
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
  var hightlightclass = classnames(
          {'square': normal_Square},
          {'square_highlight': highlight_Square}  
  );

  return (
            <div className= {hightlightclass} style={{backgroundColor: color}} 
            onClick={clickable ? () => props.movepawn(id, props.prevclick, props.player) : null}>
              <div className ={className} onClick={() => props.pawnClicked(id, p_id, found)}/>
            </div>

  );
}