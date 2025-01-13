export const processManufacturerData = (data) => {
  const result = {};
  data.forEach((item) => {
    const make = item.Make;
    if (make) {
      result[make] = (result[make] || 0) + 1;
    }
  });
  return result;
};

export const processRangeData = (data) => {
  const result = {};
  data.forEach((item) => {
    const range = item['Electric Range'];
    if (range) {
      const rangeGroup = `${Math.floor(range / 50) * 50}-${Math.ceil(range / 50) * 50}`;
      result[rangeGroup] = (result[rangeGroup] || 0) + 1;
    }
  });
  return result;
};

export const processYearData = (data) => {
  const result = {};
  data.forEach((item) => {
    const year = item['Model Year'];
    if (year) {
      result[year] = (result[year] || 0) + 1;
    }
  });
  return result;
};


export const processVehicleTypeData = (data) => {
  const vehicleTypeCounts = {};

  data.forEach((item) => {
    const type = item['Vehicle Type'];
    if (type) {
      vehicleTypeCounts[type] = (vehicleTypeCounts[type] || 0) + 1;
    }
  });

  return vehicleTypeCounts;
};
