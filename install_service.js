var Service = require('node-windows').Service;

var svc = new Service({
  name:'InjetTv_MAP_INNOVATION',
  description: 'Dashboard do InjetTv-Web 2.0',
  script: 'C:\\Program Files (x86)\\MAP Cardoso\\injettv-2\\bin\\daemon'
});

svc.on('install',function(){
  svc.start();
});

svc.install();