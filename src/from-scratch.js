const resolvedWrapper = (val) => {
  //creating a new resolved promise and feeding the argument into the new promise object
  return Promise.resolve(val)
};

console.log(resolvedWrapper(`woof`))


const rejectedWrapper = (string) => {
  //creating a promise reject object, which returns the argument value as a new error that must be caught. 
  //You don't need to make the error object a function (new Error(value => yadda yadda)) to create a simple promise
  //In this case, the string is the message as the Error object has 3 ish options to choose from: Error(message, cause)
  //do not use filename or linenumber as it's not standard (not available for every browser for people to use)
  return Promise.reject(new Error(string))
};

const handleResolvedPromise = (promise) => {
  //by returning promise.then() inside of handleResolvedPromise(), you're returning the new promise produced by the .then() function to whatever function is calling handleResolvedPromise().
  /*
  by returning the ***VALUE INSIDE OF*** promise.then(), you're producing a new promise with readily available data. if you decide to chain another .then() function to the 
  new promise, this will allow the data inside the new promise to be fed into the next .then() (the next and newer/newest promise) function, manipulated/used, and returned once again to be fed into the next new promise. 
  */
  return promise.then(value => {
    console.log(value); // Logging the resolved value
    return value; // Returning the resolved value for further chaining or handling
  });

  //THE CODE I USED BEFORE -------------
  // [return promise.then(value => console.log(value))] - This logs undefined because I'm not returning anything explicitly outside of the .then() function.
  //  //.then() - accessing the data of the resolved promise (which was fulfilled and is not giving us error data)
  //value => console.log(value) - taking said data of the resolved promise (whatever it gave back) and logging it to the console
  //neither of these return anything
};

// handleResolvedPromise(Promise.resolve("Your random string: etfvep"))

const handleResolvedOrRejectedPromise = (promise) => {
  return promise.then(value => {
    console.log(value)
    return value
  }).catch(error => {
    //you have to get the message attribute from the error object returned by .catch(), so the message isn't 'Your error message was: Error: Your random error: randomstring'
    console.error(`Your error message was: ${error.message}`) //the value you log
    return null //the value you return to be handled by the next promise
  })
};



const pauseForMs = (mSec) => {
  //creating the new promise to be returned
  const newPromise = new Promise((resolve, reject) => {
    //calling the setTimeout function
    setTimeout(() => {
      //what will be done after the amount of time given passes, which is that the problem will resolve (but as per requested by the tests, resolves nothing)
      resolve();
      //the amount of time that setTimeout will take to resolve this promise, fed in by the argument passed into parameter mSec
    }, mSec)

  })

  //making pauseForMs return this promise 
  return newPromise

};



module.exports = {
  resolvedWrapper,
  rejectedWrapper,
  handleResolvedPromise,
  handleResolvedOrRejectedPromise,
  pauseForMs,
};
