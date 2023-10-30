const calButton = document.getElementById('btn');

calButton.addEventListener("click", function(event){
    event.preventDefault();
    const startCord = document.getElementById('start').value;
    const stopCord = document.getElementById('stop').value;
    const result = document.getElementById('result');

   result.textContent = haversineDistance(startCord, stopCord);
   

});



function haversineDistance(cord1, cord2) {
    const radius = 6371; // Radius of the Earth in kilometers;
    const [lat1, lon1] = cord1.split(/[, ]/);
    const [lat2, lon2] = cord2.split(/[, ]/);


    //Convert latitude and longitude from degrees to radians
    const radLat1 = (Math.PI * lat1) / 180;
    const radLon1 = (Math.PI * lon1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const radLon2 = (Math.PI * lon2) / 180;

    // Haversine formula
    const dLat = radLat2 - radLat1;
    const dLon = radLon2 - radLon1;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(radLat1) * Math.cos(radLat2) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance
    const distance = radius * c;

    return distance
}


// function calculateDistances(singleCoordinate, coordinatesArray) {
//     const distances = [];

//     for (const coord of coordinatesArray) {
//         const distance = haversineDistance(singleCoordinate.lat, singleCoordinate.lon, coord.lat, coord.lon);
//         distances.push(distance);
//     }

//     return distances;
// }






