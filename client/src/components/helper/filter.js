import BikeData from "../../bikes.json";

function styleFilter(filter) {
  if (!filter) {
    return BikeData;
  } else {
    return BikeData.filter((bike) => bike.style === filter);
  }
}

function speedFilter(filter) {
  if (!filter) {
    return BikeData;
  } else {
    return BikeData.filter((bike) => bike.speed === filter);
  }
}

function priceFilter(filter) {
  if (!filter) {
    return BikeData;
  }
}

export { styleFilter, speedFilter, priceFilter };
