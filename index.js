const calButton = document.getElementById('btn');

calButton.addEventListener("click", function(event) {
  event.preventDefault();
  const startCord = document.getElementById('start').value;
  const excelFile = document.getElementById('excelFile').files[0];

  const reader = new FileReader();

  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const records = XLSX.utils.sheet_to_json(worksheet);

    // Include the column names
    const columnNames = Object.keys(records[0]);
    const header = columnNames.join(',') + ',PATHLENGTH\n';

    for (const record of records) {
      const latitude = record['Latitude'];
      const longitude = record['Longitude'];

      if (latitude !== undefined && longitude !== undefined) {
        const coordinates = `${latitude}, ${longitude}`;
        const distance = haversineDistance(startCord, coordinates);
        record.PATHLENGTH = distance;
      }
    }
    // Convert the data to CSV format
    const csv = convertArrayOfObjectsToCSV([columnNames, ...records], ['DISTANCE', 'PATHLENGTH']);

    // Trigger the download using FileSaver.js
    const blob = new Blob([header + csv], { type: 'text/csv' });
    saveAs(blob, 'modified_data.csv');
  };

  reader.readAsArrayBuffer(excelFile);
});

function convertArrayOfObjectsToCSV(data, columnNames) {
  let str = '';

  for (let i = 0; i < data.length; i++) {
    let line = '';
    for (let index in data[i]) {
      if (line != '') line += ',';
      line += data[i][index];
    }
    str += line + '\r\n';
  }

  return str;

};



function haversineDistance(cord1, cord2) {
  const radius = 6371; // Radius of the Earth in kilometers;
  const [lat1, lon1] = cord1.split(/[, \s]+/);
  const [lat2, lon2] = cord2.split(/[, \s]+/);


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

  return distance.toFixed(2);
};

// Pop up welcome Message
document.addEventListener('DOMContentLoaded', function() {
  
    const welcomePopup = document.getElementById('welcome-popup');

    // Display the popup when the page loads
    welcomePopup.style.display = 'block';

    // Close the popup when the close button is clicked
    window.addEventListener('click', function() {
      
      welcomePopup.style.display = 'none';
      },);
    });
  




