<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Marine Life Encyclopedia</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <script src="https://d3js.org/d3.v4.min.js"></script>
  <script src="https://kit.fontawesome.com/5accc78c0a.js" crossorigin="anonymous"></script>
</head>
<body>
  <!-- audio -->
  <audio id="audio-water-drop" src="asset/waterDrop_01.wav"></audio>

  <div class="container-fluid bar">
    <div class="row">
      <div id="title" class="col-3 mt-3">MARINE LIFE ENCYCLOPEDIA</div>
      <div class="col-6 mt-3">
        <input type="text" class="form-control" id="title-id" name="title">
      </div>
      <div class="col-2 mt-3">
        <button type="submit" class="button">Search</button>
      </div>
      <div class="col-1 mt-3">
        <i id="helpIcon" class="fas fa-question-circle fa-x"></i>
      </div>
    </div> <!-- .row -->
  </div> <!-- .container -->

  <svg id="background" class="container-fluid" width="100%" height="100vh"></svg>

  <svg id="svg-chart" class="container-fluid" viewBox="0 0 1200 1000">
    <svg id="resize-chart" class="chart" width="1200" height="1000"></svg>
  </svg> <!-- chart -->

  <svg id="svg-ui-main" class="container-fluid" viewBox="0 0 300 800">
    <svg class="ui-main" width="300" height="800"></svg>
  </svg> <!-- ui main -->

  <svg id="svg-animal-page" class="container-fluid">
    <svg class="animal-page" ></svg>
  </svg> <!-- animal page -->

  <div id="animal-container">
    <div id="animal-name-container">
      <div class="animal-text" id="scientific-name">Scientific Name</div>
      <div class="animal-text" id="generic-name">Generic Name</div>
    </div>
    <div id="icon-container">
      <i class="fas fa-times fa-4x" id="closeIcon"></i>
    </div>
    <div class="row" id="animal-description">
      <div class="col-1"></div>
      <div class="col-5">
        <img id="animal-image" src="asset/jellyfish.png"> 
        <div class="animal-text sub-title">Habitat:</div>
        <div class="animal-text sub-title">Population:</div>
      </div>
      <div class="col-5">
        <div class="animal-text sub-title">Facts:</div>
      </div>
      <div class="col-1"></div>
    </div>
  </div> <!-- animal container -->

  <svg id="svg-help-page" class="container-fluid">
    <svg class="help-page" ></svg>
  </svg> <!-- help page -->

  <div id="help-container">
    <div id="help-title-container">
      <div id="help-title" class="help-text">Guide</div>
    </div>
    <div id="help-icon-container">
      <i class="fas fa-times fa-4x" id="helpCloseIcon"></i>
    </div>
    <div class="row" id="help-description">
      <div class="col-1"></div>
      <div class="col-10">
        <div class="help-text">1. Click on a bubble to view details or view sub categories.</div>
        <div class="help-text">2. Double click outside the bubble to go back.</div>
        <div class="help-text">3. Have fun!</div>
      </div>
      <div class="col-1"></div>
    </div>
  </div> <!-- help container -->

  <script src="script.js"></script>
  <script src="data.js"></script>
</body>
</html>