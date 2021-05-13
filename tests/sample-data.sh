#!/bin/sh
APIKEY="$2"
URL="$1"
curl  -X POST $URL/Lucy/CarPark/carparks  -H "Authorization: APIKEY $APIKEY" -H "Content-Type: application/json"  --data "{ \"carparks\": [{\"name\":\"Level1\",\"capacity\":\"20\"},{\"name\":\"Level2\",\"capacity\":\"15\"},{\"name\":\"Level3\",\"capacity\":\"15\"}] }"
occ1=$((150 + $RANDOM % 50))
occ2=$((100 + $RANDOM % 70))
occ3=$((100 + $RANDOM % 70))
# curl -X POST $URL/Lucy/CarPark/carparks/occupancy  -H "Authorization: APIKEY $APIKEY" -H "Content-Type: application/json" --data "{ \"carparks\": [{\"name\":\"Level1\",\"occupancy\":\"$occ1\"},{\"name\":\"Level2\",\"occupancy\":\"$occ2\"},{\"name\":\"Level3\",\"occupancy\":\"$occ3\"},] }"

