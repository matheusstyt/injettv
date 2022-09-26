var Service = require('node-windows').Service;

var svc = new Service({
  name:'InjetTv Web',
  description: 'Dashboard do InjetTv-Web',
  script: 'C:\\Users\\simone\\Documents\\InjetTv-mondial\\injettv\\bin\\daemon'
});

svc.on('install',function(){
  svc.start();
});

svc.install();

