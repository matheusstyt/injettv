const express = require('express'),
    router = express.Router(),
    axios = require('axios'),
    panel = require('./../helpers/paineis'),
    data = require('./../helpers/date'),
    time = require('./../helpers/time'),
    logo = require('./../helpers/logo'),
    json = require('flatted'),
    legend = require('../public/scripts/legends')

var contador = 0;
var ptsGlobal;
var ultimaAtualizacao;
var globalRequest;

function getToday(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy + "  " + today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
    
    return today;
}

router
.get('/', (request, response, next) => {
    

    if(contador == 0) { 

        globalRequest = request;

        setInterval(function(){ 
            maquinasTask(request);
        }, 600000);

    axios
    .get(`${process.env.API_URL}/idw/rest/injet/monitorizacao/turnoAtual`)
    .then(turnoAtual => {
    
        axios.post(`${process.env.API_URL}/idw/rest/injet/monitorizacao`, {
            idTurno: turnoAtual.data.idTurno,
            filtroOp: 0,
            cdGt: request.session.cfg.galpao,
            turnoAtual: true,
            dtReferencia: `${data.day(new Date())}/${data.getMonth(new Date())}/${data.getYear(new Date())}`
        })
        .then(res => {            
            ptsGlobal = res;
            ultimaAtualizacao = getToday()
            
            let abaixoMeta = [], semConexao = [], naMeta = [], parada = [], pts = [], pts_ = [];
            let legendaColors1 = [
                {nome:'Parada', color: '#c0392b'},
                {nome:'Na Meta', color: '#4cd137'},
                {nome:'Fora da Meta', color: '#f1c40f'},
                {nome:'Offline', color: 'rgb(135, 135, 135)'}
            ], legendaColors2 = [
                {nome:'Em Alerta', color: '#f1c40f'},
                {nome:'Sem Planejamento', color: 'blue'},
                {nome:'90% Op Concluída', color: 'rgb(27, 26, 90)'},
                {nome:'Planejamneto Concluído', color: 'rgb(45, 238, 235)'},
                {nome:'Índice de Refugo Maior que 5%', color: 'rgb(142, 142, 142)'},
                {nome:'Parada sem Peso na Eficiência', color: 'rgb(235, 23, 192)'},
                {nome:'Parada não Informada', color: 'rgb(0, 0, 0)'},
                {nome:'CIP(Controle Início Processo)', color: 'rgb(115, 239, 111)'},
                {nome:'Sem Ocorrências', color: '#ffff'}
            ]
            res.data.pts.forEach(pt => {
                if(pt.dsProduto !== undefined) {
                    if(pt.dsProduto.indexOf('\n') !== -1)
                        pt.dsProduto = pt.dsProduto.substring(0, pt.dsProduto.indexOf('\n'));
                }

                if(pt.icone.caminhoIcone.includes('AbaixoMeta')) {
                    pt.icone.caminhoIcone = '#f1c40f';
                    abaixoMeta.push(pt);
                }
                if(pt.icone.caminhoIcone.includes('SemConexao')) {
                    pt.icone.caminhoIcone = '#7f8c8d';
                    semConexao.push(pt);
                }
                if(pt.icone.caminhoIcone.includes('NaMeta')) {
                    pt.icone.caminhoIcone = '#4cd137';
                    naMeta.push(pt);
                }
                if(pt.icone.caminhoIcone.includes('Parada')) {
                    pt.icone.caminhoIcone = '#c0392b';
                    parada.push(pt);
                }
            });
            pts = pts.concat(naMeta, abaixoMeta, parada, semConexao);
    
            if(typeof request.session.cfg.maquinas === 'string'  ){            
                if (request.session.cfg.maquinas) {
                    pts_ = pts_.concat(pts.filter((pt) => {
                        if (pt.cdPt === request.session.cfg.maquinas) 
                        return pt;
                    }));
                    pts = pts_;
                }
            }
            if(typeof request.session.cfg.maquinas === 'undefined' || typeof request.session.cfg.maquinas === 'object'  ){            
                if (request.session.cfg.maquinas) {
                    request.session.cfg.maquinas.forEach((maquina) => {
                        pts_ = pts_.concat(pts.filter((pt) => {
                            if (pt.cdPt === maquina) 
                            return pt;
                        }));
                    });
                    pts = pts_;
                }
            }
            contador++;
            console.log('legendas deu bom : '+request.session.cfg.legends)

            response.status(200).render('maquinas', {
                colors1: legendaColors1,
                colors2: legendaColors2,
                x: 1,
                pts: pts, 
                legends: request.session.cfg.legends, 
                secondsTransition: request.session.cfg.tempo_trans, 
                slideTransition : request.session.cfg.slide,
                cor_fundo: request.session.cfg.cor_fundo, 
                nextPage: panel.switch(request.baseUrl, request.session.paineis), 
                logo: logo.hasLogo(),
                ultimaAtualizacao: getToday()
            });
            //console.log('mauina time : '+slideTransition)
        })
        .catch(error => response.status(500).render('error', {error: error}));
    })
    .catch(errorTurnoAtual => response.status(500).send(json.stringify(errorTurnoAtual)));

    }else{

        globalRequest = request;

        let abaixoMeta = [], semConexao = [], naMeta = [], parada = [], pts = [], pts_ = [];
        //console.log("Entrou so else");
        let legendaColors1 = [
            {nome:'Parada', color: '#c0392b'},
                {nome:'Na Meta', color: '#4cd137'},
                {nome:'Fora da Meta', color: '#f1c40f'},
                {nome:'Offline', color: 'rgb(135, 135, 135)'}
            ], legendaColors2 = [
                {nome:'Em Alerta', color: '#f1c40f'},
                {nome:'Sem Planejamento', color: 'blue'},
                {nome:'90% Op Concluída', color: 'rgb(27, 26, 90)'},
                {nome:'Planejamneto Concluído', color: 'rgb(45, 238, 235)'},
                {nome:'Índice de Refugo Maior que 5%', color: 'rgb(142, 142, 142)'},
                {nome:'Parada sem Peso na Eficiência', color: 'rgb(235, 23, 192)'},
                {nome:'Parada não Informada', color: 'rgb(0, 0, 0)'},
                {nome:'CIP(Controle Início Processo)', color: 'rgb(115, 239, 111)'},
                {nome:'Sem Ocorrêncis', color: '#ffff'}
        ]
        ptsGlobal.data.pts.forEach(pt => {
          
            if(pt.dsProduto !== undefined) {
                if(pt.dsProduto.indexOf('\n') !== -1)
                    pt.dsProduto = pt.dsProduto.substring(0, pt.dsProduto.indexOf('\n'));
            }

            if(pt.icone.caminhoIcone.includes('f1c40f') || pt.icone.caminhoIcone.includes('AbaixoMeta')) {     
                pt.icone.caminhoIcone = '#f1c40f';           
                abaixoMeta.push(pt);
                //console.log("Tamanho do abaixoMeta:" + abaixoMeta.length);
            }
            if(pt.icone.caminhoIcone.includes('7f8c8d') || pt.icone.caminhoIcone.includes('SemConexao')) {
                pt.icone.caminhoIcone = '#7f8c8d';                 
                semConexao.push(pt);
                //console.log("Tamanho do semConexao:" + semConexao.length);
            }
            if(pt.icone.caminhoIcone.includes('4cd137') || pt.icone.caminhoIcone.includes('NaMeta')) { 
                pt.icone.caminhoIcone = '#4cd137';                   
                naMeta.push(pt);
                //console.log("Tamanho do naMeta:" + naMeta.length);
            }
            if(pt.icone.caminhoIcone.includes('c0392b') || pt.icone.caminhoIcone.includes('Parada')) {    
                pt.icone.caminhoIcone = '#c0392b';              
                parada.push(pt);
                //console.log("Tamanho do parada:" + naMeta.parada);
            }
        });
        pts = pts.concat(naMeta, abaixoMeta, parada, semConexao);

        if(typeof request.session.cfg.maquinas === 'string'  ){            
            if (request.session.cfg.maquinas) {
                pts_ = pts_.concat(pts.filter((pt) => {
                    if (pt.cdPt === request.session.cfg.maquinas) 
                    return pt;
                }));
                pts = pts_;
            }
        }
        if(typeof request.session.cfg.maquinas === 'undefined' || typeof request.session.cfg.maquinas === 'object'  ){            
            if (request.session.cfg.maquinas) {
                request.session.cfg.maquinas.forEach((maquina) => {
                    pts_ = pts_.concat(pts.filter((pt) => {
                        if (pt.cdPt === maquina) 
                        return pt;
                    }));
                });
                pts = pts_;
            }
        }
        //console.log('galpao maquinas: ', request.session.cfg.galpao)

        contador++;
        console.log('legendas deu bom : '+request.session.cfg.legends)
        response.status(200).render('maquinas', { 
            colors1: legendaColors1,
            colors2: legendaColors2,
            pts: pts, 
            legends: request.session.cfg.legends, 
            secondsTransition: request.session.cfg.tempo_trans, 
            slideTransition : request.session.cfg.slide,
            cor_fundo: request.session.cfg.cor_fundo, 
            nextPage: panel.switch(request.baseUrl, request.session.paineis), 
            logo: logo.hasLogo(),
            ultimaAtualizacao : ultimaAtualizacao
        });
    }
    
})
.post('/search', (request, response, next) => {
    axios
    .get(`${process.env.API_URL}/idw/rest/injet/monitorizacao/turnoAtual`)
    .then(turnoAtual => {
        axios.post(`${process.env.API_URL}/idw/rest/injet/monitorizacao`, {
            idTurno: turnoAtual.data.idTurno,
            filtroOp: 0,
            cdGt: request.body.galpao,
            turnoAtual: true,
            dtReferencia: `${data.day(new Date())}/${data.getMonth(new Date())}/${data.getYear(new Date())}`
        })
        .then(maquinas => response.status(200).send(maquinas.data.pts))
        .catch(maquinasError => response.status(500).render('error', {error: json.stringify(maquinasError)}));
    })
    .catch(error => response.status(500).render('error', {error:json.stringify(error)}));
});


async function maquinasTask(request){   
    //console.log("Entrou na função de thread as " + getToday());
   await axios
   .get(`${process.env.API_URL}/idw/rest/injet/monitorizacao/turnoAtual`)
   .then(turnoAtual => {
       axios.post(`${process.env.API_URL}/idw/rest/injet/monitorizacao`, {
           idTurno: turnoAtual.data.idTurno,
           filtroOp: 0,
           cdGt: globalRequest.session.cfg.galpao,
           turnoAtual: true,
           dtReferencia: `${data.day(new Date())}/${data.getMonth(new Date())}/${data.getYear(new Date())}`
       })
       .then(res => {            
           ptsGlobal = res;
           ultimaAtualizacao = getToday();

            
          
           
       })
       .catch(error => response.status(500).render('error', {error: 'error'}));
    })
    .catch(errorTurnoAtual => response.status(500).send(json.stringify(errorTurnoAtual)));
    
}    

module.exports = router;

