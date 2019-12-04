import * as React from "react";
import DtmRajw from "./dtm_rajw";

interface I_Pre_Props {
  data?: {
    Dtm: any;
  };
  inputCallBack?: (text: any) => void;
}

const ClickOutside = (ref: any, callback: any) => {
  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      console.log("clickOutside");
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

const Preview: React.FC<I_Pre_Props> = props => {
  const [showDtm, setShowDtm] = React.useState(false);
  const [inputText, setInputText] = React.useState("");

  const wrapperRef = React.useRef(null);
  ClickOutside(wrapperRef, () => setShowDtm(false));

  const onInputChange = (inputValue: string) => {
    setInputText(inputValue);
    // console.log("inputValue", inputValue);
    // setShowDtm(false);
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
          onBlur={e => {
            // setShowDtm(false);
          }}
          onFocus={() => {
            console.log("focus");
            setShowDtm(true);
          }}
        />
        {showDtm && (
          <DtmRajw
            data={props.data}
            inputTxt={inputText}
            inputCallBack={(text: any) => {
              setInputText(text);
            }}
          />
        )}
      </div>
    </>
  );
};

export default Preview;
