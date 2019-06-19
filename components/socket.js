"use strict";
if ('WebSocket' in window) {
  (function () {
    var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
    var address = protocol + window.location.host +'/skeleton/autoload';
    var socket = new WebSocket(address);
    socket.onopen = ()=> {
      socket.send("try autoload !");
    }
    socket.onmessage = async  function (result) {
      if (result.data != 'reloadFull' && result.data != 'reloadCss' ) { console.log(result.data)}
      if (result.data == 'reloadFull') {
        window.location.reload();
      } else if (result.data == 'reloadCss') {
        var sheets = [].slice.call(document.getElementsByTagName("link"));
        var head = document.getElementsByTagName("head")[0];
        for (var i = 0; i < sheets.length; ++i) {
          var elem = sheets[i];
          head.removeChild(elem);
          var rel = elem.rel;
          if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
            var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
            elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
          }
          head.appendChild(elem);
        }
      }
    };
    socket.onclose =  async function(err) {
      console.log("Server was closed \nTrying reload resources");
      window.location.reload();

    }
    socket.onerror = function (msg) {
      console.log("Server autoload was error \nTrying reload resources");
      window.location.reload();
    }
  })();
  console.log("Preparing autoload watcher");
}
