// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// The background page is asking us to find an address on the page.
if (window == top) {
  chrome.extension.onRequest.addListener(function(req, sender, sendResponse) {
    sendResponse(findRecipe());
  });
}

// Search the text nodes for a US-style mailing address.
// Return null if none is found.
var findRecipe = function() {
  var x = document.URL;
  var supported_sites = ["101cookbooks.com","12tomatoes.com","/^\w+\.about\.com$/","/^(m\.)?allrecipes.com$/","americastestkitchen.com","bbcgoodfood.com","bbc.co.uk","bhg.com","bigoven.com","bonappetit.com","bravotv.com","chow.com","cooking.com","cookingchanneltv.com","cooks.com","eatingwell.com","elanaspantry.com","epicurious.com","food.com","food52.com","foodandwine.com","foodnetwork.com","foodnetwork.co.uk","kingarthurflour.com","marthastewart.com","myrecipes.com","nytimes.com","pillsbury.com","realsimple.com","recipe.com","saveur.com","seriouseats.com","simplyrecipes.com","skinnytaste.com","recipes.sparkpeople.com","tasteofhome.com","thedailymeal.com","thekitchn.com"];

  var done = false;
  supported_sites.forEach(function (site){
    if( x.indexOf(site) > 0 ){
      done = true;
    }
  });
  if( done ){
    console.log("Found! : " + x );
    return x;
  }
  /*var found;
  var re = /(\d+\s+[':.,\s\w]*,\s*[A-Za-z]+\s*\d{5}(-\d{4})?)/m;
  var node = document.body;
  var done = false;
  while (!done) {
    done = true;
    for (var i = 0; i < node.childNodes.length; ++i) {
      var child = node.childNodes[i];
      if (child.textContent.match(re)) {
        node = child;
        found = node;
        done = false;
        break;
      }
    }
  }
  if (found) {
    var text = "";
    if (found.childNodes.length) {
      for (var i = 0; i < found.childNodes.length; ++i) {
        text += found.childNodes[i].textContent + " ";
      }
    } else {
      text = found.textContent;
    }
    var match = re.exec(text);
    if (match && match.length) {
      console.log("found: " + match[0]);
      var trim = /\s{2,}/g;
      return match[0].replace(trim, " ");
    } else {
      console.log("bad initial match: " + found.textContent);
      console.log("no match in: " + text);
    }
  }*/
  return null;
}

