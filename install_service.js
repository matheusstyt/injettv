var Service = require('node-windows').Service;

var svc = new Service({
  name:'InjetTv_Mondial',
  description: 'Dashboard do InjetTv-Web',
  script: 'C:\\Users\\simone\\Documents\\InjetTv-mondial\\injettv-2\\bin\\daemon'
});

svc.on('install',function(){
  svc.start();
});

svc.install();