#!/usr/bin/env python3
import sys
import json
import requests
import random
import datetime
CarParks = {
    'Level1':{
        'capacity':50,
        'percentage':70,
    },
    'Level2':{
        'capacity':30,
        'percentage':110,
    },
    'Level3':{
        'capacity':40,
        'percentage':50,
    },
}
Tenants = ['Tenant 1','Tenant 2','Tenant 3']

def iso(d):
    return d.isoformat()[:-7] + 'Z'
def addMinutes(d,n):
    return d + datetime.timedelta(minutes=30)
def generateVehicle(digits=6):
    v = ''
    for i in range(digits):
        v += chr(random.randint(ord('A'),ord('Z')))
    return v

def updateMasterData(url,apiKey):
    headers = {
        'Content-Type':'application/json',
        'Authorization':'APIKEY ' + apiKey,
    }
    data = {
        'carparks':[{'name':k,'capacity':v['capacity']} for k,v in CarParks.items()]
    }

    r = requests.post(url  + '/Lucy/CarPark/carparks',headers=headers,data=json.dumps(data))
    r.raise_for_status()
    print (r.text)
def populateOccupancy(url,apiKey):
    data = []
    for cp,details in CarParks.items():
        cd = {'name':cp,'occupants':[]}
        capacity = details['capacity']
        spotsToFill = int(details['percentage']*capacity/100.0)
        dt = addMinutes(datetime.datetime.now(),-60*10)
        for i in range(spotsToFill):
            tenant = random.choice(Tenants)
            vehicle = generateVehicle()
            time = addMinutes(dt,15)
            cd['occupants'].append({'tenant':tenant,'vehicle':vehicle,'arrived':iso(time)})
        data.append(cd)
    headers = {
        'Content-Type':'application/json',
        'Authorization':'APIKEY ' + apiKey,
    }
    occupantData = {
        'carparks':data
    }

    r = requests.post(url  + '/Lucy/CarPark/carparks/occupancy',headers=headers,data=json.dumps(occupantData))
    r.raise_for_status()
    print (r.text)


def main():
    url = sys.argv[1]
    apiKey = sys.argv[2]
    updateMasterData(url,apiKey)
    populateOccupancy(url,apiKey)


main()