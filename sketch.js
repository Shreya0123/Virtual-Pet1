//Create variables here
var dog,happydogImg, dogImg;
var database,foodS,foodstock;

function preload()
{
dogImg = loadAnimation("images/dogImg.png");
happydogImg = loadAnimation("images/dogimg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(500, 500);
 
  var foodstock=database.ref("Food");
  foodstock.on("value",readStock);

  var dog = createSprite(300,300,50,50);
  dog.addAnimation("dogImg",dogImg);
  dog.scale=0.1;
  
}


function draw() {  
  background(46, 139, 87);
  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Feed Coco milk by pressing UP arrow!",130,10,300,20);
   
  

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.changeAnimation("dogImg1",happydogImg);
  }
 
  

  drawSprites();
  
  
 
  //add styles here
  /*fill("white");
  
  
  textSize(15);
  fill("black");
  text("Food Remaining  :"+foodS, 200,200);*/

  

}

function readStock(data){
  foodS = data.val();
  
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref("/").update({   //root diirectory - "/"
    Food:x
  })
}
