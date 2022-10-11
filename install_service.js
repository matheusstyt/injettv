var Service = require('node-windows').Service;

var svc = new Service({
  name:'InjetTv - MAP_INNOVATION',
  description: 'Dashboard do InjetTv-Web ',
  script: 'C:\\Users\\simone\\Documents\\InjetTv-mondial\\injettv-2\\bin\\www'
});

svc.on('install',function(){
  svc.start();
});

svc.install();

