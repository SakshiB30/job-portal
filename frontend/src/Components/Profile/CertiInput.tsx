import { Button, TextInput } from "@mantine/core";
import SelectInput from "./SelectInput";
import fields from "../../Data/ProfileData";
import { MonthPickerInput } from "@mantine/dates";
import { useState } from "react";
import { isNotEmpty, useForm } from "@mantine/form";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../Services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice";

const CertiInput = (props: any) => {
  const select = fields;
  const [issueDate, setIssueDate] = useState<Date | null>(new Date());
  const profile = useSelector((state: any) => state.profile);
  const dispatch = useDispatch();

  const form = useForm({
    mode: "controlled",
    validateInputOnChange: true,
    initialValues: {
      name: "",
      issuer: "",
      issueDate: new Date(),
      certificateId: "",
    },
    validate: {
      name: isNotEmpty("Name is required"),
      issuer: isNotEmpty("Issuer is required"),
      issueDate: isNotEmpty("Issue Date is required"),
      certificateId: isNotEmpty("Certificate ID is required"),
    },
  });

  const handleSave = () => {
    form.validate();
    if (!form.isValid()) return;
    let certi = [...profile.certifications];
    certi.push(form.getValues());
    certi[certi.length - 1].issueDate =
      certi[certi.length - 1].issueDate.toISOString();
    let updatedProfile = { ...profile, certifications: certi };
    props.setEdit(false);
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Certificate Added successfully");
  };

  return (
    <div className="flex flex-col gap-3">
      <div>Add Certificate</div>
      <div className="flex gap-10 *:w-1/2">
        <TextInput
          {...form.getInputProps("name")}
          label="Title"
          withAsterisk
          placeholder="Enter Title"
        />
        <SelectInput form={form} name="issuer" {...select[1]} />
      </div>
      <div className="flex gap-10 *:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("issueDate")}
          withAsterisk
          maxDate={new Date()}
          label="Issue Date"
          placeholder="Enter Issue Date"
        />
        <TextInput
          {...form.getInputProps("certificateId")}
          label="Certificate ID"
          withAsterisk
          placeholder="Enter Certificate ID"
        />
      </div>
      <div className="flex gap-5">
        <Button onClick={handleSave} color="green.8" variant="light">
          {" "}
          Save{" "}
        </Button>
        <Button
          color="red.8"
          variant="light"
          onClick={() => props.setEdit(false)}
        >
          {" "}
          Cancel{" "}
        </Button>
      </div>
    </div>
  );
};

export default CertiInput;
