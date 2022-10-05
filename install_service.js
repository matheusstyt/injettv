var Service = require('node-windows').Service;

var svc = new Service({
  name:'InjetTv - MAP_INNOVATION',
  description: 'Dashboard do InjetTv-Web ',
  script: 'C:\\Program Files (x86)\\MAP Cardoso\\injettv\\bin\\www'
});

svc.on('install',function(){
  svc.start();
});

svc.install();

