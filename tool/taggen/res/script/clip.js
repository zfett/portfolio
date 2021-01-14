function copyText(_str) {
  if (typeof _str == "string" && !_str == "") {
    navigator.clipboard.writeText(_str).then(function() {
      window.alert("Copied '"+_str+"' to clipboard!");
    }, function(err) {
      console.error("Error: Couldn't write to clipboard! Could be a permissions error.");
    });
  } else {
    console.error("Error: Function 'copyText' parameter '_str' cannot be blank or a non-string.");
  }
}