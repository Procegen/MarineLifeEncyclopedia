
<?php
  // THIS FILE IS FOR GETTING DATA FROM THE MARINE SPECIES API AND SAVING AS A CSV FILE.
  // YOU CAN FIND THE CSV FILES IN THE CSV FOLDER


  require "config/config.php";

  // Connect to the DB
  $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
  if ( $mysqli -> connect_errno) {
    echo $mysqli->connect_error;
    exit();
  }
  // Set character set
  $mysqli->set_charset('utf8');


  // SQL query
  $arrayVals = array();
  $sql = "SELECT * FROM `family`;";
  $results_sql = $mysqli->query($sql);
  while($row = $results_sql->fetch_assoc()) {
    $arrayVals[] = $row;
  }
  $len = count($arrayVals);


  $offset = 70516 + 2;
  $j = 0;

  // Qeury api 
  while ($j < 50){
    $i = 0;
    $url = "http://www.marinespecies.org/rest/AphiaRecordsByTaxonRankID/180?belongsTo=2&offset={$offset}"; 
    $result = file_get_contents($url);
    $array = json_decode($result, true);

    while ($i < count($array))
    {
      $parent_id = NULL;
      for($x = 0; $x < $len; $x++) {
        $row = $arrayVals[$x];
        if ($row["name"] == $array[$i]["family"]) {
          $parent_id = $row["id"];
        } 
      }    
      if (!empty($array[$i]["scientificname"])) {
        echo $i+$offset-1 . "," . $array[$i]["scientificname"] . "," . $parent_id;
        echo "<br />";
      }
      $i++;
    }

    $offset += 50;
    $j++;
  }

  $mysqli->close();
?>