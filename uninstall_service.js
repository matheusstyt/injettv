require('dotenv').config();

const Service = require('node-windows').Service,
    svc = new Service({
        name:'InjetTv Web - MAP 2',
        description: 'Dashboard do InjetTv-Web 2.0',
        script: process.env.BIN_PATH
    });

svc
.on('uninstall',() => console.log('Uninstall complete.'))
.uninstall();