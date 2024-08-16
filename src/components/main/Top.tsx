export function Top({title}:{title:string}):JSX.Element{
    return (
        <div className="topMain space-y-2 w-1/5 py-12">
            <h2 className="text-5xl">{title}</h2>
            <div className="flex flex-col gap-2 ">
                <span>Search some {title.slice(0,-1).toLowerCase()}</span>
                <input className="rounded text-[#282828] px-2 py-1 hover:opacity-[.9] transition " name="searchContent" placeholder="search bar" />
            </div>
        </div>
    )
}