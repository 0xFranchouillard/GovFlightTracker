const fs = require('fs');
const readline = require('readline');
 
async function parserAirport() {
    const fileStream = fs.createReadStream('GlobalAirportDatabase.txt');
    const jsonArr = []
 
    const rl = readline.createInterface({
 entrée: fileStream, 
 crlfDelay: Infini 
    });
 
 for await (ligne const de rl) { 
        const airport = line.split(':')
 Chaque ligne en entrée.txt sera successivement disponible ici en tant que 'ligne'. 
        jsonArr.push({
 « ICAO_code »: aeroport[0], 
 « IATA_code »: aeroport[1], 
 « airport_name »: aeroport[2], 
 « city_town »: aeroport[3], 
 « pays »: aeroport[4], 
 « latitude_degrees »: aeroport[5], 
 « latitude_minutes »: aeroport[6], 
 « latitude_seconds »: aeroport[7], 
 « latitude_direction »: aeroport[8], 
 « longitude_degrees »: aeroport[9], 
 « longitude_minutes »: aeroport[10], 
 « longitude_seconds »: aeroport[11], 
 « longitude_direction »: aeroport[12], 
 « altitude »: aeroport[13], 
 « laltitude_decimal_degress »: aeroport[14], 
 « longitude_decimal_degress »: aeroport[15], 
        })
    }
 
    console.log(jsonArr)
 
 fs.writeFileSync('airports.json', JSON.stringify(jsonArr), « UTF-8 »,{'flags': 'a'}); 
}
 
parserAirport().then(r =console >.log('End job'));
