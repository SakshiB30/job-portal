import { Button, Checkbox, Textarea } from "@mantine/core";
import fields from "../../Data/ProfileData";
import SelectInput from "./SelectInput";
import { useState } from "react";
import { MonthPickerInput } from "@mantine/dates";

const ExpInput = (props: any) => {
  const [checked, setChecked] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const select = fields;
  const [desc, setDesc] = useState(
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit fugiat accusantium accusamus atque ipsa! Quo cupiditate at quia sapiente debitis?",
  );
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold ">{props.add?"Add":"Edit"} Experience</div>
      <div className="flex gap-10 *:w-1/2">
        <SelectInput {...select[0]} />
        <SelectInput {...select[1]} />
      </div>
      <SelectInput {...select[2]} />
      <Textarea
        withAsterisk
        label="Summary"
        value={desc}
        autosize
        minRows={3}
        placeholder="Enter About Summary"
        onChange={(event) => setDesc(event.currentTarget.value)}
      />
      <div className="flex gap-10 *:w-1/2">
        <MonthPickerInput
          withAsterisk
          maxDate={endDate || undefined}
          label="Start Date"
          placeholder="Pick Date"
          value={startDate}
          onChange={(value) => setStartDate(value ? new Date(value) : null)}
        />

        <MonthPickerInput
          disabled={checked}
          withAsterisk
          minDate={startDate || undefined}
          maxDate={new Date()}
          label="End Date"
          placeholder="Pick Date"
          value={endDate}
          onChange={(value) => setEndDate(value ? new Date(value) : null)}
        />
      </div>
      <Checkbox
        checked={checked}
        onChange={(event) => setChecked(event.currentTarget.checked)}
        autoContrast
        label="Currently working here"
      />
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
  );
};

export default ExpInput;
