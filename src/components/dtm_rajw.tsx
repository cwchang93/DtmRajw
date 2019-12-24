import * as React from "react";
import "./dtm_rajw.scss";
import cx from "classnames";

interface Props {
  multiItem?: boolean; // 單選或多選
  data: {
    //資料
    Dtm: any; //Dtm     null:不出現快選單
    Rajn?: any; //Rajn    null:不出現補字選單
  };
  chooseFirst?: boolean; //是否補第一筆 (PC才有)  Dtm 補左上角
  getchildData?: any;
  inputText: string;
}

interface State {
  inputText: string;
}

const DtmRajw: React.FC<Props> = (props: Props) => {
  //  const DtmData = props.data.Dtm && props.data.Dtm;
  const dtmData = props.data && props.data.Dtm;
  // const dtmData = props.data && props.data.Dtm
  const [showDtm, setShowDtm] = React.useState(false);
  const [order, setOrder] = React.useState(0);
  const [selectedData, setSelectedData] = React.useState({
    text: "",
    value: ""
  });

  const handleSelected = (item: any, idx: number) => {
    const clickedData: { text: string; value: string } = {
      text: item.text,
      value: item.value
    };
    setSelectedData(clickedData);
    props.getchildData(clickedData); // 把選到的資料丟給父層
  };

  // DtmData &&  console.log('orgData.line',DtmData.line);
  const renderContinent = () => {
    // console.log("continent");
    return dtmData.line.map((ele: any, i: number) => {
      return (
        <li
          key={`${ele.text}_${i}`}
          onClick={() => setOrder(ele.order)}
          className={ele.order === order ? "active" : ""}
        >
          {ele.text}
        </li>
      );
    });
  };

  const renderCity = () => {
    return dtmData.country.map((ele: any, i: number) => {
      console.log("ele.order", ele.order);
      console.log("order", order);
      return (
        <div
          className={cx(
            {
              displayNone: ele.order !== order
            },
            "contentWrap"
          )}
          key={`${ele.text}_${i}`}
        >
          <div className="levelTwoWrap">
            {ele.order === order && <div className="levelTwo">{ele.text}</div>}
          </div>
          <div className="itemWrap">
            {ele.content.map((item: any, idx: number) => {
              // console.log("item", item);
              // console.log("ele.order", ele.order);
              // console.log("order", order);
              if (ele.order === order) {
                return (
                  <div
                    id={item.value}
                    key={idx}
                    className={
                      // item.text === selectedData.text &&
                      cx({ selected: props.inputText === item.text }, "item")
                    }
                    onClick={() => {
                      handleSelected(item, idx);
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
      <div
        className="dtm_rajw_dtmWrap"
        tabIndex={-1}
        // onBlur={()=> {
        //     console.log('blur');
        // setShowDtm(false)}}
      >
        <ul className="continentTab">
          {dtmData.line && renderContinent()}
          {/* {renderContinent()} */}
        </ul>
        {dtmData.country && renderCity()}
        {/* {renderCity()} */}
      </div>
    </div>
  );
};

export default DtmRajw;
