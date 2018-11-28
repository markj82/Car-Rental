// APP SETUP
var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    methodOverride  = require('method-override'),
    Car             = require('./models/car');
    
   
// APP CONFIG
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));  // plugin to Express to retrieve data coming from a form

// __dirname always give current directory, so its safer to use it
app.use(express.static(__dirname + "/public"));     // to use public folder for css file system
app.use(methodOverride("_method"));



// DB CONGIG
mongoose.connect("mongodb://localhost/cars_db", function(err, ok){
    if(err){
        console.log("There was an error with connecting to mongoose db");
    } else {
        console.log("connected to mongodb: IT IS OKI DOKI");
    }
});

// ROUTES
app.get('/', function(req, res){
    res.render('landing');
});

app.get('/index', function(req, res){
    Car.find(function(err, foundAllCars){
        if(err){
            console.log(err);
        } else {
            res.render('index', {car:foundAllCars});
        }
    })
})

app.get('/admin-panel', function(req, res){
    Car.find(function(err, foundAllCars){
        if(err){
            console.log(err);
        } else {
            res.render('admin-panel', {car:foundAllCars});
        }
    })
})


//CREATE ROUTE - add new car to DB
app.post("/admin-panel", function(req, res){
    // get data from form and add to cars array
    var make = req.body.make;
    var model = req.body.model;
    var color = req.body.color;
    var year = req.body.year;
    var image = req.body.image;
    var qty = 1;
   
    var newCar = {make:make, model:model, color:color, year:year, qty:qty, image:image};
    // Create a new car and save to DB
    Car.create(newCar, function(err, newlyCreatedCar){
        if(err){
            console.log(err);
        } else {
            res.redirect('/admin-panel');
        }
    });
});

// NEW ROUTE
app.get("/admin-panel/new", function(req, res){
    res.render('newcar'); 
 });

// EDIT ROUTE
app.get("/admin-panel/:id/edit", function(req, res){
    Car.findById(req.params.id, function(err, foundCar){
        res.render('editcar', {car:foundCar});
    })
    
});

// UPDATE ROUTE
app.put("/admin-panel/:id", function(req, res){
    Car.findByIdAndUpdate(req.params.id, req.body.car, function(err, updatedCar){
        if(err){
            console.log(err);
        } else {
            res.redirect('/admin-panel');
        }
    })
})

// UPDATE QTY ROUTE
app.put("/admin-panel/:id/changeqty", function(req, res){
    Car.findByIdAndUpdate(req.params.id, req.body.car, function(err, updatedCar){
        if(err){
            console.log(err);
            console.log("there was en error with changing qty");
        } else {
            console.log(updatedCar);
            console.log(req.body.car.qty);
            res.redirect('/admin-panel');
        }
    })
});


// DESTROY ROUTE
app.get("/admin-panel/:id", function(req, res){
    Car.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/admin-panel');
        }
    });
});

// app.listen
app.listen(process.env.PORT || 3000, process.env.IP, function(err, res){
    if(err){
        console.log("There was a problem with running a server...")
    } else {
        console.log("RentCar app server is running...");
    }
});
