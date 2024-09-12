import React from "react";
import {Popover, PopoverTrigger, PopoverContent, User, image} from "@nextui-org/react";
import {UserCard} from "./UserCard";

export default function App({name,description,img}:{name:string,description:string,img:string}) {
  return (
    <Popover showArrow placement="bottom" className="">
      <PopoverTrigger>
        <User   
          as="button"
          name={name}
          description={description}
          className="transition-transform gap-4"
          avatarProps={{
            src: img,
            classNames:{
              base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]"
            }
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <UserCard name={name} email={description} image={img} />
      </PopoverContent>
    </Popover>
  );
}
