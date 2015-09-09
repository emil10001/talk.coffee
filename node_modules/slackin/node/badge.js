"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

// middle separation

module.exports = badge;

var svg = _interopRequire(require("vd"));

var title = "slack";
var color = "#E01563";
var pad = 8; // left / right padding
var sep = 4;
function badge(_ref) {
  var total = _ref.total;
  var active = _ref.active;

  var value = active ? "" + active + "/" + total : "" + total || "–";
  var lw = pad + width(title) + sep; // left side width
  var rw = sep + width(value) + pad; // right side width
  var tw = lw + rw; // total width

  return svg("svg xmlns=\"http://www.w3.org/2000/svg\" width=" + tw + " height=20", svg("rect rx=3 width=" + tw + " height=20 fill=#555"), svg("rect rx=3 x=" + lw + " width=" + rw + " height=20 fill=" + color), svg("path d=\"M" + lw + " 0h" + sep + "v20h-" + sep + "z\" fill=" + color), svg("rect rx=3 width=" + tw + " height=20 fill=url(#g)"), svg("g text-anchor=middle font-family=Verdana font-size=11", text({ str: title, x: Math.round(lw / 2), y: 14 }), text({ str: value, x: lw + Math.round(rw / 2), y: 14 })));
}

// generate text with 1px shadow
function text(_ref) {
  var str = _ref.str;
  var x = _ref.x;
  var y = _ref.y;

  return [svg("text fill=#010101 fill-opacity=.3 x=" + x + " y=" + (y + 1), str), svg("text fill=#fff x=" + x + " y=" + y, str)];
}

// π=3
function width(str) {
  return 7 * str.length;
}

