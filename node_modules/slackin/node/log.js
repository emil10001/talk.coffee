"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = log;

var dbg = _interopRequire(require("debug"));

var debug = dbg("slackin");

function log(slack, silent) {
  // keep track of elapsed time
  var last = undefined;

  out("fetching");

  // attach events
  slack.on("ready", function () {
    return out("ready");
  });
  slack.on("retry", function () {
    return out("retrying");
  });
  slack.on("fetch", function () {
    last = new Date();
    out("fetching");
  });
  slack.on("data", online);

  // log online users
  function online() {
    out("online %d, total %d %s", slack.users.active, slack.users.total, last ? "(+" + (new Date() - last) + "ms)" : "");
  }

  // print out errors and warnings
  if (!silent) {
    slack.on("error", function (err) {
      console.error("%s – " + err.stack, new Date());
    });
    slack.on("ready", function () {
      if (!slack.org.logo && !silent) {
        console.warn("\u001b[92mWARN: no logo configured\u001b[39m");
      }
    });
  }

  function out() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (silent) {
      return debug.apply(undefined, args);
    }args[0] = "" + new Date() + " – " + args[0];
    console.log.apply(console, args);
  }
}

