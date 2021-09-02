/* data from 
    
    https://sistemas.anac.gov.br/dadosabertos/Aeronaves/RAB/dados_aeronaves.json 

*/

$(document).ready(function(){
    $("#registration_suffix").focus()

    $(".load").hide()

    fetch("data/dados.json")
    .then(response => response.json())
    .then(function(data) {

        const result = data.filter(function(item){
            return item.NMFABRICANTE !== null && item.CDCATEGORIA !== "PET" && item.CDCATEGORIA !== "PEX" && item.CDCATEGORIA !== "R01" && item.CDCATEGORIA !== "EX2"
        })

        $('#fabricante').html(`<option value="">Selecione o fabricante</option>`)

        const unique_fabricantes = {}

        result.forEach(element => { unique_fabricantes[element.NMFABRICANTE] = element.NMFABRICANTE });

        var fabricantes = Object.keys(unique_fabricantes)
        fabricantes.sort()

        fabricantes.forEach(element =>{

            let html = `<option value="${element}">${element.substring(0,30)}</option>`
            $('#fabricante').append(html)

        })
        
    });

})


$('#registration_suffix').on('change paste keyup', function(){

    if (document.getElementById("registration_suffix").value.length == 3) {

        fetch("data/dados.json")
            .then(response => response.json())
            .then(function(data) {
        
                const result = data.filter(haveRegistration)
        
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

$("#try_button").on("click",function(){

    $(".load").show()
    $('.result').html("")

    let letter_1 = $("#registration_letter_1").val()?$("#registration_letter_1").val():"*"
    let letter_2 = $("#registration_letter_2").val()?$("#registration_letter_2").val():"*"
    let letter_3 = $("#registration_letter_3").val()?$("#registration_letter_3").val():"*"
    let letter_4 = $("#registration_letter_4").val()?$("#registration_letter_4").val():"*"
    let letter_5 = $("#registration_letter_5").val()?$("#registration_letter_5").val():"*"

    let masked_mark = letter_1 + letter_2 + letter_3 + letter_4 + letter_5
    let number_empty_letter = masked_mark.split("*").length - 1;

    fetch("data/dados.json")
            .then(response => response.json())
            .then(function(data) {
    
                $('.result').html("")
        
                const list_distances = []
                let result = data

                // Filtering by NMFABRICANTE
                if (document.getElementById("fabricante").value){

                    result = data.filter(function(item){
                        return item.NMFABRICANTE == document.getElementById("fabricante").value
                    })
                }


                result.forEach(element => {

                    list_distances.push({
                        "matricula":    element.MARCA, 
                        "distance":     hammingDistance(masked_mark,element.MARCA), 
                        "categoria":    element.CDCATEGORIA,
                        "modelo":       element.DSMODELO?element.DSMODELO:"-",
                        "operador":     element.NMOPERADOR?element.NMOPERADOR:"-",
                        "ano":          element.NRANOFABRICACAO?element.NRANOFABRICACAO:"-",
                        "fabricante":   element.NMFABRICANTE?element.NMFABRICANTE:"-"
                    })

                    list_distances.sort(function(a,b){
                        return a.distance - b.distance
                    })


                    
                });
                                
                let best_distance = list_distances[0].distance

                let list_to_print = list_distances.filter(function(element) {
                    return element.distance == best_distance
                })
                                
                $(".load").hide()

                if(list_to_print[0].distance <= number_empty_letter){

                    list_to_print.forEach(element => {
        
                        let marca_para_jp = element.matricula.substring(0,2)+"-"+element.matricula.substring(2,5)
            
                        let html = `<div class="box"> \
                                    <h1>${marca_para_jp}</h1> \
                                    <div class="links">
                                    <a href="https://sistemas.anac.gov.br/aeronaves/cons_rab_resposta.asp?textMarca=${element.MARCA}" target="_blank">RAB</a> \
                                    <a href="https://www.jetphotos.com/photo/keyword/${marca_para_jp}" target="_blank">JP</a> </div> \
                                    <span>${element.modelo}</span> (${element.ano}) <br/>\
                                    ${element.fabricante} <br/>\  
                                    ${element.operador} 
                                    </div>`
                        
                        $('.result').append(html)
                    })
                } else {
                    $('.result').append("<p>Não foi encontrada matrícula com as letras informadas</p>")
                }

            });
})

const hammingDistance = (str1 = '', str2 = '') => {
    if (str1.length !== str2.length) {
        return
    }
    
    let dist = 0;
    
    for (let i = 0; i < str1.length; i += 1) {
        if (str1[i] !== str2[i]) {
            dist += 1;
        };
    };
    
    return dist;
};




$('.guest_box').hide();
$('#lock').on('click',
    function() {
        
        $('.guest_box, .check_box').toggle(100);
        
    }
);

$('input.mobile-verify.pass').on('keyup', function() {
    if ($(this).val()) {
        $(this).next().focus();
    }
});