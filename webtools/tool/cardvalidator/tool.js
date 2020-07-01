window.addEventListener('DOMContentLoaded', function() {
  $("header-content").load("../../static/template/header-tool.html");
  $("footer-content").load("../../static/template/footer.html");
});

function getQuery() {
  setTimeout(function(){
    const pageTitle = document.getElementById("pagetitle");
    pageTitle.innerHTML = "Card Validator";
  }, 150);
}
window.addEventListener("onload", getQuery());

//Tool Script Below

function getCardData() {
  const siteURL = document.getElementById("siteURL");
  const rawOutput = document.getElementById("rawOutput");
  const results = document.getElementById("results");
  const loading = document.getElementById("loading-box");
  const metaTable = document.getElementById("metaTable");

  //Twitter Elements
  const t_pageTitle = document.getElementById("t_pageTitle");
  const t_pageCover = document.getElementById("t_pageCover");
  const t_pageURL = document.getElementById("t_pageURL");
  const t_pageDesc = document.getElementById("t_pageDesc");

  const f_pageTitle = document.getElementById("f_pageTitle");
  const f_pageCover = document.getElementById("f_pageCover");
  const f_pageURL = document.getElementById("f_pageURL");
  const f_pageDesc = document.getElementById("f_pageDesc");

  const l_pageTitle = document.getElementById("l_pageTitle");
  const l_pageCover = document.getElementById("l_pageCover");
  const l_pageURL = document.getElementById("l_pageURL");

  results.style.display = "none";
  loading.style.display = "none";
  $("#siteSubmit").removeClass("loading");
  $("#siteSubmit").removeAttr("disabled");
  $("#siteURL").removeAttr("disabled");

  $("#siteSubmit").toggleClass("loading");
  $("#siteSubmit").attr("disabled", "disabled");
  $("#siteURL").attr("disabled", "disabled");
  $("#error-box").css("display", "none");
  loading.style.display = "block";

  var jqxhr = $.get("https://cors-anywhere.herokuapp.com/"+siteURL.value, function(data){
    var metaOgURL= $(data).filter('meta[property="og:url"]').attr("content");
    var metaOgTitle = $(data).filter('meta[property="og:title"]').attr("content");
    var metaOgDesc = $(data).filter('meta[property="og:description"]').attr("content");
    var metaOgImage = $(data).filter('meta[property="og:image"]').attr("content");

    var metaDesc = $(data).filter('meta[type="description"]').attr("content");
    var metaURL = siteURL.value;

    var metaTitle = $(data).filter('meta');

    var siteTitle = data.match(/<title.*?>(.*)<\/title>/)[1];

    var output = data.toString().trim();

    t_pageCover.style.display = "block";
    f_pageCover.style.display = "block";
    l_pageCover.style.display = "block";
    t_pageDesc.style.display = "block";
    f_pageDesc.style.display = "block";
    t_pageCover.style.backgroundImage = "none";
    f_pageCover.style.backgroundImage = "none";
    l_pageCover.style.backgroundImage = "none";

    metaTable.innerHTML = "";

    for (i = 0; i < metaTitle.length; i++) {
      var metaCont = metaTitle[i].getAttribute("content") || metaTitle[i].getAttribute("value") || metaTitle[i].getAttribute("charset");
      var metaTitleSort = metaTitle[i].getAttribute("property") || metaTitle[i].getAttribute("name") || metaTitle[i].getAttribute("robots") || metaTitle[i].getAttribute("itemprop");
      if (metaTitle[i].getAttribute("charset")) {
        metaTable.innerHTML += "<tr><td>charset</td><td>"+metaCont+"</td></tr>";
      } else {
        metaTable.innerHTML += "<tr><td>"+metaTitleSort+"</td><td>"+metaCont+"</td></tr>";
      }
    }

    rawOutput.innerHTML = output;

    if (typeof metaOgTitle !== 'undefined') { //Card Title
      t_pageTitle.innerHTML = metaOgTitle;
      f_pageTitle.innerHTML = metaOgTitle;
      l_pageTitle.innerHTML = metaOgTitle;
    } else if (typeof metaOgTitle == 'undefined') {
      t_pageTitle.innerHTML = siteTitle;
      f_pageTitle.innerHTML = siteTitle;
      l_pageTitle.innerHTML = siteTitle;
    }

    if (typeof metaOgDesc !== 'undefined') {
      t_pageDesc.innerHTML = metaOgDesc;
      f_pageDesc.innerHTML = metaOgDesc;
    } else if (typeof metaDesc !== 'undefined') {
      t_pageDesc.innerHTML = metaDesc;
      f_pageDesc.innerHTML = metaDesc;
    } else if (typeof metaDesc == 'undefined' && typeof metaOgDesc == 'undefined') {
      t_pageDesc.style.display = "none";
      f_pageDesc.style.display = "none";
    }

    if (metaOgImage) {
      t_pageCover.style.backgroundImage = "url('"+metaOgImage+"')";
      f_pageCover.style.backgroundImage = "url('"+metaOgImage+"')";
      l_pageCover.style.backgroundImage = "url('"+metaOgImage+"')";
    } else {
      t_pageCover.style.display = "none";
      f_pageCover.style.display = "none";
      l_pageCover.style.display = "none";
    }

    if (!metaOgURL) {
      t_pageURL.innerHTML = metaURL.replace(/(^\w+:|^)\/\//, '').replace(/\/+$/, "");
      f_pageURL.innerHTML = metaURL.replace(/(^\w+:|^)\/\//, '').replace(/\/+$/, "");
      l_pageURL.innerHTML = metaURL.replace(/(^\w+:|^)\/\//, '').replace(/\/+$/, "");
    } else {
      t_pageURL.innerHTML = metaOgURL.replace(/(^\w+:|^)\/\//, '').replace(/\/+$/, "");
      f_pageURL.innerHTML = metaOgURL.replace(/(^\w+:|^)\/\//, '').replace(/\/+$/, "");
      l_pageURL.innerHTML = metaOgURL.replace(/(^\w+:|^)\/\//, '').replace(/\/+$/, "");
    }
  })

  .fail(function(status) {
    results.style.display = "none";
    loading.style.display = "none";
    $("#siteSubmit").toggleClass("loading");
    $("#siteSubmit").removeAttr("disabled");
    $("#siteURL").removeAttr("disabled");
    $("#error-box").css("display", "block");
    $("#error-box").html("ERROR: Couldn't connect to '"+siteURL.value+"'. Responded with status <i>"+status["status"]+": "+status["responseText"]+"</i>");
    console.log(status);
  })

  .done(function(data) {
    results.style.display = "block";
    loading.style.display = "none";
    $("#siteSubmit").toggleClass("loading");
    $("#siteSubmit").removeAttr("disabled");
    $("#siteURL").removeAttr("disabled");
  });
}