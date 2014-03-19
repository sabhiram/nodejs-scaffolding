var
    path            = require("path"),

    // express - http://expressjs.com/
    //     A web framework for node, provides easy ways to manage 
    //     a web application"s routes, etc
    express         = require("express"),
    
    public_dir      = path.join("./", "app", "public"),
    views_dir       = path.join("./", "app", "views");

module.exports = function(app, passport) {
    // Configure express application
    app.configure(function() {
        // Setup public visible hosted files
        app.use(express.static(public_dir));
        
        // Setup app preferences

        // There is an issue which prevents express from using the bodyParser since
        // they have not migrated to Connect 3.0. See this post for more details:
        // http://stackoverflow.com/questions/19581146/how-to-get-rid-of-connect-3-0-deprecation-alert
        // app.use(express.bodyParser()); /* becomes */
        app.use(express.json());
        app.use(express.urlencoded());

        app.use(express.cookieParser());

        app.use(express.session({secret: "fuzzleswilleatyou"}));
        app.use(passport.initialize());
        app.use(passport.session());

        // Setup server side template engine
        app.set("view engine", "ejs");
        app.engine("ejs", require("ejs-locals"));
        
        app.set("views", views_dir);
    });
    return app;
};