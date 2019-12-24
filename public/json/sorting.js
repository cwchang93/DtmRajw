// import data from './activityDtm.json'
const data = require("./fullDtm.json");
const vLine = data.vLine;

const lineKeyArr = Object.keys(vLine);
const lineValueArr = Object.values(vLine);

const obj = {};
obj.line = [];

// vLine
for (let i = 0; i < lineKeyArr.length; i++) {
  obj.line.push({
    text: lineValueArr[i],
    order: lineKeyArr[i]
  });
}

// vCountry
const vCountry = data.vCountry;
const continentKeyArr = Object.keys(vCountry); // ["_1", "_2", ...]
const continentObjArr = Object.values(vCountry);
console.log("continentObjArr[0]", continentObjArr[0]);
/*  
continentObjArr
[{
    "_US_1": "美國",
    "_AR_1": "阿根廷"
},
 {
    "_AU_2": "澳大利亞",
    "_CA_2": "加拿大",
    "_NZ_2": "紐西蘭"
}]
*/

obj.country = [];
const vCity = data.vCity;
// const cityKeyArr = Object.keys(vCity);
// const cityValueArr = Object.values(vCity);

for (let i = 0; i < continentKeyArr.length; i++) {
  //   const countryContentArr = Object.values();
  const countryKeyArr = Object.keys(continentObjArr[i]);
  /** countryKeyArr
   * ["_US_1", "_AR_1"]
   */
  const countryValueArr = Object.values(continentObjArr[i]);
  /** countryValueArr
   *  [ "美國", "阿根廷"]
   */
  for (let j = 0; j < countryKeyArr.length; j++) {
    obj.country.push({
      order: continentKeyArr[i],
      text: countryValueArr[j],
      content: []
    });

    const cityKeyArr = Object.keys(vCity[countryKeyArr[j]]);
    /**
     * ["_", "_LAX_US", "SFO_US", ...]
     */
    const cityValueArr = Object.values(vCity[countryKeyArr[j]]);
    /**
     * ["不限", "洛杉磯-加州", "舊金山-加州", ...]
     */
    for (let k = 0; k < cityKeyArr.length; k++) {
      obj.country[i].content.push({
        text: cityValueArr[k],
        value: cityKeyArr[k]
      });
    }
  }
}

console.log("obj", obj);

console.log(obj.country[0].content);

// const sortData = (data: any) => {
//   const vLine = data.vLine;
//   const lineKeyArr = Object.keys(vLine);
//   const lineValueArr = Object.values(vLine);
//   const obj: any = { line: [], country: [] };
//   // vLine
//   for (let i = 0; i < lineKeyArr.length; i++) {
//     obj.line.push({
//       text: lineValueArr[i],
//       order: lineKeyArr[i]
//     });
//   }
//   // vCountry
//   const vCountry = data.vCountry;
//   const continentKeyArr = Object.keys(vCountry); // ["_1", "_2", ...]
//   const continentObjArr: {}[] = Object.values(vCountry);
//   // console.log("continentKeyArr", continentKeyArr);
//   // console.log("continentObjArr", continentObjArr);

//   // console.log("continentObjArr[0]", continentObjArr[0]);
//   /*
// continentObjArr
// [{
//  _US_1: "美國"
// _   CA_1: "加拿大"
// },
// {
//   _AU_2: "澳大利亞"
// _    NZ_2: "紐西蘭"
// _    AW_2: "阿魯巴"
// }]
// */
//   const vCity = data.vCity;
//   // const cityKeyArr = Object.keys(vCity);
//   // const cityValueArr = Object.values(vCity);

//   // console.log(vCity);
//   for (let i = 0; i < continentObjArr.length; i++) {
//     //   const countryContentArr = Object.values();
//     // console.log("123", continentObjArr[i]);
//     const countryKeyArr = Object.keys(continentObjArr[i]);

//     /** countryKeyArr
//      * ["_US_1", "_AR_1"]
//      */
//     const countryValueArr = Object.values(continentObjArr[i]);
//     /** countryValueArr
//      *  [ "美國", "阿根廷"]
//      */
//     for (let j = 0; j < countryKeyArr.length; j++) {
//       // console.log(i, "continentKeyArr[i]", continentKeyArr[i]);
//       // console.log(j, "countryValueArr[j]", countryValueArr[j]);
//       obj.country.push({
//         order: continentKeyArr[i],
//         text: countryValueArr[j],
//         content: []
//       });

//       const cityKeyArr = Object.keys(vCity[countryKeyArr[j]]);
//       console.log("cityKeyArr", cityKeyArr);
//       /**
//        * ["_", "_LAX_US", "SFO_US", ...]
//        */
//       const cityValueArr = Object.values(vCity[countryKeyArr[j]]);
//       console.log("cityValueArr", cityValueArr);
//       /**
//        * ["不限", "洛杉磯-加州", "舊金山-加州", ...]
//        */

//       console.log("obj.country[j]", obj.country[j]);
//       // for (let k = 0; k < cityKeyArr.length; k++) {
//       //   // console.log(k, "cityValueArr[k]", cityValueArr[k]);
//       //   // console.log(k, "cityKeyArr[k]", cityKeyArr[k]);
//       //   obj.country[j].content.push({
//       //     text: cityValueArr[k],
//       //     value: cityKeyArr[k]
//       //   });
//       // }
//     }
//   }
//   console.log("obj", obj);
//   return { Dtm: obj };
// };
