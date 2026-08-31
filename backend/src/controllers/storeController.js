const STORES = require("../data/stores");


function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}


function getNearbyStores(req, res) {
  const lat = parseFloat(req.query.lat) || 26.6,
    lng = parseFloat(req.query.lng) || 74.86;

  const withDistance = STORES.map((s) => ({
    ...s,
    distanceKm: Number(distanceKm(lat, lng, s.lat, s.lng).toFixed(1)),
  })).sort((a, b) => a.distanceKm - b.distanceKm);

  res.json({ stores: withDistance });
}

module.exports = { getNearbyStores };
