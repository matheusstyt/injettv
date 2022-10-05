const html = document.querySelector("html");
const checkbox = document.querySelector("input[name=theme]");
const tema = document.querySelector("input[name=cor_fundo]")
const darkBtn = document.getElementsByName("theme")

// SESSÃO DAS LEGENDAS

const legendBtn = document.querySelector("input[name=legend]");
let legendaAtual = 0
if (localStorage.getItem('legends') == 1) {
    $('#legendaOff').val(localStorage.getItem('legends')) 
    $('#ToggleLegend').prop('checked', true);
}else{
    localStorage.setItem('legends', legendaAtual)

    $('#legendaOff').val(legendaAtual) 
}

legendBtn.addEventListener("change", ({target})=>{ target.checked ? ativarL(1) : ativarL(0) });

function ativarL(x){
    legendaAtual = x
    $('#legendaOff').val(legendaAtual) 
    localStorage.setItem('legends', legendaAtual)
    
}

// TÉRMINO DA SESSÃO DAS LEGENDAS

// INICIO DE TEMA 
const getStyle = (element, style) =>
    window
    .getComputedStyle(element)
    .getPropertyValue(style)    

const temaPadrao = getStyle(html, "--tema-padrao");
////console.log('tema cor',temaPadrao)
const initialColors = {
    bg: getStyle(html, "--bg"),
    bgPanel: getStyle(html, "--bg-panel"),
    bgContainer: getStyle(html, "--bg-container"),
    secundatyColor: getStyle(html, "--secundary-color"),
    colorHeadings: getStyle(html, "--color-headings"),  
    colorText: getStyle(html, "--color-text"),
    colorTitle: getStyle(html, "--color-title"),
    monocromaticColor: getStyle(html, "--monocromatic-color"),
    ligado: 0
}
const darkColors = {
    bg: "#333333",
    bgPanel: "#434343",
    bgContainer: "#292929",
    secundatyColor: "#222222",
    colorHeadings: "#3664FF",
    colorText: "#e2e2e2",
    colorTitle: "#e2e2e2",
    monocromaticColor: "#dddddd",
    ligado: 1
}
const transformKey  = key =>
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) =>{
     Object.keys(colors).map(key =>{
         html.style.setProperty(transformKey(key), colors[key])    
            })
    const temaAtual = {
        bg: getStyle(html, "--bg"),
        bgPanel: getStyle(html, "--bg-panel"),
        bgContainer: getStyle(html, "--bg-container"),
        secundatyColor: getStyle(html, "--secundary-color"),
        colorHeadings: getStyle(html, "--color-headings"),
        colorText: getStyle(html, "--color-text"),
        colorTitle: getStyle(html, "--color-title"),
        monocromaticColor: getStyle(html, "--monocromatic-color"),
        ligado: colors.ligado

     }
     if(colors.ligado == 1){
        $('#myToggle').prop('checked', true);

     }else{
        //console.log('teste', colors.ligado)
     }
     //console.log(colors.ligado)
    localStorage.setItem("theme", JSON.stringify(temaAtual));
}

checkbox.addEventListener("change", ({target})=>{
    target.checked ? changeColors(darkColors) : changeColors(initialColors)
}) 
tema.addEventListener('change', (event) => {
    html.style.setProperty("--tema-padrao", tema.value) 
    //console.log(tema.value)
    const temaAtual1 = { temaPadrao: getStyle(html, "--tema-padrao") }
    localStorage.setItem("theme1", JSON.stringify(temaAtual1))
    //console.log("passou aqui");
});

 if (localStorage.getItem('theme')) {
    
    const temaCarregado = localStorage.getItem('theme');
    const tema1Carregado = localStorage.getItem('theme1')
    const temaa = JSON.parse(temaCarregado)
    changeColors(temaa);
    const tema1 = JSON.parse(tema1Carregado);
    html.style.setProperty("--tema-padrao", tema1.temaPadrao)
    tema.value = tema1.temaPadrao
    //console.log('TEMA ATUAL : ', tema1.temaPadrao);

 }else{
    if(getStyle(html, "--bg") != "#333333"){
        //console.log('teste')
    }
     const TemaAtual = {
        bg: getStyle(html, "--bg"),
        bgPanel: getStyle(html, "--bg-panel"),
        bgContainer: getStyle(html, "--bg-container"),
        secundatyColor: getStyle(html, "--secundary-color"),
        colorHeadings: getStyle(html, "--color-headings"),
        colorText: getStyle(html, "--color-text"),
        colorTitle: getStyle(html, "--color-title"),
        monocromaticColor: getStyle(html, "--monocromatic-color"),
        ligado: 1
        // temaPadrao: getStyle(html, "--tema-padrao")
     }
     localStorage.setItem('theme', JSON.stringify(TemaAtual));
     const temaAtual1 = { temaPadrao: getStyle(html, "--tema-padrao") }
     localStorage.setItem("theme1", JSON.stringify(temaAtual1))
 }