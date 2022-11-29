
$(
    () => $('select').formSelect());
var statusL = 0
var Y = 0;
var ip = "http://170.10.0.208:8080";
const salvar = document.querySelector("input[name=painelSalvarParametros]");
salvar.addEventListener("change", ({target})=>{
    target.checked ? ligado(1) : ligado(0)
});
 function ligado(x){
    if(x == 1){
        Y = x;
    }else{
        Y = x;
    }
}
$('form').submit(function (event) {
    event.preventDefault();
    if ($('#galpao').val() !== null) {
        if (!$('#painelProdutividade').is(':checked') && !$('#painelMaquinas').is(':checked') && !$('#painelParadas').is(':checked'))
            M.toast({ html: 'Por favor, selecione ao menos um painel para exibir!', displayLength: 2000 });
        else {
            const cliente = {
                galpao: $("#galpao").val(),
                produtividade: $('#painelProdutividade').is(':checked'),
                maquinas: $('#painelMaquinas').is(':checked'),
                paradas: $("#painelParadas").is(':checked'),
                cor_fundo: '#ffffff',
                path_logo: '',
                statusL: statusL
            }; 
            if(Y == 1){
                setTimeout(() => {
                    document.cookie.split(';').forEach(function(c) {
                        document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                      });
                }, 100);
                setTimeout(() => {
                    document.cookie = `cliente=${JSON.stringify(cliente)}; SameSite=None; Secure`;

                }, 200);

                sessionStorage.removeItem("client");
            }else{
                sessionStorage.setItem('client', JSON.stringify(cliente))
            } 
            $('#preloader').fadeIn().toggleClass('hide');
            setTimeout(() => {
                $(this).unbind('submit').submit();
            }, 400);
            
        };
    } else
        M.toast({ html: 'Por favor, um grupo de trabalho para continuar!', displayLength: 2000 });
});


$('#galpao').change(e => {

    var galpaoTemp;
    var produtividadeTemp;
    var maquinasTemp;
    var paradasTemp;

    galpaoTemp = $('#galpao').val();
    produtividadeTemp = $('#painelProdutividade').val();
    maquinasTemp = $('#painelMaquinas').val();
    paradasTemp = $('#painelParadas').val();

    //$('#preloader').fadeIn().toggleClass('hide');
    axios.get(ip+`/idw/rest/injet/pts/ativoByGalpao`, {
        params: {
            gt:galpaoTemp
        }
    })
    .then(response => {
       // $('#preloader').fadeOut().toggleClass('hide');
        response.data.pts.forEach(pt => $('#maquinas').append(`<option value='${pt.cdPt}'>${pt.cdPt}</option>`));
        $('select').formSelect();
    })
    .catch(err => {
        M.toast({ html: 'Falha ao carregar máquinas, tente novamente mais tarde. ' + error, displayLength: 2000 })
    })

    var cliente = {
        galpao: $("#galpao").val(),
        produtividade: $('#painelProdutividade').is(':checked'),
        maquinas: $('#painelMaquinas').is(':checked'),
        paradas: $("#painelParadas").is(':checked'),
        cor_fundo: '#ffffff',
        path_logo: ''
    };
    
    return true;


});

$('#btn-cor').click(() => $('body').css('background-color', $('#cor_fundo').val()));

$('input:file').change(e => {
    let imagem = document.getElementById('imagem').files[0],
        fileReader = new FileReader();

    fileReader.onload = (fileLoadedEvent) => $('img').attr('src', fileLoadedEvent.target.result);
    fileReader.readAsDataURL(imagem);
});