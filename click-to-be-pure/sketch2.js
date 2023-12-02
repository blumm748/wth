let sketch2 = function(p) {
    p.setup = function() {
      let introTitlePre5 = p.select('.intro__title-pre5');
      introTitlePre5.mouseOver(changeBg);
      introTitlePre5.mouseOut(resetBg);
    };
  
    function changeBg() {
      p.select('body').style('background-color', 'red');
    }
  
    function resetBg() {
      p.select('body').style('background-color', 'black');
    }
  
    p.draw = function() {
      if (introTitlePre5.elt.matches(':hover')) {
        // Put the code you want to execute when intro__title-pre5 is hovered over here
      }
    };
  };
  
  let myp52 = new p5(sketch2);
  