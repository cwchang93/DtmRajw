import * as React from "react";
import "./dtm_rajw.scss";
const cx = require(`classnames`);

interface Props {
  multiItem?: boolean; // 單選或多選
  // show?: {
  //     Dtm: boolean;  //是否出現快選單
  //     Rajn: boolean; //是否出現補字選單
  // }
  data?: {
    //資料
    Dtm: any; //Dtm     null:不出現快選單
    Rajn?: any; //Rajn    null:不出現補字選單
  };
  chooseFirst?: boolean; //是否補第一筆 (PC才有)  Dtm 補左上角
  inputCallBack?: any;
  inputTxt?: string;
}

interface State {
  inputText: string;
}

interface I_dtmData {
  line: { text: string; order: number }[];
  country: {
    text: string;
    order: number;
    content: {
      text: string;
      value: string;
    }[];
  }[];
}

const rajnArr = [
  "美國(US)__洛杉磯-加州-LOS ANGELES CA(LAX)",
  "美國(US)__舊金山-加州-SAN FRANCISCO CA(SFO)",
  "美國(US)__紐約-紐約州-NEW YORK NY(NYC)",
  "印度(IN)__德里-DELHI(DEL)",
  "土耳其(TR)__伊斯坦堡-ISTANBUL(IST)",
  "尼泊爾(NP)__加德滿都-KATHMANDU(KTM)",
  "阿拉伯聯合大公國(AE)__杜拜-DUBAI(DXB)"
];

const DtmRajw: React.FC<Props> = (props: Props) => {
  //  const DtmData = props.data.Dtm && props.data.Dtm;
  const dtmData = props.data && props.data.Dtm;
  // const dtmData = props.data && props.data.Dtm
  const [order, setOrder] = React.useState(1);
  const [selectedId, setSelectedId] = React.useState("");
  const [selectedText, setSelectedText] = React.useState("");
  const [dotsArr, setDotsArr] = React.useState<Array<boolean>>([]);
  //   const [dotsArr, setDotsArr] = React.useState<any>([]);
  const [newDtmData, setNewDtmData] = React.useState<any>({});

  const handleSelected = (item: any, idx: number) => {
    // setInputText(item.text);
    setSelectedText(item.text);
    setSelectedId(item.value);
    console.log("idx", idx);
  };

  // didMount
  React.useEffect(() => {
    // 創一個新的data並加入Key值
    const newDtmData = { ...dtmData };
    newDtmData.line.map((ele: any) => {
      ele.showDot = false;
    });
    setNewDtmData(newDtmData);
  }, []);

  React.useEffect(() => {
    setSelectedText(props.inputTxt || "");
    newDtmData.country.map((country: any) => {
      // country的arr
      country.content.map((city: any) => {
        // country的content(arr)
        if (props.inputTxt === city.text) {
          const tmpDtmData = { ...newDtmData };
          const dotOrder = country.order; // 要加點點的order
          tmpDtmData.line.map((ele: any) => {
            ele.showDot[dotOrder] = true;
          });
          setNewDtmData(tmpDtmData);
        }
      });
    });
  }, [props.inputTxt]);

  const matchDots = (jsonData: I_dtmData) => {
    const continentData = jsonData["line"];
    const matchDotsArr = new Array(continentData.length).fill(false);
    /**
     * 比對資料並setDotsArr
     * 1. 找出關鍵字對應的order值
     * 2. 把order的值存下來
     * 3. 把matchDotsArr的值continent加紅底=> 把該位置變true
     */

    setDotsArr(matchDotsArr);
    console.log("matchDotsArr", matchDotsArr);
  };

  // DtmData &&  console.log('orgData.line',DtmData.line);
  const renderContinent = () => {
    console.log("continent");
    return dtmData.line.map((ele: any, i: number) => {
      return (
        <li
          key={i}
          onClick={() => {
            setOrder(ele.order);
          }}
          className={
            cx({
              // ["active"]: ele.order === order,
              ["dot"]: dotsArr[i]
            })
            // ele.order === order ? "active" : ""
          }
        >
          {ele.text}
        </li>
      );
    });
  };

  const renderCity = () => {
    return dtmData.country.map((ele: any, i: number) => {
      return (
        <div className="contentWrap" key={i}>
          <div className="levelTwoWrap">
            {ele.order === order && <div className="levelTwo">{ele.text}</div>}
          </div>
          <div className="itemWrap">
            {ele.content.map((item: any, idx: number) => {
              if (ele.order === order) {
                return (
                  <div
                    key={idx}
                    id={item.value}
                    className={
                      //   item.value === selectedId ? "item selected" : "item"  // 一開始用id
                      item.text === selectedText || item.value === selectedId
                        ? "item selected"
                        : "item"
                    }
                    onClick={() => {
                      //   matchDots(dtmData);
                      const newDotsArr = new Array(dtmData.length).fill(false);
                      newDotsArr[i] = true;
                      setDotsArr(newDotsArr);
                      handleSelected(item, idx);
                      props.inputCallBack(item.text); // 把選到的text傳回父層
                    }}
                  >
                    {item.text}
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="dtm_rajw">
      <div className="dtm_rajw_dtmWrap" tabIndex={-1}>
        <ul className="continentTab">{dtmData.line && renderContinent()}</ul>
        {dtmData.country && renderCity()}
      </div>
    </div>
  );
};

export default DtmRajw;
