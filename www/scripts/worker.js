self.addEventListener('message', d =>{
  const imgData = d.data;
  const width = imgData.width;
  const height = imgData.height;
  const data = imgData.data;

  for(let x=0; x<width; x++){
      for(let y=0; y<height; y++){
          let index=(x + (y * width)) * 4;
          data[index]=data[index]*1.2;
      }
  }

  self.postMessage(imgData);
})