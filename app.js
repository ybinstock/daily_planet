var express = require ("express"),
app = express(),
bodyParser = require ("body-parser");


app.set ("view engine", "ejs");
app.use (express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));

var articles = [ {id:1, summary:"test" }];


// static home page
app.get("/", function(req, res) {
	res.render("site/welcome");
});

// static about page
app.get("/about", function(req, res) {
	res.render("site/about");
});

// static contact page
app.get("/contact", function(req, res) {
	res.render("site/contact");
});

// display a summary of the article
app.get("/article", function(req, res) {
	res.render("/site/article");
});

// get a form
app.get("/site/new", function(req, res) {
	res.render("site/new");
});

var count = 2;
// save an article
app.post("/site/article", function(req, res) {
var article = {};
	article.id = count;
	article.summary = req.body.article.summary;
	articles.push(article);
	count++;
	res.render("site/articles", {allMyArticles:articles});
});

app.get("/site/articles", function(req, res) {
	res.render("site/articles", {allMyArticles:articles});

});

// find an article
app.get('/article/:id', function(req, res){

	var articleID = Number(req.params.id);
	var foundarticle;
	articles.forEach(function(article) {
		if (article.id === articleID) {
			foundarticle = article;
		}
	});
	res.render("site/article", {article:foundarticle});
});




app.listen(3000, function() {
	console.log("server is listening on port 3000");
});


