// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

//import socket from "./socket"
//import checker_init from "./checkers";

//function start() {
//  let root = document.getElementById('root');
//  checker_init(root);
//}

//$(start);

import $ from "jquery";
import socket from "./socket";

function form_init() {
  let channel = socket.channel("games:demo empty", {});
  channel.join()
         .receive("ok", resp => { console.log("Joined successfully", resp) })
         .receive("error", resp => { console.log("Unable to join", resp) });

}

import game_init from "./checkers";

function start() {
  let root = document.getElementById('root');
  console.log('This is my gamename')
  console.log(window.gameName)
  console.log('This is my username')
  console.log(window.userName)
  if (root) {
    //let channel = socket.channel("games:" + window.gameName+" "+window.userName, {});
    let channel = socket.channel("games:" + window.gameName, {playername: window.userName});
    game_init(root, channel);
  }

  if (document.getElementById('index-page')) {
    form_init();
  }  

  function follow_click(ev){
    console.log("Nice")
    let btn = $(ev.target);
    let follow_id = btn.data('game-id');
    let user_id = btn.data('user-id');
    console.log(follow_id)
    console.log(user_id)
  }

  $(".follow-button").click(follow_click);
  $(".follow-button").click(follow_click);
}



$(start);