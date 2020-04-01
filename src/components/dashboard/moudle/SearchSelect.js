import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

class SearchSelect extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        return (
            <Select
                showSearch
                {...this.props}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {this.props.optionList?this.props.optionList.map((i,k)=>(<Option key={k} value={i.value}>{i.name}</Option>)):null}
            </Select>
        )
    }


}
export default SearchSelect;