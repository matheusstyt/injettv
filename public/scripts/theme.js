const html = document.querySelector("html");
const transformKey  = key =>
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) =>{
     Object.keys(colors).map(key =>{
        //console.log(key)
         html.style.setProperty(transformKey(key), colors[key])    
            });
}

// function ScrollingAuto(){
//     $(document).ready(function(){
//         $('body,html').animate({scrollTop: 500}, 10000); 
//     });
// }
// setTimeout(ScrollingAuto, 7500);


if (localStorage.getItem('theme')) {

    const temaCarregado = localStorage.getItem('theme');
    const tema1Carregado = localStorage.getItem('theme1')
    changeColors(JSON.parse(temaCarregado));
    const tema1 = JSON.parse(tema1Carregado);
    html.style.setProperty("--tema-padrao", tema1.temaPadrao)
    //console.log(temaCarregado)
    //console.log(tema1Carregado)
 }else{
     const TemaAtual = {
        bg: getStyle(html, "--bg"),
        bgPanel: getStyle(html, "--bg-panel"),
        bgContainer: getStyle(html, "--bg-container"),
        secundatyColor: getStyle(html, "--secundary-color"),
        colorHeadings: getStyle(html, "--color-headings"),
        colorText: getStyle(html, "--color-text"),
        colorTitle: getStyle(html, "--color-title"),
        monocromaticColor: getStyle(html, "--monocromatic-color"),
        temaPadrao: getStyle(html, "--tema-padrao")
     }
     localStorage.setItem('theme', JSON.stringify(TemaAtual));
 }