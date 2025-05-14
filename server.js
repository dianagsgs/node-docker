// GENEAL USAGE:

// OPTION 1: node server save [animal] [num_pics]
// - animal: dog, cat, or duck. ONLY use when task is save
// - num_pics: number between 1 and 20. ONLY use when task is save

// OPTION 2: node server load

// import necessary packages
import fetch from 'node-fetch';
import db from './db.js';

// get first argument
let task = process.argv[2];

// save task
if(task == "save"){
  //get arguments and declare variables
  let animal = process.argv[3];
  let num_pics = process.argv[4];
  let fetch_check = true;

  // determine endpoint
  let endpoint = "";
  if(animal == "cat") {
    endpoint = "https://cataas.com/cat?json=true";
  } else if(animal == "dog") {
    endpoint = "https://random.dog/woof.json";
  } else if(animal == "duck") {
    endpoint = "https://random-d.uk/api/quack";
  } else {
    console.log("Animal not available, choose 'dog', 'cat', or 'duck' only");
    fetch_check = false;
  }

  // determine number of pictures
  if(num_pics <= 0 || num_pics > 20) {
    console.log("Invalid number of pictures requested, please choose a whole number between 1 and 20");
    fetch_check = false;
  }

  // if valid request, fetch necessary pictures
  if(fetch_check){
    for(let i = 0; i < num_pics; i++){
      fetch(endpoint)
        .then(response => response.json())
        .then(data => {
          console.log(data.url)
          // Insert data into the table
          let sql = "INSERT INTO pictures VALUES ('" + data.url + "', '" + animal + "')";
          console.log(sql);
          db.run(sql);
        });
    }
  }

// load task
} else if(task == "load") {
  // load last picture saved
  console.log("load");
  let sql = "SELECT * FROM pictures";
  try {
    let loaded = db.get(sql,[],(err, row) => {
      if (err) console.log("error: " + err);
      else console.log(row);
    });
  } catch (err) {
    console.log(err);
  }

// flag invalid usage
} else {
  console.log("invalid usage");
}
