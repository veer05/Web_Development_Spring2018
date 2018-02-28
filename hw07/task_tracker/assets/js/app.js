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
import $ from "jquery";




function newtime(task_id) {
  let text = JSON.stringify({
    time_track: {
        start_time: new Date(),
        end_time: new Date(),
        task_id: task_id
      },
  });

 $.ajax(time_track_path, {
    method: "post",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: text,
    success: (resp) => { console.log(resp) },
    error: (resp) => { console.log(resp) },
  });
 // https://stackoverflow.com/questions/43267621/location-reload-on-mobile-js-app
 location.reload();
}

function update_start(task_id,time_id) {
  let text = JSON.stringify({
    time_track: {
    	id: time_id,
        start_time: new Date(),
        task_id: task_id
      },
  });

 $.ajax(time_track_path + '/'+time_id, {
    method: "put",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: text,
    success: (resp) => { console.log(resp) },
    error: (resp) => { console.log(resp) },
  });
 // /https://stackoverflow.com/questions/43267621/location-reload-on-mobile-js-app
 location.reload();
}

function update_end(task_id,time_id) {
  let text = JSON.stringify({
    time_track: {
    	id: time_id,
        end_time: new Date(),
        task_id: task_id
      },
  });
 $.ajax(time_track_path + '/'+time_id, {
    method: "put",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: text,
    success: (resp) => { console.log(resp) },
    error: (resp) => { console.log(resp) },
  });
 //https://stackoverflow.com/questions/43267621/location-reload-on-mobile-js-app
 location.reload();
}

function delete_record(time_id) {
 $.ajax(time_track_path + '/'+time_id, {
    method: "delete",
    dataType: "json",
    contentType: "application/json; charset=UTF-8",
    data: '',
    success: (resp) => { console.log(resp) },
    error: (resp) => { console.log(resp) },
  });
 // /https://stackoverflow.com/questions/43267621/location-reload-on-mobile-js-app
 location.reload();
}

function createtime_click(ev) {
	let btn = $(ev.target);
	let task_id = btn.data('task-id');
	newtime(task_id)
}

function updatetime_start_click(ev) {
	let btn = $(ev.target);
	let task_id = btn.data('task-id');
	let time_id = btn.data('time-id');
	update_start(task_id,time_id)
}

function updatetime_end_click(ev) {
	let btn = $(ev.target);
	let task_id = btn.data('task-id');
	let time_id = btn.data('time-id');
	update_end(task_id, time_id)
}

function deltime_click(ev) {
	let btn = $(ev.target);
	let time_id = btn.data('time-id');
	delete_record(time_id)
}

function init_time() {
  $(".newtime").click(createtime_click);
  $(".starttime").click(updatetime_start_click);
  $(".endtime").click(updatetime_end_click);
  $(".deltime").click(deltime_click);
  }


$(init_time); 

// Import local files
//
// Local files can be imported directly using relative
// paths "./socket" or full ones "web/static/js/socket".

// import socket from "./socket"
