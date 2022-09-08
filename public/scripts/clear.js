$("#clear").click(function() {
    localStorage.clear();
    window.location.href = '/painel';
   
});
$(window).onbeforeunload("load", function(){
    req.session = null 
    localStorage.clear();
    console.log('entrou')
    window.location.href = '/painel';
    
 })
 $(window).onunload("load", function(){
    console.log('entrou')

    req.session = null 
    localStorage.clear();
    window.location.href = '/painel';
    
 })
 window.onbeforeunload = function () {
    console.log('entrou')

    req.session = null 
    localStorage.clear();
    window.location.href = '/painel';
}
    window.onunload = function () {
        //essa evento é executado depois de window.onbeforeunload.
        //Quando a página é fechada, o navegador executa isso aqui(POST)
        //quando o post é executado, o navegador tira tudo da memoria RAM
        //e processador
        console.log('entrou')
        req.session = null 
        localStorage.clear();
        window.location.href = '/painel';
    }


 