// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function load_recipe(recipe_url) {
  var url = 'http://localhost:1243/plugin/parse_recipe';
  var request = new XMLHttpRequest();
  

  request.onreadystatechange = function (e) {
    if (request.readyState == 4) {
      if (request.status == 200) {
        document.getElementById("recipe_data").innerHTML = request.responseText;

        /*map.addEventListener('click', function () {
          window.close();
        });*/
        $("#serving_size").change(function(e){
          document.getElementById("recipe_url").innerHTML = document.getElementById("serving_size").value;
          document.getElementById("calories_per_serving").innerHTML = parseFloat(document.getElementById("calories_in_recipe").textContent) / document.getElementById("serving_size").value;
          document.getElementById("protein_per_serving").innerHTML = parseFloat(document.getElementById("protein_in_recipe").textContent) / document.getElementById("serving_size").value;
          document.getElementById("carbs_per_serving").innerHTML = parseFloat(document.getElementById("carbs_in_recipe").textContent) / document.getElementById("serving_size").value;
          document.getElementById("fat_per_serving").innerHTML = parseFloat(document.getElementById("fat_in_recipe").textContent) / document.getElementById("serving_size").value;
        });

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

function map() {
  var recipe_url = chrome.extension.getBackgroundPage().selectedRecipe;
  if (recipe_url)
    load_recipe(recipe_url);
}

window.onload = map;
