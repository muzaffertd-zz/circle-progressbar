


(function ( $ ) {
  $.fn.circleProgress = function( options ) {
    const width = this[0].clientWidth;
    const height = this[0].clientHeight;
    
      // This is the easiest way to have default options.
      var settings = $.extend({
          // These are the defaults.
          colors: ['#7033FF','#F9A600','#FF7D4D'],
          data: [90,80,65]
      }, options );
      console.log(settings)
      const data_len = settings.data.length;
      const tenpercent = (10*width)/100;
      //For Hex To RGB
      function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

      // Creating Filters
      var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

      for(let i =0; i<data_len; i++){
        var filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        filter.setAttribute("id","shadow"+(i+1));
        
        let RGB = hexToRgb(settings.colors[i]);
        var gaussianFilter = document.createElementNS("http://www.w3.org/2000/svg", "feDropShadow");
        // gaussianFilter.setAttribute("in","SourceGraphic");
        gaussianFilter.setAttribute("x","1");
        gaussianFilter.setAttribute("y","1");
        gaussianFilter.setAttribute("stdDeviation","20");
        gaussianFilter.setAttribute("flood-color",`rgba(${RGB.r},${RGB.g},${RGB.b},0.4)`);

        filter.appendChild(gaussianFilter);
        defs.appendChild(filter);
      }
      console.log(hexToRgb(settings.colors[0]));
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute('viewPort','0 0 100 100');
      svg.setAttribute('preserveAspectRatio','xMidYMid meet');
      svg.setAttribute('height','100%');
      svg.setAttribute('width','100%');
      // svg.appendChild(defs);
      svg.style.transform = 'rotate(-90deg)';
      let percentage = parseInt(settings.data.reduce((acc,d)=>acc+d) / 3);
      console.log(parseInt(percentage));
      let radius_arr =[];
      let circum_arr =[];
      for(let i=0; i<data_len;i++){
        let radius = (width - tenpercent*(i+1))/2;
        radius_arr.push(radius);
        var circum = Math.PI*(radius*2);
        circum_arr.push(circum);
        for(let j=0; j<2; j++){
          let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
          
          if(j==1){
            circle.setAttribute('class','bar');
            circle.setAttribute('stroke',settings.colors[i]);
            circle.setAttribute('stroke-dashoffset',circum);
            circle.setAttribute('stroke-width','2.5');
            // circle.setAttribute('filter','url(#shadow'+(i+1)+')');
          }
          else{
            circle.setAttribute('stroke-width','1');
            circle.setAttribute('stroke','#eaeaea');
          }
          var pct = ((100-settings.data[i])/100)*circum;
          
          circle.setAttribute('stroke-dasharray',circum);
          circle.setAttribute('r',radius);
          circle.setAttribute('cx','50%');
          circle.setAttribute('cy','50%');
          svg.appendChild(circle);
        }
        
          
        let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute('class','dot');
        circle.setAttribute('r','2');
        circle.setAttribute('cx',(100-5*(i+1)+'%'));
        circle.setAttribute('cy','50%');
        circle.setAttribute('stroke-width','2');
        circle.setAttribute('stroke',settings.colors[i]);
        circle.setAttribute('fill','#ffffff');
        
        svg.appendChild(circle);
      }
      $(this[0]).html(svg);
      let container = this[0];
      console.log(container.querySelectorAll('.bar'));
      setTimeout(function(){
        let progressBars = container.querySelectorAll('.bar');
        let dots = container.querySelectorAll('.dot');
        for(let i=0; i<data_len;i++){
          
            console.log(progressBars[i]);
            var pct = ((100-settings.data[i])/100)*circum_arr[i];
            let angle = parseInt((circum_arr[i] - pct)*(360/circum_arr[i]));
            progressBars[i].setAttribute('stroke-dashoffset',pct);
            dots[i].style.transform = 'rotate('+angle+'deg)';
          }
          $(container).append(`
            <span class="info-wrap">
              <span class="total-percentage" style="font-size:${(width*0.11)}px;">${percentage}%</span>
              <span style="font-size:${(width*0.08)}px;">Completed</span>
            </span>
          `);
        },500);
      //   return this.css({
      //     fontSize: width
      // });
  };
  
}( jQuery ));

$('.q1').circleProgress({
  colors: ['#7033FF','#F9A600','#FF7D4C'],
  data: [50,70,85]
});