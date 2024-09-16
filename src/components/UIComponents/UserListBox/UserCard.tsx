import React from "react";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader} from "@nextui-org/react";
import ListBox from "./ListBox";
import { signOut, useSession } from "next-auth/react";

export const UserCard = ({name, email, image}:{name:string,email:string, image:string}) => {

  const {data:session} = useSession()
  const provider = session?.user!.provider
  const visible = provider == 'credentials'

  return (
    <Card shadow="none" className="border-none bg-transparent">
      <CardHeader className="flex justify-between gap-8">
        <div className="flex gap-4">
          <Avatar isBordered radius="full" size="md" 
            src={image} 
            classNames={{
              base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
              icon: "text-black/80",
            }} />
          <div className="flex flex-col items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{name}</h4>
          </div>
        </div>
        <Button
          className="bg-transparent text-foreground border-default-200"
          color="primary"
          radius="full"
          size="sm"
          variant="bordered" 
          onClick={()=>{signOut({callbackUrl:"/"})}}  
        >
          Sign Out
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p className="flex gap-2 self-center text-small pl-px text-default-500">
          {email}
          <span aria-label="confetti" role="img">
            🎉
          </span>
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        {
        visible ? <ListBox  /> : <></>
        }   
      </CardFooter>
    </Card>
  );
};
