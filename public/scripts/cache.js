const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('cliente='))
    ?.split('=')[1];

function carregar(event){
    try {
        var cookie = JSON.parse(cookieValue)
        if(cookie) {
            if(cookie.maquinas == true){
                $("#painelMaquinas").prop('checked', true);
            }else{
                $("#painelMaquinas").prop('checked',false)
            }
            if(cookie.produtividade == true){
                $("#painelProdutividade").prop('checked', true);
            }else{
                $("#painelProdutividade").prop('checked',false)
            }
            if(cookie.paradas == true){
                $("#painelParadas").prop('checked', true);
            }else{
                $("#painelParadas").prop('checked',false)
            }
            $('#galpao').val(cookie.galpao)
            $('#preloader').fadeIn().toggleClass('hide');
            $('form').unbind('submit').submit();
        }else{
            alert('NÃO POSSUI DADOS ARMAZENADOS!');
        }   
        event.preventDefault();

    } catch (error) {
        alert('BUGOU, FECHA A ABA E ABRA NOVAMENTE SE QUISER SALVAR CACHE NOVO OU CARREGA-LO NOVAMENTE!')
    }
    
}

function deletar(event){

    document.cookie.split(';').forEach(function(c) {
        document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      });
    // alert("DADOS LIMPOS")
    // localStorage.removeItem('client');
    event.preventDefault();
}

function mostrarValor() {
    const output = document.getElementById('cookie-value')
    var x = JSON.parse(cookieValue)
    output.textContent = `> ${cookieValue}`
}

function clearOutputCookieValue() {
  const output = document.getElementById('cookie-value')
  output.textContent = ''
}