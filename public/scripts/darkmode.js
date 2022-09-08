const html = document.querySelector("html");
const checkbox = document.querySelector("input[name=theme");

const getStyle = (element, style) =>{
    window
    .getComputedStyle(element)
    .getComputedStyle(style)    
}
const initialColors = {
    bg: getStyle(html, "--bg"),
    bgPanel: getStyle(html, "--bg-panel"),
    colorHeadings: getStyle(html, "--color-headings"),
    colorText: getStyle(html, "--color-text")
}


const transformKey  = key =>
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) =>{
    Object.keys(colors).map(key =>{
        html.style.setProperty(transformKey(key), colors[key])    
    })
}