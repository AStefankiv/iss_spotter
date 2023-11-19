// const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');
const nextISSTimesForMyLocation = require('./iss');


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   }
//   console.log(ip);
// });


// fetchCoordsByIP("ip", (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log(coords);
// });


// fetchISSFlyOverTimes({ latitude: '51.0486151', longitude: '-114.0708459' }, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log(passTimes);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});