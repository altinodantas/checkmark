$('#registration_sufix').on('change paste keyup', function(){

    if (document.getElementById("registration_sufix").value.length == 3) {

        fetch("dados.json")
            .then(response => response.json())
            .then(function(data) {
        
                const result = data.filter(haveRegistration)
        
                console.log(result)   
    
                $('.result').html("")
        
                result.forEach(element => {

                    let modelo      = element.DSMODELO?element.DSMODELO:"-"
                    let ano  = element.NRANOFABRICACAO?element.NRANOFABRICACAO:"-"
                    let fabricante  = element.NMFABRICANTE?element.NMFABRICANTE:"-"
                    let operador  = element.NMOPERADOR?element.NMOPERADOR:"-"
        
                    let html = `<div class="box"> \
                                <h1>${element.MARCA}</h1> \
                                <span>${modelo}</span> (${ano}) <br/>\
                                ${fabricante} <br/>\  
                                ${operador} 
                                </div>`
                    
                    $('.result').append(html)
            
                });
            });
    }

})




function haveRegistration(item){
    let marca = item.MARCA.substring(2,5)
    return document.getElementById("registration_sufix").value  == marca
}