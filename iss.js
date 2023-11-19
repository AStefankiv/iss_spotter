const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const ip = JSON.parse(body).ip;
    callback(null, `Your public ip address is: ${ip}`);
  });
};





const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/104.205.221.6`, (error, response, body) => {
  // request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const parseBody = JSON.parse(body);
    if (!parseBody.success) {
      const message = `Success status is: ${parseBody.success}. Server message says: ${parseBody.message} when fetching up for IP ${parseBody.ip}`;
      callback(message, null);
      return;
    }

    const { latitude, longitude } = parseBody;
    callback(null, { latitude, longitude });
  }
  );
};



const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};






const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        return callback(error, null);
      }
      
      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }
        
        callback(null, passTimes);
      }
      );
    }
    );
  }
  );
};


module.exports = nextISSTimesForMyLocation;
// module.exports = {
//   fetchMyIP,
//   fetchCoordsByIP,
//   fetchISSFlyOverTimes,
//   nextISSTimesForMyLocation,
// };