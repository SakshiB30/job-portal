import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core";
import {
  IconDeviceFloppy,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertifCard from "./CertifCard";
import { useEffect, useState } from "react";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Services/ProfileService";
import Info from "./Info";
import { setProfile } from "../../Slices/ProfileSlice";


const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);
  const [about, setAbout] = useState(profile.about);
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const [addExp, setAddExp] = useState(false);
  const [addCerti, setAddCerti] = useState(false);
  const [skills, setSkills] = useState(profile.skills);

  const handleEdit = (index: any) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
    console.log(edit);
  };

  useEffect(() => {
    console.log(profile);
    getProfile(user.id)
      .then((data: any) => {
        dispatch(setProfile(data));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    
    <div className="w-4/5 mx-auto">
      <div className="relative">
        <img className="rounded-t-2xl" src="/Profile/banner2.jpg" alt="" />
        <img
          className="h-48 w-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8"
          src="/A1.png"
          alt=""
        />
      </div>

      <div className="px-3 mt-30">
        <Info />

        <Divider my="xl" />
        <div>
          <div className="text-2xl font-semibold mb-3 flex justify-between">
            About{" "}
            <ActionIcon
              onClick={() => handleEdit(1)}
              variant="subtle"
              color="brightSun.4"
              size="lg"
            >
              {edit[1] ? (
                <IconDeviceFloppy className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
          </div>
          {edit[1] ? (
            <Textarea
              value={about}
              autosize
              minRows={3}
              placeholder="Enter About Yourself"
              onChange={(e) => setAbout(e.target.value)}
            />
          ) : (
            <div className="text-sm text-mine-shaft-300 text-justify">
              {profile?.about}
            </div>
          )}
        </div>
        <Divider my="xl" />
        <div>
          <div className="text-2xl font-semibold mb-3 flex justify-between">
            Skills{" "}
            <ActionIcon
              onClick={() => handleEdit(2)}
              variant="subtle"
              color="brightSun.4"
              size="lg"
            >
              {edit[2] ? (
                <IconDeviceFloppy className="h-4/5 w-4/5" />
              ) : (
                <IconPencil className="h-4/5 w-4/5" />
              )}
            </ActionIcon>
          </div>
          {edit[2] ? (
            <TagsInput
              placeholder="Add Skills"
              value={skills}
              onChange={setSkills}
              splitChars={[",", " ", "|"]}
            />
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile?.skills?.map((skill: any, index: number) => (
                <div
                  key={index}
                  className=" bg-bright-sun-300/15 text-sm font-medium rounded-3xl text-bright-sun-400 px-3 py-1"
                >
                  {skill}
                </div>
              ))}
            </div>
          )}
        </div>
        <Divider my="xl" />

        <div>
          <div className="text-2xl font-semibold mb-5 flex justify-between">
            Experience{" "}
            <div className="flex gap-2">
              <ActionIcon
                onClick={() => setAddExp(true)}
                variant="subtle"
                color="brightSun.4"
                size="lg"
              >
                <IconPlus className="h-4/5 w-4/5" />
              </ActionIcon>
              <ActionIcon
                onClick={() => handleEdit(3)}
                variant="subtle"
                color="brightSun.4"
                size="lg"
              >
                {edit[3] ? (
                  <IconDeviceFloppy className="h-4/5 w-4/5" />
                ) : (
                  <IconPencil className="h-4/5 w-4/5" />
                )}
              </ActionIcon>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {profile?.experiences?.map((exp: any, index: number) => (
              <ExpCard key={index} {...exp} edit={edit[3]} />
            ))}
            {addExp && <ExpInput add setEdit={setAddExp} />}
          </div>
        </div>

        <Divider my="xl" />
        <div>
          <div className="text-2xl font-semibold mb-5 flex justify-between">
            Certifications{" "}
            <div className="flex gap-2">
              <ActionIcon
                onClick={() => setAddCerti(true)}
                variant="subtle"
                color="brightSun.4"
                size="lg"
              >
                <IconPlus className="h-4/5 w-4/5" />
              </ActionIcon>
              <ActionIcon
                onClick={() => handleEdit(4)}
                variant="subtle"
                color="brightSun.4"
                size="lg"
              >
                {edit[4] ? (
                  <IconDeviceFloppy className="h-4/5 w-4/5" />
                ) : (
                  <IconPencil className="h-4/5 w-4/5" />
                )}
              </ActionIcon>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {profile?.certifications?.map((certi: any, index: number) => (
              <CertifCard key={index} edit={edit[4]} {...certi} />
            ))}
            {addCerti && <CertiInput setEdit={setAddCerti} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
