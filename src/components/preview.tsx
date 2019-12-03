import * as React from "react";
import DtmRajw from "./dtm_rajw";

interface I_Pre_Props {
  data?: {
    Dtm: any;
  };
}

const Preview: React.FC<I_Pre_Props> = props => {
  const [showDtm, setShowDtm] = React.useState(false);
  const [inputText, setInputText] = React.useState("");

  const onInputChange = (inputValue: string) => {
    setInputText(inputValue);
    console.log("inputValue", inputValue);
    setShowDtm(false);
  };

  return (
    <>
      <div>
        <input
          placeholder="請輸入地點"
          value={inputText}
          onChange={e => {
            onInputChange(e.target.value);
          }}
          onBlur={e => {
            // setShowDtm(false);
          }}
          onFocus={() => {
            console.log("focus");
            setShowDtm(true);
          }}
        />
        {showDtm && <DtmRajw data={props.data} />}
      </div>
    </>
  );
};

export default Preview;
