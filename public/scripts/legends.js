// const local = windows.localStorage
// var x = JSON.parse(local.getItem('client'))
// alert(x.statusL)
// var off = 1;
// function legendaAtivo(event){
    
//     if(off == 0){
//         off = 1;
//     }else{
//         off = 0
//     }
//     alert('teste '+ off)
//     // if(x == 1){
//     //     statusL = 1
//     // }
//     event.preventDefault()
// }
// if(x.statusL == 1){
//     alert(' legenda off'+x.statusL)
    
//     $('#container').append(
//     "<div class='legends'>"+
//         "<div id='legenda-box'>"+
//             "<h6><b>Cor da 1° Coluna</b></h6>"+
//             "<% colors1.forEach((cor1)=>{  %>"+
//                 "<div class='color-conteiner'>"+
//                     "<div class='cor-p' style='background-color: <%= cor1.color  %> ;'></div>"+
//                     "<p><%= cor1.nome %></p>"+
//                 "</div>"+
//             "<% }); %>"+
//         "</div>"+
//         "<div id='legenda-box'>"+
//             "<h6><b>Cor da 2° Coluna</b></h6>"+
//             "<% colors2.forEach((cor2)=>{  %>"+
//                 "<div class='color-conteiner'>"+
//                     "<div class='cor-p1' style='background-color: <%= cor2.color  %> ; border-bottom: 20px solid <%= cor2.color  %>'></div>"+
//                     "<p><%= cor2.nome %></p>"+
//                 "</div>"+
//             "<% }); %>"+
//         "</div>"+
//     "</div>")
// }else{
//     $('#container').append("<div></div>")
// }
//odule.exports = off;