// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function load_recipe(recipe_url) {
  var url = 'http://localhost:1243/plugin/parse_recipe';
  var request = new XMLHttpRequest();
  

  document.getElementById("recipe_url").innerHTML = "C:" + recipe_url;
  document.getElementById("recipe_url").innerHTML = "L:" + recipe_url;
  
  document.getElementById("recipe_url").innerHTML = "H:" + recipe_url;
  request.onreadystatechange = function (e) {
    if (request.readyState == 4) {
      if (request.status == 200) {
        document.getElementById("recipe_data").innerHTML = request.responseText;
        var json = JSON.parse(request.responseText);
        map.addEventListener('click', function () {
          window.close();
        });
      } else {
        console.log('Unable to resolve address into lat/lng');
      }
    }
  };
  var params = '["' + recipe_url + '"]';
  document.getElementById("recipe_url").innerHTML = "AS";
  request.open("POST", url, true);
  document.getElementById("recipe_url").innerHTML = "POS";
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.setRequestHeader("Content-length", params.length);
  request.setRequestHeader("Connection", "close");
  request.send(params);
}

function map() {
  document.getElementById("con").innerHTML = "New text!";

  var recipe_url = chrome.extension.getBackgroundPage().selectedRecipe;
  if (recipe_url)
    load_recipe(recipe_url);
}

window.onload = map;
