$("#clear").click(function() {

    $('#preloader').fadeIn().toggleClass('hide');
    setTimeout(() => {
        //localStorage.removeItem('client')
    }, 200);
    setTimeout(() => {
        window.location.href = '/painel';
    }, 300);
    setTimeout(() => {
        alert('não')
    }, 1000);
});
