const express = require('express'),
    router = express.Router(),
    panel = require('./../helpers/paineis'),
    logo = require('./../helpers/logo'),
    time = require('./../helpers/time'),
    axios = require('axios'),
    data = require('./../helpers/date');

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
 
    today = dd + '/' + mm + '/' + yyyy;
    
//     function retornaMes(){

//         if (data.getMonth(new Date()) < 10){

//             return "0" + data.getMonth(new Date())
//         } else{

//             return data.getMonth(new Date())
//         }
// }    


// axios
// .post('/config', (request, response, next) => {
//     let imagem = request.files.imagem;
//     if(imagem !== undefined && imagem.size != 0) {
//         imagem.mv(`public/images/logo/logo.jpg`, (err) => {
//             if (err) return response.send('Erro ao enviar imagem. ' + err);
//             console.log('File uploaded!');
//         });
//     }
//     request.session.paineis = panel.selected(request.body);
//     request.session.cfg = request.body;
//     request.session.cfg.legends = request.body.legendaOff
//     request.session.cfg.slide = time.getSlideTime(request.body.tempo_trans)
//     request.session.cfg.logo = logo.hasLogo();
//     request.session.cfg.tempo_trans = time.getTime(request.body.tempo_trans);

//     //produtividadeTask(request);

//     if(request.session.paineis.produtividade == true)
//         response.redirect('/produtividade');
//     else if (request.session.paineis.maquinas == true)
//         response.redirect('/maquinas');
//     else
//         response.redirect('/paradas');
   

// })

module.exports = router;
//}
