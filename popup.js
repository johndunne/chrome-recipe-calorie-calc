// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var current_recipe_url;
var unqiue_user_id;
//var recipe_api_url = "http://localhost:1243";
var recipe_api_url = "https://recipecalcalc.com/api";

function load_recipe(recipe_url) {
  console.log("Loading url: " + recipe_url);
  current_recipe_url = recipe_url;
  var url = recipe_api_url + '/plugin/parse_recipe';
  var request = new XMLHttpRequest();
  

  request.onreadystatechange = function (e) {
    console.log("Request response in");
    if (request.readyState == 4) {
      if (request.status == 200) {
        console.log("Request response is ok");
        document.getElementById("recipe_data").innerHTML = request.responseText;
        /*map.addEventListener('click', function () {
          window.close();
        });*/
        $("#serving_size").change(function(e){
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
        document.getElementById("recipe_data").innerHTML = "<h1>Recipe Calorie Calculator server unavailable.</h1>";
      }
    }
  };
  getRecipeRating(current_recipe_url);
  var params = '["' + current_recipe_url + '"]';
  request.open("POST", url, true);
  request.setRequestHeader("UserID", chrome.extension.getBackgroundPage().uniqueUserID);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.setRequestHeader("Content-length", params.length);
  request.setRequestHeader("Connection", "close");
  console.log("Sending request to API");
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
  console.log(chrome.extension.getBackgroundPage());
  console.log("Want: " + recipe_url);
  if (recipe_url)
    load_recipe(recipe_url);
  console.log("Loaded: " + recipe_url);

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
        if (request.readyState == 4 && (request.status == 200||request.status == 201)) {

        }
    }
    console.log("Unique ID[" + unqiue_user_id + "]");

    var url = recipe_api_url + "/rate_recipe";
    var params = '{"recipe_url" : "' + current_recipe_url + '", "rating" : ' + rating + '}';
    request.setRequestHeader("UserID", chrome.extension.getBackgroundPage().uniqueUserID);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.open("POST", url, true);
    request.send(params);
}

function getRecipeRating( the_recipe_url ){
    var url = recipe_api_url + "/get_recipe_rating";
    console.log("Fetching: " + url);
    chrome.extension.getBackgroundPage().console.log(url);
    $("#debug").html(" URL + " + url);

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
    document.getElementById("debug").innerHTML = request.readyState +  "Some" + request.status ;
        if (request.readyState == 4 && (request.status == 200||request.status == 201)) {
          var result = JSON.parse(request.responseText);
            document.getElementById("debug").innerHTML = result.average;
          for (i=5; i > 0; i--) {
            $("#star_image_"+i).attr('src','star_off.png');
          };
          var max_integer =  Math.floor(result.average);
          if( result.average - max_integer >= 0.5 ){
            $("#star_image_"+(max_integer+1) ).attr('src','half_star.png');
          }
          for (i=max_integer; i > 0; i--) {
            $("#star_image_"+i).attr('src','star.png');
          };
        }
    }
    var params = '{"url":"' + the_recipe_url + '"}';
    request.open("POST", url, true);
    request.setRequestHeader("UserID", chrome.extension.getBackgroundPage().uniqueUserID);
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
    var url = recipe_api_url + "/fav_recipe";
    var params = '{"recipe_url" : "' + current_recipe_url + '"}';
    request.open("POST", url, true);
    request.setRequestHeader("UserID", chrome.extension.getBackgroundPage().uniqueUserID);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.setRequestHeader("Content-length", params.length);
    request.setRequestHeader("Connection", "close");
    request.send(params);
}
window.onload = map;
