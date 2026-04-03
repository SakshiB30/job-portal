import { ActionIcon } from "@mantine/core"
import CertiInput from "./CertiInput"
import {
  IconPencil,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import CertifCard from "./CertifCard";
import { useState } from "react";
import { useSelector } from "react-redux";

const Certificates = () => {
  const [addCerti, setAddCerti] = useState(false);
  const [edit, setEdit] = useState(false);

  const profile = useSelector((state: any) => state.profile);

  const handleClick = () => {
    setEdit(!edit);
  };

  return (
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
                onClick={handleClick}
                variant="subtle"
                color={edit ? "red.8" : "brightSun.4"}
                size="lg"
              >
                {edit ? (
                  <IconX className="h-4/5 w-4/5" />
                ) : (
                  <IconPencil className="h-4/5 w-4/5" />
                )}
              </ActionIcon>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {profile?.certifications?.map((certi: any, index: number) => (
              <CertifCard index={index} key={index} edit={edit} {...certi} />
            ))}
            {addCerti && <CertiInput setEdit={setAddCerti} />}
          </div>
        </div>
  )
}

export default Certificates
