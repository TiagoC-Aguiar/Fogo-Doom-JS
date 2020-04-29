const fogoPixelArray = []
const fogoLargura = 42
const fogoAltura = 42
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

function start() {
    criaEstruturaFogo()    
    createFireSource()
    renderizaFogo()
    setInterval(calculaPropagacaoFogo, 50)
}

function criaEstruturaFogo() {
    const nPixels = fogoLargura * fogoAltura
    
    for(let i = 0; i < nPixels; i++) {
        fogoPixelArray[i] = 0
    }

}

function calculaPropagacaoFogo() {
    let pixelIndex = 0
    for(let column=0;column<fogoLargura;column++) {
        for(let row=0;row<fogoAltura;row++) {
            pixelIndex = column + (fogoLargura * row)

            updateFireIntensityPerPixel(pixelIndex)
        }
    }

    renderizaFogo()
}

function updateFireIntensityPerPixel(currentPixelIndex) {
    const belowPixelIndex = currentPixelIndex + fogoLargura
    if(belowPixelIndex >= fogoLargura * fogoAltura) {
        return
    }
    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = fogoPixelArray[belowPixelIndex]
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

    fogoPixelArray[currentPixelIndex] = newFireIntensity
}

function renderizaFogo() {
    debug = false
    let html = '<table cellpadding=0 cellspacing=0>'
    let pixelIndex = 0
    let fireIntensity = 0
    let color = fireColorsPalette[fireIntensity]
    let colorString = ''

    for(let row = 0; row < fogoAltura; row++) {
        html += '<tr>'

        for(let col = 0; col < fogoLargura; col++) {
            pixelIndex = col + (fogoLargura * row)
            fireIntensity = fogoPixelArray[pixelIndex]

            if(debug === true) {
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>'

            } else {
                color = fireColorsPalette[fireIntensity]
                colorString = `${color.r},${color.g},${color.b}`
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }
            
        }
        html += '</tr>'
    }
    html += '</table>'

    document.querySelector('#fogoCanvas').innerHTML = html
    // document.getElementById('fogoCanvar').innetHTML = 'oi'
}

function createFireSource() {
    const overflowPixelIndex = fogoLargura * fogoAltura
    let pixelIndex = 0
    for(let column=0;column <= fogoLargura; column++) {
        pixelIndex = (overflowPixelIndex - fogoLargura) + column
        fogoPixelArray[pixelIndex] = 36
    }
}


start() 