const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/postage', postage)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function postage(request, response) {
  var type = request.query.type;
  var weight = Number(request.query.weight);

  calPostage(response, type, weight);
}

function lettersStamped (weight) {
  var result = 0;

  if(weight <= 1) {
    result = .50;    
  }
  else if(weight > 1 && weight <= 2) {
    result = .71;    
  }
  else if(weight > 2 && weight <= 3) {
    result = .92;    
  }
  else if(weight > 3 && weight <= 3.5) {
    result = 1.13;    
  }
  else {
    result = largeEnvelopes(weight);
  }
  return result;
}

function lettersMetered (weight) {
  var result = 0;

  if(weight <= 1) {
    result = .47;    
  }
  else if(weight > 1 && weight <= 2) {
    result = .68;    
  }
  else if(weight > 2 && weight <= 3) {
    result = .89;    
  }
  else if(weight > 3 && weight <= 3.5) {
    result = 1.10;    
  }
  else {
    result = largeEnvelopes(weight);
  }
  return result;
}

function largeEnvelopes(weight) {
  var result = 0;

  if(weight <= 1) {
    result = 1.00;    
  }
  else if(weight > 1 && weight <= 2) {
    result = 1.21;    
  }
  else if(weight > 2 && weight <= 3) {
    result = 1.42;    
  }
  else if(weight > 3 && weight <= 4) {
    result = 1.63;    
  }
  else if(weight > 4 && weight <= 5) {
    return result = 1.84;    
  }
  else if(weight > 5 && weight <= 6) {
    result = 2.05;    
  }
  else if(weight > 6 && weight <= 7) {
    result = 2.26;    
  }
  else if(weight > 7 && weight <= 8) {
    result = 2.47;    
  }
  else if(weight > 8 && weight <= 9) {
    result = 2.68;    
  }
  else if(weight > 9 && weight <= 10) {
    result = 2.89;    
  }
  else if(weight > 10 && weight <= 11) {
    result = 3.10;    
  }
  else if(weight > 11 && weight <= 12) {
    result = 3.31;    
  }
  else if(weight > 12 && weight <= 13) {
    result = 3.52;    
  }
  else {
    result = 404;
  }
  return result;
}

function fcPackage(weight) {
  var result = 0;

  if(weight <= 4) {
    result = 3.50;    
  }
  else if(weight > 4 && weight <= 8) {
    result = 3.75;    
  }
  else if(weight > 8 && weight <= 9) {
    result = 4.10;    
  }
  else if(weight > 9 && weight <= 10) {
    result = 4.45;    
  }
  else if(weight > 10 && weight <= 11) {
    result = 4.80;    
  }
  else if(weight > 11 && weight <= 12) {
    result = 5.15;    
  }
  else if(weight > 12 && weight <= 13) {
    result = 5.50;    
  }
  else {
    result = 404;
  }
  return result;
}

function calPostage(response, type, weight) {
  
  var result = 0;

  if (type == "Letters (Stamped)") {
    result = lettersStamped(weight);
  } 
  
  else if (type == "Letters (Metered)") {
    result = lettersMetered(weight);
  } 
  
  else if (type == "Large Envelopes (Flats)") {
    result = largeEnvelopes(weight);
  } 
  
  else if (type == "First-Class Package Service-Retail") {
    result = fcPackage(weight);
  }

  if (result == 404) {
    response.render('pages/error');
  }
  var options = {type: type, price: result.toFixed(2)};
  response.render('pages/results', options);
}
