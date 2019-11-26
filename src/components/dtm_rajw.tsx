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


const DtmRajw:React.FC<Props> = (props:Props) => {
    //  const DtmData = props.data.Dtm && props.data.Dtm;
    const dtmData = props.data && props.data.Dtm
    const [inputText, setInputText] = React.useState('');
    console.log('dtmData',typeof dtmData)

    const [showDtm, setShowDtm] = React.useState(false);
    const [order, setOrder] = React.useState(-1)

    console.log('showDtm', showDtm);

    const onInputChange = (inputValue: string) => {
        setInputText(inputValue);
        console.log('inputValue', inputValue);
    }
    // DtmData &&  console.log('orgData.line',DtmData.line);
    const renderContinent = () => {
        console.log('continent')
       return dtmData.line.map((ele:any)=>{
        return (
            <li onClick={()=>setOrder(ele.order)}>
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
                <div className="cityWrap">
                    {ele.content.map((city:any, idx:number)=>{
                        if (ele.order === order) {
                            return (
                                <div className="city">{city.text}</div>
                                )
                        } 
                        })}
                </div>
                        </div>
            )
        })

    }


    return (
        <div className="dtm_rajw">
            <input placeholder="123" 
            
            onChange={(e)=>{
                onInputChange(e.target.value)
            }}
            onBlur={()=>{
                setShowDtm(false);
            }}
            onFocus={()=> {
                console.log('focus');
                setShowDtm(true);
            }}
            />  
            { showDtm && 
            <div className="dtm_rajw_dtmWrap">
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