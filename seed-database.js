// Seeds the database with some fake data
var faker = require('faker');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var chalkColours = require('./chalk-colours');
var Cases = require('./models/cases');
var db = null, dbName = "njc_triage";

var OUTCOMES = [
  'Finalised - Full intervention order',
  'Finalised - Full limited intervention order',
  'Adjournment - Interim full intervention order',
  'Adjournment - Interim limited intervention order',
  'Adjournment - Straight',
  'Struck Out',
  'Withdrawn'
];

var SERVICES = ['Housing Support', 'Counselling', 'Financial Support', 'Legal Support'];
var MATTERS = ['Family violence', 'Personal Saftey Intervention Order'];
var HEARING_TYPES = ['APPL', 'FV', 'PSIO'];

function newServices(){
  // returns a random slice of the services array
  var max_services = faker.random.number(SERVICES.length);
  return SERVICES.slice(0,max_services);
}

function newParty(){
  return {
    name: faker.name.findName(),
    attended: faker.random.boolean(),
    age: faker.random.number({min: 18, max: 75}),
    birthday: faker.date.past(),
    assigned_services: newServices(),
    conflicts: {
      vla: faker.random.boolean(),
      fls: faker.random.boolean()
    }
  };
}

function newCase(count){
  return {
    meta: {
      case_number: faker.random.arrayElement() + faker.random.number({ min: 1000000, max: 9999999}),
      list_number: count,
      hearing_date: faker.date.future(),
      hearing_type: faker.random.arrayElement(HEARING_TYPES),
      matter: faker.random.arrayElement(MATTERS)
    },
    parties: [
      newParty(),
      newParty()
    ],
    outcomes: [{
      created_at: faker.date.future(),
      outcome: faker.random.arrayElement(OUTCOMES),
      adjournment_date: faker.date.future(),
      notes: faker.random.words(faker.random.number({min: 0, max: 10})),
    }],
  };
}

function seedCases(err, callback){
  return new Promise(function(resolve, reject){
    var cases_count = 20;
    var c = {};
    var counter = 0;
    for (var i=0;i<cases_count;i++){
      c = newCase(i);
      Cases.create(c, function(err, data){
        if (err){
          console.error(chalkColours.error("Failed to save the new case"));
          console.error(c);
          // yeah.... just bail
          finish();
          reject("Couldnt save this element");
        }
        c = null;
        counter++;
        if (Number(counter) == Number(cases_count)){
          resolve();
        }
      });
    }
  });
}

function seedError(message){
  console.log(chalkColours.error(message));
  finish();
}

function seedComplete(){
  console.log(chalkColours.success("Finished seeding"));
}

function finish(db){
  if (db) db.close();
  db = null;
  process.exit(0);
}

function clearDatabase(cb){
  Cases.remove({}, cb);
}

// connect to mongodb
mongoose.connect('mongodb://localhost/' + dbName);
db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
  console.log(chalkColours.success("Connected to monogodb"));
  console.log(chalkColours.warning("Seeding...."));
  clearDatabase(function(err){

    if (err){
      console.error(chalkColours.error("Failed to clear the database"));
      finish(db);
    }

    seedCases()
    .then(function(){
      seedComplete();
      finish(db);
    })
    .catch(seedError);
  });
});
