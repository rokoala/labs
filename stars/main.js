window.addEventListener("load", function(event){

  (function() {
    
    
    var img = new Image();
    img.src = 'brad.jpg';
    
    var constTime = 10;
    var constIndex = 0;
    var interval = null;
    
      img.onload = function() {
    
        var canvas = document.getElementById('canvas'),
                ctx = canvas.getContext('2d');

        // resize the canvas to fill browser window dynamically
        window.addEventListener('resize', resizeCanvas, false);

        function resizeCanvas() {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          /**
           * Your drawings need to be inside this function otherwise they will be reset when 
           * you resize the browser window and the canvas goes will be cleared.
           */
          drawStuff(); 
        }

        resizeCanvas();

        
        
        function curveEffect(){
          
        
        
        };
        
        
        function drawStuff() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          ctx.drawImage(img, 0, 0);
          img.style.display = 'none';

          var imageData = ctx.getImageData(0,0,canvas.width, canvas.height);
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if(constIndex > constTime){
            for(var i=0; i < ((imageData.data.length / 4) / canvas.width); i=i+3){
              for(var j=0; j < canvas.width ; j=j+3){

                ctx.strokeStyle = "white";
                ctx.fillStyle = "white";

                ctx.beginPath();

                var index = (j + i * imageData.width) * 4;
                var r = imageData.data[index+0] / 255;
                var g = imageData.data[index+1] / 255;
                var b = imageData.data[index+2] / 255;
                var a = imageData.data[index+3] / 255;

                ctx.arc(j,i, (r+g+b)*1,2 * Math.PI, true);
                ctx.stroke();
                ctx.fill();
              }
           }
           clearInterval(interval);
         }else{
           constIndex++;
           for(var i=0; i < ((imageData.data.length / 4) / canvas.width); i=i+3){
              for(var j=0; j < canvas.width ; j=j+3){

                ctx.strokeStyle = "white";
                ctx.fillStyle = "white";

                ctx.beginPath();

                var index = (j + i * imageData.width) * 4;
                var r = imageData.data[index+0] / 255;
                var g = imageData.data[index+1] / 255;
                var b = imageData.data[index+2] / 255;
                var a = imageData.data[index+3] / 255;

                ctx.arc(canvas.width * Math.random(),canvas.height * Math.random(), (r+g+b) ,2 * Math.PI, true);
                ctx.stroke();
                ctx.fill();
              }
           }
         }
      }
      
      interval = setInterval(drawStuff,10);
    }
  })();

});
