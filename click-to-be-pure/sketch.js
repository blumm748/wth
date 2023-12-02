let sketch = function(p) {
	let canvas;
  
	p.setup = function() {
	  canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
	  canvas.position(0,0);
	  canvas.style('z-index','-1');
	};
  
	p.draw = function() {
	  p.background(0);
  
	  if (p.mouseY === 0){
		p.mouseY = 100;
	  }
	  p.clear();
	  p.directionalLight(0, 0, 255, 0, 0, 1);
	  p.directionalLight(0, 0, 0, 0, 0, 0);
	  p.directionalLight(0, 0, 0, 0, 0, 0);
	  p.noStroke();
	  p.rotateX(7);
	  p.scale(2);
	  p.translate(-p.width/2, -p.height/2);
	  p.specularMaterial(250);
  
	  for(let i = 0; i < p.width; i += 30){
		for(let o = 0; o < p.height; o += 60){
		  p.push();
		  p.translate(i, o);
		  p.rotateZ(p.cos(i * o / 1000 + p.frameCount / 1000) / 20 + 1 / 400);
		  p.rotateX(400);
		  p.cylinder(0.1 + p.cos(i / 10 + p.frameCount / 60 + p.mouseX / 400) * 50 + p.cos(o / 50 + p.frameCount / 20) * 30, p.mouseY / 250, 40);
		  p.pop();
		}
	  }
	};
  
	p.windowResized = function() {
	  p.resizeCanvas(p.windowWidth, p.windowHeight);
	};
  };
  
  let myp5 = new p5(sketch);
  