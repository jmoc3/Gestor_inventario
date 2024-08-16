import { useProductStore } from "@/src/store/products";
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";

export function TableMain():JSX.Element{
  const { products } = useProductStore()
  
  let header = [""]
  if (products.length!=0){
    header = Object.keys(products[0])
  }

  console.log(header)
    return (
      <Table className={`table-fixed w-2/4 text-center ${!products[0] && "hidden"}`}>
        <TableHeader>
          <>
           {
            header && header.length > 0  ? ( header.map((title,id) => (
               <TableColumn key={id}>{title}</TableColumn>
              ))) : <TableColumn>Not found</TableColumn>
            }
          </>
            <TableColumn className="p-2">Actions</TableColumn>
        </TableHeader> 
        <TableBody>
        {products && products.length>0 ? products.map((product,id)=>(
          <TableRow className="border" key={id}>
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.suplier_id}</TableCell>
            <TableCell className="space-x-2 py-3">
              <button className="bg-orange-500 p-2 rounded"><BsFillPencilFill/></button>
              <button className="bg-red-500 p-2 rounded"><BsFillTrash3Fill/></button>
            </TableCell>
          </TableRow>
        )):(
    <TableRow>
      <TableCell>Not found</TableCell>
    </TableRow>
  )}
      </TableBody>
    </Table>

    )
}