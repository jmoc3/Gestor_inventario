import { Input } from "@nextui-org/react";

export function TopLeft({title}:{title:string}):JSX.Element{
    return (
        <div className="space-y-2 h-2/6 flex flex-col justify-center">
            <h2 className="text-5xl">{title}</h2>
            <div className="flex flex-col gap-2 ">
                <span>Search some {title.slice(0,-1).toLowerCase()}</span>
                <Input isClearable color="secondary" variant="bordered" name="searchContent" placeholder="search bar" />
            </div>
        </div>
    )
}