
const maquinas = $('.teste');
const itemsPerView = 5;
let index = 0;

for (let i = 0; i < maquinas.length; i++) {
    $(maquinas[i]).css('display', 'none');
}
for (let i = index; i < (index + itemsPerView); i++) {
    $(maquinas[i]).css('display', 'table-row');
}
index += itemsPerView;

setInterval(function() {
    if (index < maquinas.length) {
        for (let i = 0; i < maquinas.length; i++) {
            $(maquinas[i]).css('display', 'none');
        }
        for (let i = index; i < (index + itemsPerView); i++) {
            $(maquinas[i]).css('display', 'table-row');
        }
        index += itemsPerView;
    } else {
        index = 0;
        window.location.replace(`/${nextPage}`);
    }
}, slideTransition);
$('form').submit(e => e.preventDefault());
$('#circle').change(e => {
    var valor = $("input[name='group1']:checked").val();
    //console.log(valor)
    if(valor == 0){
        $('#circle1').attr(`
        `)
    }
});