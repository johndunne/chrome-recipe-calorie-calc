// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var current_recipe_url;
function load_recipe(recipe_url) {
  current_recipe_url = recipe_url;
  var url = 'http://localhost:1243/plugin/parse_recipe';
  var request = new XMLHttpRequest();
  

  request.onreadystatechange = function (e) {
    if (request.readyState == 4) {
      if (request.status == 200) {
        document.getElementById("debug").innerHTML = "1";
        document.getElementById("recipe_data").innerHTML = request.responseText;
        document.getElementById("debug").innerHTML = "2";
        /*map.addEventListener('click', function () {
          window.close();
        });*/
        $("#serving_size").change(function(e){
          document.getElementById("debug").innerHTML = document.getElementById("serving_size").value;
          document.getElementById("calories_per_serving").innerHTML = parseFloat(parseFloat(document.getElementById("calories_in_recipe").textContent) / parseFloat(document.getElementById("serving_size").value)).toFixed(0);
          document.getElementById("protein_per_serving").innerHTML = parseFloat(parseFloat(document.getElementById("protein_in_recipe").textContent) / parseFloat(document.getElementById("serving_size").value)).toFixed(0);
          document.getElementById("carbs_per_serving").innerHTML = parseFloat(parseFloat(document.getElementById("carbs_in_recipe").textContent) / parseFloat(document.getElementById("serving_size").value)).toFixed(0);
          document.getElementById("fat_per_serving").innerHTML = parseFloat(parseFloat(document.getElementById("fat_in_recipe").textContent) / parseFloat(document.getElementById("serving_size").value)).toFixed(0);
          //formatNumbers();
        });
        formatNumbers();

      } else if (request.status == 500) {
        document.getElementById("recipe_data").innerHTML = request.responseText;
      } else {
        console.log('Unable to resolve address into lat/lng');
      }
    }
  };
  var params = '["' + recipe_url + '"]';
  request.open("POST", url, true);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.setRequestHeader("Content-length", params.length);
  request.setRequestHeader("Connection", "close");
  request.send(params);
}

function formatNumbers(){
    $( "*" ).each(function(index){ 
      if($(this).attr('nut') !== undefined ){ 
        $(this).text(parseFloat($(this).text()).toFixed($(this).attr('nut')) );
      }
      if($(this).attr('changeable') !== undefined ){ 
        $(this).click(function(e){$(this).text("Change!");});
      }
  } );

}
function map() {
  var recipe_url = chrome.extension.getBackgroundPage().selectedRecipe;
  if (recipe_url)
    load_recipe(recipe_url);
  document.getElementById("debug").innerHTML = "D";
  $("#recommend_image").click(function(e){
    favRecipe();
  });
  $("#star_image_1").click(function(e){
    rateRecipe(1);
  });
  $("#star_image_2").click(function(e){
    rateRecipe(2);
  });
  $("#star_image_3").click(function(e){
    rateRecipe(3);
  });
  $("#star_image_4").click(function(e){
    rateRecipe(4);
  });
  $("#star_image_5").click(function(e){
    rateRecipe(5);
  });
}     
function rateRecipe( rating ){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      document.getElementById("debug").innerHTML = "S=" + request.status;
        if (request.readyState == 4 && (request.status == 200||request.status == 201)) {
          document.getElementById("debug").innerHTML = "Done";
        }
    }
    var url = "http://localhost:1243/rate_recipe";
    var params = '{"recipe_url" : "' + current_recipe_url + '", "rating" : ' + rating + '}';
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.send(params);
}
function favRecipe( ){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      document.getElementById("debug").innerHTML = "S=" + request.status;
        if (request.readyState == 4 && (request.status == 200||request.status == 201)) {
          document.getElementById("debug").innerHTML = "Done";
        }
    }
    var url = "http://localhost:1243/fav_recipe";
    var params = '{"recipe_url" : "' + current_recipe_url + '"}';
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.send(params);
}
window.onload = map;
