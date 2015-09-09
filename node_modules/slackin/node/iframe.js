"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = button;

var dom = _interopRequire(require("vd"));

var read = require("fs").readFileSync;

var logo = read(__dirname + "/assets/slack.svg").toString("base64");
var js = read(__dirname + "/assets/iframe.js").toString();
var css = read(__dirname + "/assets/iframe-button.css").toString();

function button(_ref) {
  var active = _ref.active;
  var total = _ref.total;
  var large = _ref.large;

  var str = "";
  if (active) str = "" + active + "/";
  if (total) str += total;
  if (!str.length) str = "–";

  var opts = { "class": large ? "slack-btn-large" : "" };
  var div = dom("span.slack-button", opts, dom("a.slack-btn href=/ target=_blank", dom("span.slack-ico"), dom("span.slack-text", "Slack")), dom("a.slack-count href=/ target=_blank", str), dom("style", css), dom.style().add(".slack-ico", {
    "background-image": "url(data:image/svg+xml;base64," + logo + ")"
  }), dom("script", "\n      data = {};\n      data.total = " + (total != null ? total : "null") + ";\n      data.active = " + (active != null ? active : "null") + ";\n    "), dom("script", js));

  return div;
}

function gradient(css, sel, params) {
  ["-webkit-", "-moz-", ""].forEach(function (p) {
    css.add(sel, {
      "background-image": "" + p + "linear-gradient(" + params + ")"
    });
  });
}

