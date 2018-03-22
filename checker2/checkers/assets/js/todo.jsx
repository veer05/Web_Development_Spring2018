import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

export default function todo_init(root) {
  ReactDOM.render(<Todo />, root);
}

// App state for Todo is:
//   { items: [List of TodoItem] }
//
// A TodoItem is:
//   { name: String, done: Bool }

function generateSquare()
{
  let makeSquare=[];

  for(let i=0;i<=63;i++)
  {
    let square={
      id:i,
    //  if (true'){
    //    color:'blac';
    //  }
    //  else{
    //    color:'white'
    //  }
    };
    makeSquare.push(square);
  }
  return makeSquare;
}
class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: generateSquare(),
    };
  }

  render() {
          let tileList= _.map(this.state.squares, (tile,ii) => {
          return <Tile item={tile} key={ii} />;});
    return (
      <div>
          <div>
            <button type="button" class="btn btn-primary">Primary</button>
          </div>
          <br></br>
          <div class= "container">
            <div class="row">
            {tileList}
            </div>

            
        </div>
      </div>
    );
  }
}


function Tile(props) {
  let item = props.item;
  return(
        <div className ="col-sm-1 off border">
        <div>
          <p>{item.id}</p>
        </div>
        </div>
  );
}