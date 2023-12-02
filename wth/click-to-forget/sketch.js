function setup() {
	createCanvas(windowWidth,windowHeight, WEBGL);
  
}



function draw() {
  
  background (0);
  
	if (mouseY==0){
		mouseY=100
	}
	clear()
	//ambientLight(255);
  directionalLight(0, 0, 255, 0, 0, 1);
  directionalLight(255, 0, 255, 1, 0, 0);
  directionalLight(0, 0, 0, 0, 0, 0);
// 
	// translate(width/2,height/2)
	noStroke();
	//rotateY(0-(mouseX/2000));
	rotateX(7.5-(mouseY/2000))
	//rotateZ(0)
	scale(2);
	translate(-width/2,-height/2);
	specularMaterial(250);

	for(var i=0;i<width;i+=10){
		for(var o=0;o<height;o+=30){
			push();
			translate(i,o);
			rotateZ(cos(i*o/1000+frameCount/100)/20+800/4 );
			rotateX(40);
			cylinder(0.1+sin(i/120+ frameCount/50+ 1/400)*50+sin(o/50 + (frameCount/20-(mouseY/100)))*30,100/5,24);
			pop();
		}
		
	}
	
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}