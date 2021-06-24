// console.log('OK');

var map = L.map('worldmap').setView([48.866667, 2.333333], 4);

var myIcon = L.icon({
    iconUrl: '../images/leaf-green.png',
    iconSize: [20, 40],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0],
    shadowUrl: '../images/leaf-shadow.png',
    shadowSize: [20, 40],
    shadowAnchor: [0, 0]
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

[...document.getElementsByTagName('li')].forEach(elem => {
    L.marker([elem.dataset.lat, elem.dataset.lon], {icon: myIcon}).addTo(map)
    .bindPopup(elem.dataset.name)
});