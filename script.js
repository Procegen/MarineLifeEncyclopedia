// ------------------ Variables ------------------//
let mainSize = 60;
let subSize = 40;
let miniSize = 15;
let nodeRadius = subSize * 2;
let boxRadius = 20;
let gap = 20;
let color = d3.scaleOrdinal(d3.schemeCategory20c);
let clicked = false;
let simInitialized = false;
let svg = d3.select("svg.chart");
let svgUImain = d3.select("svg.ui-main");
let svgUIdetail = d3.select("svg.ui-detail");
let svgAnimalPage = d3.select("svg.animal-page");
let svgHelpPage = d3.select("svg.help-page");
let width = 1200;
let height = 1000;
let subCounter = 0;
let colors = ["#0054FF", "#00B6FF", "#C1F7FF", "#F05D5E" ];

// -------------------- Data --------------------- //

let datajson = {
  "nodes": [
    {"id": "Main", "group": 1, "size": mainSize, "select": 0},
    {"id": "Sub1", "group": 2, "size": subSize, "select": 0},
    {"id": "Sub2", "group": 2, "size": subSize, "select": 0},
    {"id": "Sub3", "group": 2, "size": subSize, "select": 0},
    {"id": "Sub4", "group": 2, "size": subSize, "select": 0},
    {"id": "Sub5", "group": 2, "size": subSize, "select": 0},
    {"id": "Sub6", "group": 2, "size": subSize, "select": 0},
    {"id": "Sub7", "group": 2, "size": subSize, "select": 0},
    {"id": "Mini1", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini2", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini3", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini4", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini5", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini6", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini7", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini8", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini9", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini10", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini11", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini12", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini13", "group": 3, "size": miniSize, "select": 0},
    {"id": "Mini14", "group": 3, "size": miniSize, "select": 0}
  ],
  "links": [
    {"source": "Main", "target": "Sub1"},
    {"source": "Main", "target": "Sub2"},
    {"source": "Main", "target": "Sub3"},
    {"source": "Main", "target": "Sub4"},
    {"source": "Main", "target": "Sub5"},
    {"source": "Main", "target": "Sub6"},
    {"source": "Main", "target": "Sub7"},
    {"source": "Sub1", "target": "Mini1"},
    {"source": "Sub1", "target": "Mini2"},
    {"source": "Sub2", "target": "Mini3"},
    {"source": "Sub2", "target": "Mini4"},
    {"source": "Sub3", "target": "Mini5"},
    {"source": "Sub3", "target": "Mini6"},
    {"source": "Sub4", "target": "Mini7"},
    {"source": "Sub4", "target": "Mini8"},
    {"source": "Sub5", "target": "Mini9"},
    {"source": "Sub5", "target": "Mini10"},
    {"source": "Sub6", "target": "Mini11"},
    {"source": "Sub6", "target": "Mini12"},
    {"source": "Sub7", "target": "Mini13"},
    {"source": "Sub7", "target": "Mini14"}
  ]
}

// -------------- Simulation --------------- //
let simulation;

initSimulation();

// -------------- Background --------------- //
let background = d3.select("#svg-chart")
    .on("dblclick", handleOnDblClick);

// ---------------- links -----------------//
let link = svg.append("g")
    .attr("class", "link")
    .selectAll("line")
    .data(datajson.links)
    .enter().append("line");

// ----------------- nodes ---------------- //
let node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(datajson.nodes)
    .enter().append("circle")
    //Setting node radius by group value
    .attr("r", function(d) {
        return d.size * 2;
    })
    //Colors by 'group' value
    .style("fill", getColor)
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
    .on("click", handleOnClick)
    .on("mousemove", mousemove)
    .on("mouseout", mouseout);

// ----------------- labels ----------------- //
let labels = svg.append("g")
    .attr("class", "label")
    .selectAll("text.label")
    .data(datajson.nodes)
    .enter().append("text")
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")
    .text(function(d) {
        return d.id
    });

// ------------ category box ------------ //
let categoryGroup = svgUImain.append("g")
    .attr("class", "category-group")
    .attr("opacity", 0);

let categoryBox = categoryGroup.append("rect")
    .data(d3.range(1))
    .attr("class", "category-box")
    .attr("rx", boxRadius)
    .attr("ry", boxRadius)
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 300)
    .attr("height", 650)

let categoryText = categoryGroup.append("text")
    .data(d3.range(1))
    .attr("class", "category-text")
    .attr("x", 0)
    .attr("y", 0)
    .attr("dx", "1em")
    .attr("dy", "2em")
    .text("Category Description");

// ------------ animal page ------------//
let animalGroup = svgAnimalPage.append("g")
    .attr("class", "animal-group")
    .attr("opacity", 1);

let animalBox = animalGroup.append("rect")
    .data(d3.range(1))
    .attr("class", "animal-box")
    .attr("rx", boxRadius*2)
    .attr("ry", boxRadius*2)
    .attr("x", 0)
    .attr("y", 0)
    .attr("bottom", 0)
    .attr("width", "100%")
    .attr("height", "96vh");

// ------------ help page ------------//
let helpGroup = svgHelpPage.append("g")
    .attr("class", "help-group")
    .attr("opacity", 1);

let helpBox = helpGroup.append("rect")
    .data(d3.range(1))
    .attr("class", "help-box")
    .attr("rx", boxRadius*2)
    .attr("ry", boxRadius*2)
    .attr("x", 0)
    .attr("y", 0)
    .attr("bottom", 0)
    .attr("width", "100%")
    .attr("height", "96vh");

// --------------- functions ---------------- //
function ticked() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
  node
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
  labels
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });
  }

function initSimulation() {
  let t = this;

  simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) {
        return d.id;
    })
    .distance(getDistance))
    .force("charge", d3.forceManyBody().strength(0))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(getForceCollide)
    .iterations(6))
      

  simulation.nodes(datajson.nodes);
  simulation.force("link").links(datajson.links);

  simulation
    .nodes(datajson.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(datajson.links);

  return simulation;
}
function getForceCenterX(d) {
  return "translate(" + d.x + ")";
}
function getForceCenterY(d) {
  return "translate(" + d.y + ")";
}

function getForceCollide(d) {
  if (d.size > 0) {
    return d.size * 2 + 10;
  }
  else {
    return 0;
  }
}

function getDistance(d) {
  // console.log(d.source.x);
  if (d.source.size == 0) {
    return 0;
  }
  else {
    return (d.source.size + d.target.size) * 2;
  }
}

function mousemove(d) {
  d3.select(this)
    .transition(100)
    .ease(d3.easeLinear)
    .style("fill" , colors[3]);
  d3.select("#svg-ui-main")
    .style("visibility", "visible");
  categoryGroup
    .transition(50)
    .ease(d3.easeLinear)
    .style("opacity" , 1);
}

function mouseout(d) {
  d3.select(this)
    .transition(100)
    .style("fill", getColor);
  categoryGroup
    .transition(50)
    .ease(d3.easeLinear)
    .style("opacity" , 0);
  d3.select("#svg-ui-main")
    .transition()
    .delay(100)
    .style("visibility", "hidden");
}

function handleOnClick(d) {
  console.log("click")
  if (d.group != 1) {
    // Reset select attribute
    node.each(function(d) {
      d3.select(this).data()[0].select = 0;
    });

    // Change attribute of main  
    d.select = 1;
    console.log(d3.select(this));
    d.size = mainSize;
    // d.group = 1;
    d3.select(this)
      .transition()
      .duration(250)
      .ease(d3.easeCubicIn)
      .attr("r", mainSize*2)
      .style("fill", colors[0]);

    // Change select attribute of sub
    for (let i = 0; i < datajson["links"].length; i++) {
      let obj = datajson["links"][i];
      if (obj["source"] == d) {
        obj["target"]["select"] = 1;
      }
    }

    // Remove all other elements
    subCounter = 0;
    node.each(removeCircles);
    link.each(removeLinks);
    labels.each(removeLabels);

    simulation
    .force("collide", d3.forceCollide().radius(getForceCollide))
    .restart();
  }
  if (subCounter == 1) {
    displayAnimal();
  }
}

function handleOnDblClick(d) {
  console.log("BG clicked");

  // Check if we are at root level
  let atRoot = false;
  node.each(function(d) {
    if (d3.select(this).data()[0].group == 1 && d3.select(this).attr("visibility") != "hidden") {
      atRoot = true;
    }
  });

  // Not at root level
  if (!atRoot) {
    // Size for main
    node.each(function(d) {
      console.log(d);
      if (d.group == 1) {
        d3.select(this)
        .transition(1000)
        .ease(d3.easeCubicIn)
        .attr("r", mainSize * 2);
        d3.select(this).data()[0].size = mainSize;    
      }
      if (d.group == 2) {
        d3.select(this)
        .transition(1000)
        .ease(d3.easeCubicIn)
        .attr("r", subSize * 2);  
        d3.select(this).data()[0].size = subSize;        
      }
      if (d.group == 3) {
        d3.select(this)
        .transition(1000)
        .ease(d3.easeCubicIn)
        .attr("r", miniSize * 2);  
        d3.select(this).data()[0].size = miniSize;          
      }
      d3.select(this).data()[0].select = 0;
      d3.select(this)
        .transition()
        .duration(500)
        .style("fill", getGroupColor)
        .style("visibility", "visible");
    });
    showLinks();
    showLabels();
  }

  subCounter = 0;
  clearSelection();
  console.log(atRoot);

  simulation
    .force("collide", d3.forceCollide().radius(getForceCollide))
    .restart();
}

function displayAnimal(d) {
  playSound();

  d3.select("#svg-animal-page")
    .style("visibility", "visible")

  animalBox.transition().duration(1000)
    .styleTween("width", function(){
        return d3.interpolateString(0+"%", 100 + "%");
    })
    .styleTween("height", function(){
        return d3.interpolateString(0+"vh", 96 + "vh");
    })
  d3.select("#animal-container")
    .style("visibility", "visible")
    .transition().duration(500)
    .delay(1000)
    .style("opacity", 1);
}

function hideAnimal() {
  playSound();

  d3.select("#animal-container").transition().duration(250)
    .style("opacity", 0);

  animalBox.transition().duration(500)
    .delay(250)
    .styleTween("width", function(){
        return d3.interpolateString(100+"%", 0 + "%");
    })
    .styleTween("height", function(){
        return d3.interpolateString(96+"vh", 0 + "vh");
    })

  d3.select("#svg-animal-page")
    .transition()
    .delay(750)
    .style("visibility", "hidden")

  d3.select("#animal-container")
    .transition()
    .delay(750)
    .style("visibility", "hidden");
}

function showHelp() {
  console.log("show help");
  playSound();

  d3.select("#svg-help-page")
    .style("visibility", "visible");

  helpBox.transition().duration(1000)
    .styleTween("width", function(){
        return d3.interpolateString(0+"%", 100 + "%");
    })
    .styleTween("height", function(){
        return d3.interpolateString(0+"vh", 96 + "vh");
    })
  d3.select("#help-container")
    .style("visibility", "visible")
    .transition().duration(500)
    .delay(1000)
    .style("opacity", 1);
}

function hideHelp() {
  playSound();

  d3.select("#help-container").transition().duration(250)
    .style("opacity", 0);

  helpBox.transition().duration(500)
    .delay(250)
    .styleTween("width", function(){
        return d3.interpolateString(100+"%", 0 + "%");
    })
    .styleTween("height", function(){
        return d3.interpolateString(96+"vh", 0 + "vh");
    })

  d3.select("#svg-help-page")
    .transition()
    .delay(750)
    .style("visibility", "hidden")

  d3.select("#help-container")
    .transition()
    .delay(750)
    .style("visibility", "hidden");
}

function removeCircles(d) {
  // Remove all other circles
  if (d3.select(this).data()[0].select != 1) {
    d3.select(this)
      .transition(1000)
      .ease(d3.easeCubicIn)
      .attr("r", 0)
      .attr("visibility", "hidden");
    d3.select(this).data()[0].size = 0;
  }
  // Update attributes of subs
  else {
    if (d3.select(this).data()[0].size != mainSize) {
      d3.select(this).data()[0].size = subSize;

      d3.select(this)
        .transition()
        .duration(500)
        .ease(d3.easeCubicIn)
        .attr("r", subSize * 2)
        .style("fill", colors[1]);
      }
      subCounter++;
  }
}

function getColor(d) {
  if (d3.select(this).attr("r") == mainSize * 2) {
    return colors[0];
  }
  else if (d3.select(this).attr("r") == subSize * 2) {
    return colors[1];
  }
  else {
    return colors[2];
  }
}

function getGroupColor(d) {
  return colors[d.group-1];
}

function removeLinks(d) {
  if (d3.select(this).data()[0].source.select != 1) {
    d3.select(this)
    .style("visibility", "hidden");
    // .remove();
  }
}

function removeLabels(d) {
  if (d3.select(this).data()[0].select != 1) {
    d3.select(this)
    .style("visibility", "hidden");
    // .remove();
  }
}

function showLinks() {
  link.each(function(d) {
    d3.select(this)
      .style("visibility", "visible");
  });
}

function showLabels() {
  labels.each(function(d) {
    d3.select(this)
      .style("visibility", "visible");
  });
}

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

function playSound() {
  let sound = document.querySelector("#audio-water-drop");
  sound.play();
}

function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}

// icon click
let animalCloseBtn = document.querySelector("#icon-container");
animalCloseBtn.onclick = hideAnimal;

let helpOpenBtn = document.querySelector("#helpIcon");
helpOpenBtn.onclick = showHelp;

let helpCloseBtn = document.querySelector("#help-icon-container");
helpCloseBtn.onclick = hideHelp;
