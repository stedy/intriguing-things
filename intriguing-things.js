var keys = [];

function li_item(val) {
  out0 = "<div class=\"item-title\"><span class=\"dt\">" + val.dt + "</span>";
  out1 = "<span class=\"num\">#" + val.number + "</span>";
  out2 = "<span class=\"src-url\"><a href=\"" + val.src_url + "\">[source]</a></span></div>";
  out3 = "<div class=\"title\"><a href=\"" + val.url + "\">" + val.title + "</a></div>";
  out4 = "<div class=\"ps\">" + val.ps + "</div>";

  cur_key = val.index.replace(".", "-");
  keys.push(cur_key);
  return "<div id=\"" + cur_key + "\" class=\"item\">" + out0 + out1 + out2 + out3 + out4 + "</div>";
}

function str2dt(val) {
  if (val.indexOf(".") == -1) { return new Date(1900, 1, 1); }
  if (val.indexOf("-") == -1) { return new Date(1900, 1, 1); }
  end = val.split(".");
  vals = end[0].split("-");
  return new Date(vals[0], vals[1], vals[2], parseFloat(end[1]));
}

function add_to_list(data) {
  data.sort(function(a,b) { return str2dt(b.dt) - str2dt(a.dt); } );
  data = data.reverse();

  var out = [];
  $.each(data, function(key, val) {
    out.push(li_item(val));
  });
 
  $("<div/>", {
    "id": "items",
    html: out.join("\n")
  }).appendTo(".container");
}

function show_random() {
  $("#items").hide("fast");
  $("#rand-items").show("fast");
  inds = [];
  i = 1;
  while (i < 6) {
    ind = Math.floor(Math.random() * keys.length);
    if ($.inArray(ind, inds)) {
      inds.push(ind);
      console.log(keys[ind]);
      console.log($('#' + keys[ind]).html());
      $("#rand-item-" + i).html($('#' + keys[ind]).html());
      i += 1;
    }
  }
}
function show_all() {
  $("#items").show("fast");
  $("#rand-items").hide("fast");
}

function main(data) {
  $('#waiting').html("");
  add_to_list(data);
}

var url = "data.json";
$(function() {
    $("#show-random").click(show_random);
    $("#show-all").click(show_all);
    $.ajax({
        url: "https://api.morph.io/mobeets/intriguing-things-scraper/data.json?key=CB9NyuIK2aWYi0ytlF4j&query=select%20*%20from%20'data'&callback=start",
        dataType: 'jsonp',
        success: main
    });    
});
