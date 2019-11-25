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
        Rajn: any //Rajn    null:不出現補字選單
    }
    chooseFirst?: boolean; //是否補第一筆 (PC才有)  Dtm 補左上角
}

interface State {
    inputText: string;
}


const DtmRajw:React.FC<Props> = (props) => {

    const [inputText, setInputText] = React.useState('');

    const [showDtm, setShowDtm] = React.useState(false);

    const onInputChange = (inputValue: string) => {
        setInputText(inputValue);
        console.log('inputValue', inputValue);
    }


    return (
        <div>
            <input placeholder="123" 
            onChange={(e)=>{
                onInputChange(e.target.value)
            }}
            onBlur={()=>{
                setShowDtm(false);
            }}
            onFocus={()=> {
                setShowDtm(true);
            }}
            />       
            <div className="dtmWrap">


            </div>
        
        </div>
    )

}


export default DtmRajw;