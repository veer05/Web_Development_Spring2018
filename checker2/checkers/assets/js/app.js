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
  /*let channel = socket.channel("games:demo empty", {});
  channel.join()
         .receive("ok", resp => { console.log("Joined successfully", resp) })
         .receive("error", resp => { console.log("Unable to join", resp) });
*/
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
    let channel = socket.channel("games:" + window.gameName, {});
    game_init(root, channel);

    let list    = $('#message-list');
    let message = $('#message');
    let name    = $('#name'); 

    message.on('keypress', event => {
    if (event.keyCode == 13) {
      channel.push('new_message', { name: name.val(), message: message.val() });
      message.val('');
    }});

    channel.on('new_message', payload => {
    list.append(`<div class="chat-messages">
                ${payload.name || 'Anonymous'}: ${payload.message}</div>`);
    list.prop({scrollTop: list.prop("scrollHeight")});});
  }

  if (document.getElementById('index-page')) {
    form_init();
  }  


}



$(start);