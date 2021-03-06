var express= require("express");
var router=express.Router();
var Campground=require("../models/campgrounds");
  //CAMPGROUNDS- show all campgrounds
  router.get("/",function(req,res)
  {
     Campground.find({},function(err,campgrounds){
        if(err){
           console.log(err);
        } else{  
          
          res.render("campground/index",{campgnd:campgrounds, currentUser :req.user});
        }
     });
  });
  
  router.post("/",isLoggedIn,function(req,res){
      var name= req.body.name;
      var image=req.body.image;
      var desc=req.body.description;
      var author={
         id: req.user._id,
         username: req.user.username
      }
      var newcamp={name: name, image: image, description:desc,author:author}
      console.log(req.user);
      Campground.create(newcamp, function(err, newca){
         if(err)
         {
            console.log(err);
         } else{
            console.log(newca);
           res.redirect("/campgrounds");
         }
      });
  });
  //NEW- crearte new campground
  router.get("/new",isLoggedIn,function(req,res){
  
     res.render("campground/new");
  });
  //show-more info about the campgrounds
  
  router.get("/:id",function(req,res){
     Campground.findById(req.params.id).populate("comments").exec(function(err,found){
        if(err){
           console.log(err);
        }else{
           console.log(found);
           res.render("campground/show",{campground:found});
        }
     });
  });
  function isLoggedIn(req,res,next){
   if(req.isAuthenticated()){
      return next();
   }
   res.redirect("/login");
}
  module.exports=router;