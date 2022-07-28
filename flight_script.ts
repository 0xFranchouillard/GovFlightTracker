const fs = require('fs');
const readline = require('readline');
Const aeroports = require(« ./airports »);
 
fonction asynchrone asyncFilter(awardCodes, OACI) {
    const responses = attendre la promesse. tout(
 awardCodes. map(code = code >)
    );
 
    retourner les codes de récompense. filter((_, i) => responses[i]. ICAO_code === OACI);
}
 
fonction asynchrone processLineByLine() {
    const fileStream = fs. createReadStream('vols.txt');
    const json = []
 
    const rl = ligne de lecture. createInterface({
 entrée: fileStream, crlfDelay: Infinity
    });
 
    icao24,firstseen,lastseen,duration,callsign,departure,destination
    pour await (ligne const de rl) {
        const tab = ligne. split(',')
 consoler. log('ici=', tab[5], tab[6])
        const findAirportByDepart = await asyncFilter(aeroports, onglet[5])
        const findAirportByDestination = await asyncFilter(aeroports, onglet[6])
 
        if (findAirportByDepart. longueur === 1 && findAirportByDestination. longueur === 1) {
 json. pousser({
                « icao24 »: tab[0],
                « firstseen »: tab[1],
                « lastseen »: tab[2],
                « durée »: onglet[3],
                « indicatif d’appel »: tab[4],
                « départ »: findAirportByDepart,
                « destination »: findAirportByDestination
            })
        }
        console.log('Ligne du fichier : ${line}');
    }
 consoler. log(« Nb vols = », json. longueur)
 Fs. writeFile('flights.ts', JSON. stringify(json), 'utf8', (err) => console. log(err))
}
 
processLineByLine();
