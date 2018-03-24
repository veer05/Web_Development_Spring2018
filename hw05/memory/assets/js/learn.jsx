import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function game_init(root, channel) {
  ReactDOM.render(<MainClass channel={channel}/>, root);
}

//A Tile is a {id:number, key: Alphabet, matched:Boolean,clicked:Boolean}


// A State is represented by {tiles[]:List of tiles, count:numner,
//				tileclickedId:number,matchCount:number,halt:Boolean,clicks:number}

class MainClass extends React.Component{
        constructor(props){
                super(props);
                this.channel = props.channel;
                this.state = {
                               tiles:[],
                               count:0,
			     			               tileclickedId:100,
			     			               matchCount:8,
			     			               halt:0,
			     			               clicks:0,
                             };
                 this.channel.join()
                  .receive("ok", this.gotView.bind(this))
                  .receive("error", resp => { console.log("Unable to join", resp) });
                  this.channel.on("flip", payload => {this.setState(payload.game)})
        }

gotView(view) {
    let current_state = this;
    this.setState(view.game);
    if (view.game.count == 2){
          setTimeout(function()
          {current_state.channel.push("after_delay", {id: 100})
          .receive("ok", current_state.gotView.bind(current_state))},1000);
    }
    }

 // CODE Reference made from Nat's Notes for TodoList
 markItem(name) {
    if (this.state.halt == 0){
    this.channel.push("flip",{ id: name})
      .receive("ok", this.gotView.bind(this));}
    console.log("Here after Set State")
  }  

sendReset(){
  this.channel.push("reset", { id: "res"})
    .receive("ok", this.gotView.bind(this));
}

        render(){
        	// Formula obtained from internet regarding mathamatical calculation of score for 
        	// Memory flip
        	let score = ((16 - this.state.matchCount) * 40) + (48 - this.state.clicks) * 10; 
        	if(this.state.matchCount == 0){
        		setTimeout(() => {
        			alert("Congrats you have completed the game \n" + 
        			"Your Score is :" + score)
              this.sendReset();
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
                    		<button type="button" className="btn btn-primary btn-lg" onClick={ this.sendReset.bind(this) }>Restart</button>
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
