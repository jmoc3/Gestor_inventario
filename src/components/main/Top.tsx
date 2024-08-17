import { Input } from "@nextui-org/react";

export function Top({title}:{title:string}):JSX.Element{
    return (
        <div className="topMain space-y-2 w-1/5 py-12">
            <h2 className="text-5xl">{title}</h2>
            <div className="flex flex-col gap-2 ">
                <span>Search some {title.slice(0,-1).toLowerCase()}</span>
                <Input isClearable color="secondary" variant="bordered" name="searchContent" placeholder="search bar" />
            </div>
        </div>
    )
}