const fogoPixelArray = []
const fogoLargura = 10
const fogoAltura = 10

function start() {
    criaEstruturaFogo()    
    renderizaFogo();
}

function criaEstruturaFogo() {
    const nPixels = fogoLargura * fogoAltura
    
    for(let i = 0; i < nPixels; i++) {
        fogoPixelArray[i] = 0
    }

}

function calculaPropagacaoFogo() {

}

function renderizaFogo() {
    let html = '<table cellpadding=0 cellspacing=0>'

    for(let row = 0; row < fogoAltura; row++) {
        html += '<tr>'

        for(let col = 0; col < fogoLargura; col++) {
            const pixelIndex = col + (fogoLargura * row)
            html += '<td>'
            html += pixelIndex
            html += '</td>'
        }
        html += '</tr>'
    }
    html += '</table>'

    document.querySelector('#fogoCanvas').innerHTML = html
    // document.getElementById('fogoCanvar').innetHTML = 'oi'
}

start()