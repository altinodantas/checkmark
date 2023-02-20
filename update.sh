#!/bin/bash

wget -O /users/altino/Sites/checkmarks/data/temp_dados.json  "https://sistemas.anac.gov.br/dadosabertos/Aeronaves/RAB/dados_aeronaves.json"

if [ -s /users/altino/Sites/checkmarks/data/temp_dados.json ]
then
    var=`date +"%FORMAT_STRING"`
    now=`date +"%m_%d_%Y"`
    now=`date +"%d de %B de %Y"`
    echo "${now}" > update_date.txt
    
    rm /users/altino/Sites/checkmarks/data/dados.json
    mv /users/altino/Sites/checkmarks/data/temp_dados.json /users/altino/Sites/checkmarks/data/dados.json

    git add /users/altino/Sites/checkmarks/data/dados.json
    git add /users/altino/Sites/checkmarks/update_date.txt

    git commit -m "update data"
    git push origin main
    
else
    echo "Problema ao baixar arquivo JSON do RAB. Nada foi alterado na base de dados."
fi
