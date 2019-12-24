import * as React from "react";
import DtmRajw from "./dtm_rajw";

interface I_Pre_Props {
  data: {
    Dtm: any;
  };
}

const Preview: React.FC<I_Pre_Props> = props => {
  const [showDtm, setShowDtm] = React.useState(false);
  const [inputText, setInputText] = React.useState("");

  // console.log("dt", props.data);

  // console.log("inputTextParent", inputText);

  const onInputChange = (inputValue: string) => {
    setInputText(inputValue);
    // console.log("inputValue", inputValue);
    // setShowDtm(false);
  };

  const wrapperRef = React.useRef(null);
  const ClickOutside = (ref: any, callback: any) => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    React.useEffect(() => {
      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [handleClickOutside]);
  };

  ClickOutside(wrapperRef, () => setShowDtm(false));

  const handleChildData = (data: { text: "洛杉磯"; value: "LAX" }) => {
    setInputText(data.text);
  };

  const sortData = (data: any) => {
    const vLine = data.vLine;
    const lineKeyArr = Object.keys(vLine);
    const lineValueArr = Object.values(vLine);
    const obj: any = { line: [], country: [] };
    for (let i = 0; i < lineKeyArr.length; i++) {
      obj.line.push({
        text: lineValueArr[i],
        order: lineKeyArr[i]
      });
    }
    // vCountry
    const vCountry = data.vCountry;
    const continentKeyArr = Object.keys(vCountry); // ["_1", "_2", ...]
    const continentObjArr: {}[] = Object.values(vCountry);
    const vCity = data.vCity;

    for (let i = 0; i < continentObjArr.length; i++) {
      const countryKeyArr = Object.keys(continentObjArr[i]);
      const countryValueArr = Object.values(continentObjArr[i]);
      for (let j = 0; j < countryKeyArr.length; j++) {
        const content = [];
        const cityKeyArr = Object.keys(vCity[countryKeyArr[j]]);
        const cityValueArr = Object.values(vCity[countryKeyArr[j]]);
        for (let k = 0; k < cityKeyArr.length; k++) {
          if (cityKeyArr[k] !== "_") {
            content.push({
              value: cityKeyArr[k],
              text: cityValueArr[k]
            });
          }
        }
        obj.country.push({
          order: continentKeyArr[i],
          text: countryValueArr[j],
          content: content
        });
      }
    }
    console.log("obj", obj);
    return { Dtm: obj };
  };

  // const sortData = (data: any) => {
  //   const continentKeyArr = Object.keys(data.vLine); /** ["_6", "_5", ...] */
  //   const continentValueArr = Object.values(
  //     data.vLine
  //   ); /** ["東北亞", "大陸港澳"] */
  //   /* [{ "_US_1": "美國",
  //   "_CA_1": "加拿大",
  //   "_PR_1": "波多黎各",}]
  //   */

  //   const obj: any = { line: [], country: {} };
  //   for (let i = 0; i < continentKeyArr.length; i++) {
  //     obj.line.push({
  //       text: continentValueArr[i],
  //       value: continentKeyArr[i]
  //     });
  //     const countryKeyArr: {}[] = Object.keys(data.vCountry); // ["_1", "_2", "_3", ...]
  //     const countryObjArr: {}[] = Object.values(data.vCountry);
  //     for (let j = 0; j < Object.keys(countryObjArr[i]).length; j++) {
  //       const cityKeyArr = data.vCity;

  //     }
  //   }

  //   // [{"_US_1": "美國","_CA_1": "加拿大"} , {} ... ]

  //   for (let i = 0; i < countryKeyArr.length; i++) {
  //     obj.country.push({
  //       order: continentKeyArr[i],
  //       text: countryValueArr[i],
  //       content: []
  //     });
  //   }

  //   return { Dtm: obj };
  // };

  return (
    <>
      <div ref={wrapperRef}>
        <input
          placeholder="請輸入地點"
          value={inputText}
          onChange={e => {
            onInputChange(e.target.value);
          }}
          onFocus={() => {
            console.log("focus");
            setShowDtm(true);
          }}
        />
        {showDtm && (
          <DtmRajw
            // data={props.data}
            data={sortData(props.data.Dtm)}
            getchildData={(data: any) => handleChildData(data)} //子傳父的callback func  把input傳到父層
            inputText={inputText}
          />
        )}
      </div>
    </>
  );
};

export default Preview;
