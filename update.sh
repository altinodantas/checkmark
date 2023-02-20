#!/bin/bash  

wget -O /users/altino/Sites/checkmarks/data/dados.json  "https://sistemas.anac.gov.br/dadosabertos/Aeronaves/RAB/dados_aeronaves.json"

var=`date +"%FORMAT_STRING"`
now=`date +"%m_%d_%Y"`
now=`date +"%d de %B de %Y"`
echo "${now}" > update_date.txt

git add /users/altino/Sites/checkmarks/data/dados.json  
git add /users/altino/Sites/checkmarks/data/update_date.txt  
git commit -m "update data"
git push origin main