// display current movies
let endpoint = "https://api.themoviedb.org/3/movie/now_playing?api_key=d8471dc3d9fcf3c34a846ebf63d513fe&language=en-US&page=1";
ajax(endpoint, displayResults);

function showUser(str) {
    if (str == "") {
        document.getElementById("txtHint").innerHTML = "";
        return;
    } else {
        if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        } else {
            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("txtHint").innerHTML = this.responseText;
            }
        };
        xmlhttp.open("GET","getuser.php?q="+str,true);
        xmlhttp.send();
    }
}

function ajax(endpoint, returnFunction) {
  let xhr = new XMLHttpRequest();
  //.open(method - get or post?, endpoint)
  xhr.open("GET", endpoint);
  xhr.send();
  // Wait for response
  xhr.onreadystatechange = function () {
    console.log(this);

    // response received
    if (xhr.readyState == this.DONE) {
      if (xhr.status == 200) {
        // successfully received a response
        displayResults(xhr.responseText);
      }
      else {
        // there was some error
        alert("AJAX error!");
        console.log(xhr.status);
      }
    }
  }
}

function displayResults(resultObject) {
  resultObject = JSON.parse(resultObject);
  console.log(resultObject.results);

  let movies = document.querySelector("#movies");
  // empty search result
  while (movies.hasChildNodes()) {
    movies.removeChild(movies.lastChild);
  }

  // update the result count
  document.querySelector("#num-results").innerHTML = resultObject.results.length;
  document.querySelector("#num-total").innerHTML = resultObject.total_results;

  // run throught the results and create a <div> element for each result
  for(let i = 0; i < resultObject.results.length; i++) {
  }
}

document.querySelector("#search-form").onsubmit = function(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-id").value.trim();

  // Make a HTTP request via AJAX to Movie Database API.
  let endpoint = "https://api.themoviedb.org/3/search/movie?api_key=d8471dc3d9fcf3c34a846ebf63d513fe&language=en-US&query=" + searchInput + "&include_adult=false";
  
  // Call the ajax function
  ajax(endpoint, displayResults);

  console.log("at the end of onsubmit");
}