const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Cupcake ipsum dolor sit amet I love dessert donut I love. Chocolate cake biscuit halvah macaroon toffee sesame snaps. Fruitcake I love cupcake gummies jelly-o I love candy canes. Toffee powder I love topping chupa chups pastry. Gummi bears sesame snaps danish biscuit cake I love donut tiramisu cheesecake. Soufflé candy candy canes topping bear claw sweet roll gummies.Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac haJelly-o toffee cookie apple pie shortbread I love marshmallow toffee bonbon. Cheesecake cupcake I love fruitcake chupa chups. Cookie lemon drops donut gummies tiramisu I love sugar plum caramels. Biscuit sesame snaps candy canes marshmallow I love. Gingerbread dragée gummi bears gummi bears chupa chups brownie danish sweet roll. Liquorice cake chocolate cake wafer gummi bears icing. Apple pie jujubes jelly-o croissant muffin sweet roll tiramisu I love lemon drops. Chocolate bar sesame snaps sweet roll muffin chocolate.bitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleiGummies biscuit donut I love sesame snaps ice cream shortbread. Donut chupa chups topping I love tootsie roll icing danish lemon drops. Caramels sugar plum icing sweet chocolate cake I love halvah I love toffee. Halvah pie brownie cotton candy sesame snaps jujubes I love. Dessert liquorice cheesecake lemon drops sweet sugar plum cheesecake pastry. Lemon drops bonbon sugar plum macaroon pudding I love gummies. Pastry pastry lemon drops bonbon brownie liquorice wafer. Candy jelly cupcake candy canes sugar plum lollipop. I love cake gingerbread candy canes halvah dessert. Biscuit I love candy canes dragée I love I love croissant cake.fend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();


let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.render("home" , ({
        startingContent: homeStartingContent ,
        newContent: posts,
    }));
});

app.get("/about", function(req,res){
    res.render("about" , ({aboutContent: aboutContent}));
});

app.get("/contact", function(req,res){
    res.render("contact" , ({contactContent: contactContent}));
});

app.get("/compose", function(req,res){
    res.render("compose" );
});

app.post("/compose", function(req,res){
    var post = {
        title: req.body.postTitle , 
        content: req.body.postText
    };
    posts.push(post);
        res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
   const requestedTitle = _.lowerCase([req.params.postName]);
   posts.forEach(function(post){
    const storedTitle = _.lowerCase([post.title]);
    if(storedTitle === requestedTitle){
        res.render("post", ({title: requestedTitle , content: post.content}));
    } else {
        console.log("Not match!");
    }
   });
});








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
