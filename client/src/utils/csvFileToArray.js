export const csvFileToArray = string => {
  let insertData = [[], [], [], [], [], [], [], [], []];

  const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
  const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

  const array = csvRows.map(i => {
    const values = i.split(",");

    values.forEach((e, idx) => {
      if (idx < 9) {
        insertData[idx].push(e);
      }
    });

    const obj = csvHeader.reduce((object, header, index) => {
      object[header] = values[index];
      return object;
    }, {});
    return obj;
  });

  return [array, insertData];
};
