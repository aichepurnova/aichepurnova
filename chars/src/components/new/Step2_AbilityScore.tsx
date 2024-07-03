import React, { useState } from "react"
import CSS from "./charsCreateNew.module.css"
import ArrowsBlock from "../functional/ArrowsBlock"

function Step2AbilityScore ({ability, value, onChange, handleMove}: 
    {ability: string, 
        value: number,  
        onChange: (value: number) => void,
        handleMove: (direction: string) => void}) {
    
    const [errorMsg, setErrorMsg] = useState<string>()
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let new_value = Number(event.currentTarget.value)
        console.log(new_value)
        if (new_value>20) {
            setErrorMsg("Value can't be more then 20")
        }
        if (new_value<20 && new_value>-1) {
            onChange(new_value)
            setErrorMsg("")
        }
        else {
            setErrorMsg("Invalid number. Value should be between 3 and 20")
        }
    }
    return <div className={CSS["Step2_AbilityScore"]}>
        <div>{ability}</div>
        <input type={"number"} value={value} onChange={(event)=>handleInputChange(event)}></input>
        <ArrowsBlock onClickUp={()=>handleMove('up')} onClickDown={()=>handleMove('down')}></ArrowsBlock>
        <div>{errorMsg}</div>
    </div>
}

export default Step2AbilityScore