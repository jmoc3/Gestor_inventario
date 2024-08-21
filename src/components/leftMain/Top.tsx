import {  Input } from "@nextui-org/react";
import { useProductStore } from "@/src/store/products";

export function TopLeft({title}:{title:string}):JSX.Element{

    const {products, productsCopy, setProductsCopy} = useProductStore()

    const inputChangeController = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value
        const productsFiltered = products.filter(e => e.name.toLowerCase().includes(inputText));      
        setProductsCopy(productsFiltered)
        console.log(products, productsCopy)
    }

    return (
        <div className="space-y-2 h-2/6 flex flex-col justify-center">
            <h2 className="text-5xl">{title}</h2>
            <div className="flex flex-col gap-2 ">
                <span>Search some {title.slice(0,-1).toLowerCase()}</span>
                <div className="flex  gap-8 justify-center items-center">

                    <Input isClearable variant="faded" name="searchContent" placeholder="search bar" onChange={inputChangeController}/>
            
                </div>
            </div>
        </div>
    )
}