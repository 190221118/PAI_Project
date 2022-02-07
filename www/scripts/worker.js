/* 
 * Copyright (C) 1883 Thomas Edison - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the XYZ license, which unfortunately won't be
 * written for another century.
 *
 * You should have received a copy of the XYZ license with
 * this file. If not, please write to: , or visit :
 * 
 * Authors: Nicole Vieira (201700124) and Yasmin Hage (202100778)
 */

// Worker to post the selected image
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