function getDominantColor(imageObject) {
    let ctx = document.createElement('canvas').getContext('2d')
    //draw the image to one pixel and let the browser find the dominant color
    ctx.drawImage(imageObject, 0, 0, 1, 1);
  
    //get pixel color
    const i = ctx.getImageData(0, 0, 1, 1).data;
  
    return("#" + ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1));
  }
