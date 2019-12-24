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
    // console.log("sort", data);
    const vLine = data.vLine;

    const lineKeyArr = Object.keys(vLine);
    const lineValueArr = Object.values(vLine);

    const obj: any = { line: [], country: [] };
    // obj.line = [];

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
    const continentObjArr: {}[] = Object.values(vCountry);
    // console.log("continentObjArr[0]", continentObjArr[0]);
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

    // obj.country = [];
    const vCity = data.vCity;
    // const cityKeyArr = Object.keys(vCity);
    // const cityValueArr = Object.values(vCity);

    // console.log(vCity);
    for (let i = 0; i < continentObjArr.length; i++) {
      //   const countryContentArr = Object.values();
      // console.log("123", continentObjArr[i]);
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
    return { Dtm: obj };
  };

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
