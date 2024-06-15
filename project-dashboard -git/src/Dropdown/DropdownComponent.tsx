import { useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';
import './DropdownComponent.css';

interface SelectProps {
    selectedState: string;
    placeholder: string;
    label: string;
    list: string[];
    handleSelectChange: Function;
}
function Dropdown(props: SelectProps) {

    const [selectedValue, setSelectedValue] = useState("")
    const listItems = props.list.map((item, idx) => <MenuItem value={item} key={idx}>{item}</MenuItem>)
    const placeholder = props.placeholder
    return (
        <FormControl className='dropdown'>
            <Select
                labelId="select-label"
                id="select"
                value={props.selectedState} 
                displayEmpty={!!placeholder}
                placeholder={placeholder}
                onChange={(evt) => { 
                    setSelectedValue(evt.target.value)
                    props.handleSelectChange(evt.target.value) }}
            >
                {(placeholder ? <MenuItem disabled value="">{placeholder}</MenuItem> : '')}
                {listItems}
            </Select>
        </FormControl>
    )
}

export default Dropdown;