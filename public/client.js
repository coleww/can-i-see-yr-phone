/* globals saveAs */

$(function() {
  var canvas = document.getElementById("doItForHer");
  var ctx = canvas.getContext("2d");
  
  
  var checkmark = "https://cdn.glitch.com/1a9eb893-d739-4e1f-b4fd-ab48451806f2%2Fchecky.png?1494471247488";
  var alert = "https://cdn.glitch.com/1a9eb893-d739-4e1f-b4fd-ab48451806f2%2Fdelete.png?1494471247713";
  
  // awful hacks to bypass cross-origin weirdness
  var templateCheckmark = new Image();
  templateCheckmark.src = checkmark + '?' + new Date().getTime();
  templateCheckmark.setAttribute('crossOrigin', '');  
  
  templateCheckmark.onload = function() {
    // ctx.drawImage(templateCheckmark, 0, 0);
  }
  
    var templateAlert = new Image();
  templateAlert.src = alert + '?' + new Date().getTime();
  templateAlert.setAttribute('crossOrigin', '');  
  
  templateAlert.onload = function() {
    ctx.drawImage(templateAlert, 0, 300, 420, 196);
  }
  
  
//   width: 105
  // height: 105?
  
  var $imageList = $('#sortable');
  
  $('#upload').change(function(e) {
    for (var i = 0; i < e.target.files.length; i++) {
      var reader = new FileReader();
      reader.onload = function(event) {
        var img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');
        img.onload = function() {
//           probably need to constrain the image somehow?
          // but also not mess it up for drawing it?
          // link thumbnail to a cached version?
          
          $imageList.append(img)
          
          draw();
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(e.target.files[i]);
    }
  });
  
  $('.download').click(function () {
    canvas.toBlob(function(blob) {
      saveAs(blob, "caniseeyrphone.png");
    });
  });

//   x, y, and width, height for each place you want to draw an image
  
//   UPDATE to be a plain grid i guess?
  var coordinates = [
    [0, 0, 105, 105],
    [105, 0, 105, 105],
    [210, 0, 105, 105],
    [315, 0, 105, 105],
    
    
    [0, 105, 105, 105],
    [105, 105, 105, 105],
    [210, 105, 105, 105],
    [315, 105, 105, 105],
    
    
    [0, 210, 105, 105],
    [105, 210, 105, 105],
    [210, 210, 105, 105],
    [315, 210, 105, 105],
    
    
    [0, 315, 105, 105],
    [105, 315, 105, 105],
    [210, 315, 105, 105],
    [315, 315, 105, 105],
    
    
    [0, 420, 105, 105],
    [105, 420, 105, 105],
    [210, 420, 105, 105],
    [315, 420, 105, 105]
  ];
  
  $imageList.sortable({
    revert: true
  });
  
  $("ul, li").disableSelection();

  $imageList.on( "sortchange", function(event, ui) {
    draw();
  });
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  
  function draw () {
    document.querySelectorAll('.toolbar img').forEach(function(element, i) {
      if (i < coordinates.length) {
        var c = coordinates[i];
        ctx.drawImage(element, c[0], c[1], c[2], c[3]);
        var checkOffset = 55
        ctx.drawImage(templateCheckmark, c[0] + checkOffset, c[1] + checkOffset, 50, 50);
      }
    });
    
    
ctx.fillRect(0, 0, 420, 480);
    
    ctx.drawImage(templateAlert, 0, 300, 420, 196);
  }
});
