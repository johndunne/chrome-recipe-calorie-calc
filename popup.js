// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function load_recipe(recipe_url) {
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
        document.getElementById("debug").innerHTML = "3";
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
  
}

window.onload = map;
