import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function init(root) {
  ReactDOM.render(<MainClass />, root);
}

const tileAlphabet= ['A','B','C','D','E','F','G','H','A','B','C','D','E','F','G','H'];


//This is taken from stackoverflow for shuffling array elements
function shuffleArray(array) {
  let i = array.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}


//A TIle is a {id:number, key: Alphabet, matched:Boolean,clicked:Boolean}

function makeTile()
  {
    let makeTile=[];
    let newarray = shuffleArray(tileAlphabet); 
    

    for(let i=0;i<16;i++)
    {
      let tile={
        id:i,
        key:newarray[i],
        matched:false,
        clicked:false,};
      makeTile.push(tile);
    }return makeTile;
  }


// A State is represented by {tiles[]:List of tiles, count:numner,
//				tileclickedId:number,matchCount:number,halt:Boolean,clicks:number}

class MainClass extends React.Component{
        constructor(props){
                super(props);

                this.state = {
                             tiles:makeTile(),
                             count:0,
			     			 tileclickedId:100,
			     			 matchCount:8,
			     			 halt:false,
			     			 clicks:0,
                             };
        }
    

 // CODE Reference made from Nat's Notes for TodoList
 markItem(name) {
 	if (this.state.halt === false){
 	this.state.clicks += 1;
 	let temp = this.state.tiles;
 	let index = this.state.tileclickedId;
 	if  (this.state.count === 0){
   		let xs = _.map(this.state.tiles, (tile) => {
     		if (tile.id === name) {
				this.setState({tileclickedId:tile.id});
        		return _.extend(tile, {clicked: true});
     		}
      		else 
      		{
        		return tile;
      		}});
    		this.setState({tiles: xs});
    		this.setState({count:1});
  	}
  	else{
  		this.state.tiles[name].clicked = true;
  		if(this.state.tiles[name].key === this.state.tiles[this.state.tileclickedId].key)
  		{
  			this.state.matchCount -= 1;
  			this.state.tiles[name].clicked = true;
  			this.state.tiles[name].matched = true;
  			this.state.tiles[index].matched = true;
  			this.setState({temp});
  		}
  		else{
  			this.setState({halt:true});
  			setTimeout(() => {
  			this.state.tiles[name].clicked = false;
  			this.state.tiles[index].clicked = false;
  			this.setState({halt:false});  			
  			this.setState({temp});
  			}, 1000);
  		}
			this.setState({tileclickedId:100});
    		this.setState({count:0});
  	  }
  	}
  }  

        render(){
        	// Formula obtained from internet regarding mathamatical calculation of score for 
        	// Memory flip
        	let score = ((16 - this.state.matchCount) * 40) + (48 - this.state.clicks) * 10; 
        	
        	if(this.state.matchCount ==0){
        		setTimeout(() => {
        			alert("Congrats you have completed the game \n" + 
        			"Your Score is :" + score)
        			{refreshPage()}
        			}, 1000);
        	}
      		let tileList=_.map(this.state.tiles, (tile,ii) => {
      		return <Tile item={tile} markItem={this.markItem.bind(this)} key={ii} />;});
                return(
                    <div>
                    	<div className ="row">
                    		<div className="col-md-3">
                    			{tileList[0]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[1]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[2]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[3]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[4]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[5]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[6]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[7]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[8]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[9]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[10]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[11]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[12]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[13]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[14]}
                    		</div>
                    		<div className="col-md-3">
                    			{tileList[15]}
                    		</div>
                    	</div>
                    	<div className="text-center">
                    		<button type="button" className="btn btn-primary btn-lg" onClick={ refreshPage }>Restart</button>
                    	</div>
                    	<div className = "row">
                    		<div className="col-md-6">
                    			<p>Number of Clicks: {this.state.clicks}</p>
                    		</div>
                    		<div className="col-md-6 text-right" id='score'>
                    			<p>Score: {score}</p>
                    		</div>
                    	</div>	
                    </div>        
                );
        }
}

function Tile(props) {
  let item = props.item;
  if (item.matched){
  return (
    	<div className="card text-white bg-success mb-3 card-dimension">
                <div className="card-body" className="text-center">
                    <h1>{item.key}</h1>
                </div>
        </div>
    )
  }
  else if (item.clicked) {
    return (
    	<div className="card text-white bg-warning mb-3 card-dimension">
                <div className="card-body" className="text-center">	
                    <h1>{item.key}</h1>
                </div>
        </div>
    )
  }
  else {
    return (
			<div className="card text-white bg-secondary mb-3 card-dimension" onClick={() => props.markItem(item.id)} >
                <div className="card-body" className="text-center">
                    <h1>?</h1>
                </div>
            </div>
    ); 
  }
}

  function refreshPage(){ 
    window.location.reload(); 
}