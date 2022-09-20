const produtividade = require('./produtividade'),
    tela3 = require('./cookies'),
    maquinas = require('./maquinas'),
    painel = require('./painel'),
    injettv = require('./injettv'),
    paradas = require('./paradas'),
    redirect = require('./redirect');
//const cos = require('./maquina)    

module.exports = (app) => {
    app
    .use('/cookies', tela3)
    .use('/produtividade', produtividade)
    .use('/maquinas', maquinas)
    .use('/painel', painel)
    .use('/injettv', injettv)
    .use('/paradas', paradas)
    .use('/', redirect);
}; 