$("#clear").click(function() {
    
    // setTimeout(function(){
    //     sessionStorage.clear();
    // }, 2000)
    
    // setTimeout(function(){
    //     sessionStorage.clear();
    // }, 3000)
    // window.location.href = '/painel';
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
// if(localStorage.getItem('cliente')) {
//     alert('hm')
//     if(JSON.parse(localStorage.getItem('cliente')).cash == true){
//         alert(JSON.parse(localStorage.getItem('cliente')).cash)
//         $("#clear").click(function() {
//             // localStorage.setItem('cash', false);
//             // sessionStorage.clear();
//             // localStorage.removeItem('cliente');
//             // window.location.href = '/painel';
           
//         });
        
//     }
    

// }

 