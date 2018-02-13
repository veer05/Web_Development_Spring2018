// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

import "phoenix_html";

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".
import socket from "./socket"

function form_init() {
  let channel = socket.channel("games:demo", {});
  channel.join()
         .receive("ok", resp => { console.log("Joined successfully", resp) })
         .receive("error", resp => { console.log("Unable to join", resp) });

  $('#game-button').click(() => {
    let xx = $('#game-input').val();
    channel.push("double", { xx: xx }).receive("doubled", msg => {
      $('#game-output').text(msg.yy);
    });
  });
}

import game_init from "./learn";

function start() {
  
  let root = document.getElementById('root');
  if (root) {
    let channel = socket.channel("games:" + window.gameName, {});
    game_init(root, channel);
  }

  

  if (document.getElementById('index-page')) {
    form_init();
  }
}

$(start);
             

