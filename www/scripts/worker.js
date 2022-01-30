self.addEventListener('message', d =>{
  
  self.postMessage(d.data);
})