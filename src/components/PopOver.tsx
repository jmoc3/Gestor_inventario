import React from "react";
import {Popover, PopoverTrigger, PopoverContent, User} from "@nextui-org/react";
import {UserTwitterCard} from "./UserTwitterCard";

export default function App({name,description,img}:{name:string,description:string,img:string}) {
  return (
    <Popover showArrow placement="bottom">
      <PopoverTrigger>
        <User   
          as="button"
          name={name}
          description={description}
          className="transition-transform"
          avatarProps={{
            src: img
          }}
        />
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <UserTwitterCard />
      </PopoverContent>
    </Popover>
  );
}
