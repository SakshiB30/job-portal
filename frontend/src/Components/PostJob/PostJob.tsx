import SelectInput from "./SelectInput"
import { content, fields } from "../../Data/PostJobData"
import { Button, NumberInput, TagsInput, Textarea } from "@mantine/core";
import TextEditor from "./TextEditor";
import { IconArrowLeft } from "@tabler/icons-react";
import { isNotEmpty, useForm } from "@mantine/form";
import { postJob } from "../../Services/JobService";
import { errorNotification, successNotification } from "../../Services/NotificationService";
import { useNavigate } from "react-router";


const PostJob = () => {
  const select = fields;
  const Navigate = useNavigate();
  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: {
      jobTitle: '',
      company: '',
      experience:'',
      jobType: '',
      location: '', 
      packageOffered: '',
      skillsRequired: [],
      about: '',
      description: content,
    },
    validate: { 
      jobTitle: isNotEmpty('Job Title is required'),
      company: isNotEmpty('Company Name is required'),
      experience: isNotEmpty('Experience is required'),
      jobType: isNotEmpty('Job Type is required'),
      location: isNotEmpty('Location is required'),
      packageOffered: isNotEmpty('Package Offered is required'),
      skillsRequired: (value) => value.length > 0 ? null : 'At least one skill is required',
      about: isNotEmpty('About is required'),
      description: isNotEmpty('Description is required'),
    },

  })

  const handlePost = () => {
    form.validate();
    if(!form.isValid()) return;
    postJob(form.getValues()).then((res) => {
      successNotification("Success","Job Posted Successfully");
      console.log(res);
      Navigate('/posted-job');
    }).catch((error) => {
      console.log(error);
      errorNotification("Error",error.response.data.errorMessage);
    });
  }
  return (
    <div className="w-4/5 mx-auto">
        <div className="text-2xl font-semibold mb-5">Post a Job</div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-10 *:w-1/2">
            <SelectInput form={form} name="jobTitle" {...select[0]}/>
            <SelectInput form={form} name="company" {...select[1]}/>
          </div>
          <div className="flex gap-10 *:w-1/2">
            <SelectInput form={form} name="experience" {...select[2]}/>
            <SelectInput form={form} name="jobType" {...select[3]}/>
          </div>
          <div className="flex gap-10 *:w-1/2">
            <SelectInput form={form} name="location" {...select[4]}/>
            <NumberInput {...form.getInputProps("packageOffered")} min={1} max={300} clampBehavior="strict" label="Salary" withAsterisk placeholder="Enter Salary" hideControls/>
            {/* <SelectInput form={form} name="packageOffered" {...select[5]}/> */}
          </div>
          <TagsInput {...form.getInputProps("skillsRequired")} label="Skills" placeholder="Enter Skill" clearable acceptValueOnBlur splitChars={[',', ' ', '|']} withAsterisk />
          <Textarea
                  {...form.getInputProps("about")}
                  withAsterisk
                  label="About the Job"
                  autosize
                  minRows={3}
                  placeholder="Enter a brief about the job"
                />
          <div className="[&_button[data-active='true']]:text-bright-sun-400! [&_button[data-active='true']]:bg-bright-sun-400/2!">
            <div className="text-sm font-medium">Job Description <span className="text-red-500">*</span></div>
            <TextEditor form={form} />
          </div>
          <div className="flex gap-4" >
            <Button onClick={handlePost} leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="light">Publish Job</Button>
            <Button leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="outline">Save as Draft</Button>           
          </div>
        </div>
    </div>
  )
}


export default PostJob


