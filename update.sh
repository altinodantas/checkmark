#!/bin/bash  

wget -O /users/altino/Sites/checkmarks/data/dados.json  "https://sistemas.anac.gov.br/dadosabertos/Aeronaves/RAB/dados_aeronaves.json"

git add /users/altino/Sites/checkmarks/data/dados.json  
git commit -m "update data"
git push origin main