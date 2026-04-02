import { Divider, RangeSlider } from "@mantine/core"
import { dropdownData } from "../../Data/JobsData"
import MultiSelectCreatable from "./MultiSelectCreatable"
import { useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState<[number, number]>([1, 100]);

  return (
    <div className="flex px-5 py-8">
      { 
        dropdownData.map((item,index) =>
        <> <div key={index} className="w-1/5">
          <MultiSelectCreatable {...item} />
        </div>
        <Divider mr="xs" orientation="vertical" size="xs" />
        </>)
      }
      <div className="w-1/5">
      <div className="flex text-sm justify-between ">
        <div>Salary</div>
        <div>&#8377;{value[0]} LPA - &#8377;{value[1]} LPA</div>
      </div>
        <RangeSlider 
          classNames={{
          label: "translate-y-10",
          }}
          color="brightSun.4" size="xs" value={value} 
          labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }}
        
         onChange={setValue}/>
      </div>
      
     </div>
  )
}

export default SearchBar
