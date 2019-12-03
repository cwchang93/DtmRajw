import * as React from 'react'
import './dtm_rajw.scss'

interface Props {
    multiItem?: boolean;    // 單選或多選
    // show?: {
    //     Dtm: boolean;  //是否出現快選單
    //     Rajn: boolean; //是否出現補字選單
    // }
    data?: {  //資料
        Dtm: any  //Dtm     null:不出現快選單
        Rajn?: any //Rajn    null:不出現補字選單
    }
    chooseFirst?: boolean; //是否補第一筆 (PC才有)  Dtm 補左上角
}

interface State {
    inputText: string;
}


const rajnArr = [ 
 "美國(US)__洛杉磯-加州-LOS ANGELES CA(LAX)",
 "美國(US)__舊金山-加州-SAN FRANCISCO CA(SFO)",
 "美國(US)__紐約-紐約州-NEW YORK NY(NYC)",
 "印度(IN)__德里-DELHI(DEL)",
 "土耳其(TR)__伊斯坦堡-ISTANBUL(IST)",
 "尼泊爾(NP)__加德滿都-KATHMANDU(KTM)",
 "阿拉伯聯合大公國(AE)__杜拜-DUBAI(DXB)"]


 const ClickOutside = (ref:any, callback:any) => {
    function handleClickOutside(event:any) {
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


const DtmRajw:React.FC<Props> = (props:Props) => {
    //  const DtmData = props.data.Dtm && props.data.Dtm;
    const dtmData = props.data && props.data.Dtm
    // const dtmData = props.data && props.data.Dtm
    const [inputText, setInputText] = React.useState('');
    const [showDtm, setShowDtm] = React.useState(false);
    const [order, setOrder] = React.useState(-1)
    const [selectedId, setSelectedId] = React.useState('');
    const [selectedText, setSelectedText] = React.useState('');

    const wrapperRef = React.useRef(null);
    ClickOutside(wrapperRef, ()=> setShowDtm(false))


    const onInputChange = (inputValue: string) => {
        setInputText(inputValue);
        console.log('inputValue', inputValue);
        setShowDtm(false);
        // for (let i = 0; i < rajnArr.length; i++ ) {
        //     console.log(rajnArr.findIndex(inputValue))
        // }
        
    }

    React.useEffect(() => {
        if (inputText !== selectedText) {
            setSelectedId('selectedId');                            
        }
    
    
    }, [inputText, selectedText])


   const handleSelected = (item:any, idx:number) => {
    setInputText(item.text); 
    setSelectedText(item.text);
    setSelectedId(item.value);
   }

    // DtmData &&  console.log('orgData.line',DtmData.line);
    const renderContinent = () => {
        console.log('continent')
       return dtmData.line.map((ele:any)=>{
        return (
            <li onClick={()=>setOrder(ele.order)} className={ ele.order === order ? 'active' : ''}>
                {ele.text}
            </li>
        )
       })
    }

    const renderCity = () => {
        return dtmData.country.map((ele:any, i:number)=>{
            return (
                <div className="contentWrap">
                <div className="levelTwoWrap">
                    { ele.order === order &&  
                                <div className="levelTwo">{ele.text}</div>
                        } 
                </div>
                <div className="itemWrap">
                    {ele.content.map((item:any, idx:number)=>{
                        if (ele.order === order) {
                            return (
                                <div id={item.value} className={ item.value === selectedId ? 'item selected' : 'item' } onClick={()=>{handleSelected(item,idx)}}>{item.text}</div>
                                )
                        } 
                        })}
                </div>
                </div>
            )
        })

    }


    return (
        <div className="dtm_rajw" ref={wrapperRef}>
            <input placeholder="請輸入地點" 
            value={inputText}
            onChange={(e)=>{
                onInputChange(e.target.value)
            }}
            onBlur={(e)=>{
                // setShowDtm(false);
            }}
            onFocus={()=> {
                console.log('focus');
                setShowDtm(true);
            }}
            />  
            { showDtm && 
            <div className="dtm_rajw_dtmWrap"  tabIndex={-1}
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

            }     
        
        </div>
    )

}


export default DtmRajw;