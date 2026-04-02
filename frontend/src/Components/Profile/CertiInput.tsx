import { Button, TextInput } from "@mantine/core"
import SelectInput from "./SelectInput"
import fields from "../../Data/ProfileData";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";



const CertiInput = (props:any) => {
    const select = fields;
    const [issueDate, setIssueDate] = useState<Date | null>(new Date());
   
  return (
    <div className="flex flex-col gap-3">
      <div>Add Certificate</div>
       <div className="flex gap-10 *:w-1/2">
        <TextInput label="Title" withAsterisk placeholder="Enter Title" />
        <SelectInput {...select[1]} />
      </div>
      <div className="flex gap-10 *:w-1/2">
        <MonthPickerInput
                  withAsterisk
                  maxDate={new Date()}
                  label="Certificate ID"
                  placeholder="Enter ID"
                  value={issueDate}
                  onChange={(value) => setIssueDate(value ? new Date(value) : null)}
                />
                <TextInput label="Title" withAsterisk placeholder="Enter Title" />
      </div>
      <div className="flex gap-5">
              <Button
                onClick={() => props.setEdit(false)}
                color="brightSun.4"
                variant="outline"
              >
                {" "}
                Save{" "}
              </Button>
              <Button color="red.8" variant="light" onClick={() => props.setEdit(false)}>
                {" "}
                Cancel{" "}
              </Button>
            </div>
    </div>
  )
}

export default CertiInput
