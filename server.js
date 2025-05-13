import fetch from 'node-fetch';

// USAGE:

// OPTION 1: node server save [animal] [num_pics]
// - animal: dor, cat, or duck. ONLY use when task is save
// - num_pics: number between 1 and 20. ONLY use when task is save

// OPTION 2: node server load

let task = process.argv[2];
if(task == "save"){
  let animal = process.argv[3];
  let num_pics = process.argv[4];

  let fetch_check = true;

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

  if(num_pics <= 0 || num_pics > 20) {
    console.log("Invalid number of pictures requested, please choose a whole number between 1 and 20");
    fetch_check = false;
  }

  if(fetch_check){
    for(let i = 0; i < num_pics; i++){
      fetch(endpoint)
        .then(response => response.json())
        .then(data => console.log(data.url));
    }
  }
} else if(task == "load") {
  console.log("load");
} else {
  console.log("invalid usage");
}

