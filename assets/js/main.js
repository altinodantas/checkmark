/* data from 
    
    https://sistemas.anac.gov.br/dadosabertos/Aeronaves/RAB/dados_aeronaves.json 

*/

$(document).ready(function(){
    $("#registration_suffix").focus()
})


$('#registration_suffix').on('change paste keyup', function(){

    if (document.getElementById("registration_suffix").value.length == 3) {

        fetch("data/dados.json")
            .then(response => response.json())
            .then(function(data) {
        
                const result = data.filter(haveRegistration)
        
                console.log(result)   
    
                $('.result').html("")
        
                result.forEach(element => {

                    let modelo      = element.DSMODELO?element.DSMODELO:"-"
                    let ano         = element.NRANOFABRICACAO?element.NRANOFABRICACAO:"-"
                    let fabricante  = element.NMFABRICANTE?element.NMFABRICANTE:"-"
                    let operador    = element.NMOPERADOR?element.NMOPERADOR:"-"

                    let marca_para_jp = element.MARCA.substring(0,2)+"-"+element.MARCA.substring(2,5)
        
                    let html = `<div class="box"> \
                                <h1>${marca_para_jp}</h1> \
                                <div class="links">
                                <a href="https://sistemas.anac.gov.br/aeronaves/cons_rab_resposta.asp?textMarca=${element.MARCA}" target="_blank">RAB</a> \
                                <a href="https://www.jetphotos.com/photo/keyword/${marca_para_jp}" target="_blank">JP</a> </div> \
                                <span>${modelo}</span> (${ano}) <br/>\
                                ${fabricante} <br/>\  
                                ${operador} 
                                </div>`
                    
                    $('.result').append(html)
            
                });
            });

            $(document.activeElement).filter(':input:focus').blur();

    } else{

        $('.result').html("<p>Informe uma matrícula sem o prefixo (Ex.: PJN)</p>")

    }

})

function haveRegistration(item){
    let marca = item.MARCA.substring(2,5)
    return document.getElementById("registration_suffix").value  == marca
}