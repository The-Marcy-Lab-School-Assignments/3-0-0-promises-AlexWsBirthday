const crypto = require('crypto');

//turns the random colors into strings
const numsToRGBColor = ([color1, color2, color3]) => {
  return `rgb(${color1}, ${color2}, ${color3})`;
};

//generates the random color by generating 3 random numbers (hence, specifying 3 slots in the generated array Uint8Array(**3**))
const getRandomBytes = () => new Promise((resolve, reject) => {

  crypto.randomFill(new Uint8Array(3), (err, buffer) => {
    if (err) return reject(err);
    resolve([...buffer]);

  });
});

//There are four thens because we are asking for 4 colors. So the thens act as requests, we are requesting 4 colors, by using then 4 times. 
const return4RandomColors = () => {
  //the general array that will hold the rgb values or colors
  const colors = [];
  return getRandomBytes()
    //defining individual colors (or color) to then be pushed into the empty array that was initialized
    .then((color) => {
      colors.push(numsToRGBColor(color))
      //using return to kill the then function when its done running, to signal the program to move on to the next then function
      return getRandomBytes()
    })
    .then((color) => {
      colors.push(numsToRGBColor(color))
      return getRandomBytes()
    })
    .then((color) => {
      colors.push(numsToRGBColor(color))
      //returning gRB basically calls the function to produce 3 random numbers again, and feeds it into the next then block to handle. 
      return getRandomBytes()
    })
    .then((color) => {
      colors.push(numsToRGBColor(color))
      //stopping the requesting by returning the fully updated colors array. We don't need to go back and ask getRandomBytes()
      return colors
    })
    .catch((err) => {
      console.error(err);
    });
};


return4RandomColors().then(console.log);

module.exports = {
  numsToRGBColor,
  getRandomBytes,
  return4RandomColors,
};
