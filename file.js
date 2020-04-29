const fogoPixelArray = []
const fogoLargura = 10
const fogoAltura = 10

function start() {
    criaEstruturaFogo()    
    createFireSource()
    renderizaFogo()
    setInterval(calculaPropagacaoFogo, 1000)
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
    const decay = 1
    const belowPixelFireIntensity = fogoPixelArray[belowPixelIndex]
    const newFireIntensity = belowPixelFireIntensity - decay

    fogoPixelArray[currentPixelIndex] = newFireIntensity
}

function renderizaFogo() {
    let html = '<table cellpadding=0 cellspacing=0>'

    for(let row = 0; row < fogoAltura; row++) {
        html += '<tr>'

        for(let col = 0; col < fogoLargura; col++) {
            const pixelIndex = col + (fogoLargura * row)
            const fireIntensity = fogoPixelArray[pixelIndex]

            html += '<td>'
            html += `<div class="pixel-index">${pixelIndex}</div>`
            html += fireIntensity
            html += '</td>'
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