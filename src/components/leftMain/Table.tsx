'use client'

import { useProductStore } from "@/src/store/products";
import { useState, useMemo, useCallback, useContext } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip} from "@nextui-org/react";
import { DeleteIcon } from "../UIComponents/DeleteIcon";
import { EditIcon } from "../UIComponents/EditionIcon";
import { toCapitalize } from "@/src/helpers/string.helper";
import { useSession } from "next-auth/react";
import { SectionProvider } from "@/src/app/home/page";
import {useDisclosure} from "@nextui-org/react";

import Notify from "@/src/services/Notify";
import DeleteModal from "../UIComponents/modals/DeleteModal"
import UpdateModal from "../UIComponents/modals/UpdateModal"

export function TableMain():JSX.Element{
  const { products, productsCopy, setProducts, setProductsCopy, fetchData } = useProductStore()
  const [page, setPage] = useState(1);

  const rowsPerPage = 9;
  const pages = Math.ceil(productsCopy.length / rowsPerPage);
  
    const productsPerPage = useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;
      
      return productsCopy.slice(start, end);
    }, [page, productsCopy]);
    
    const {data:session} = useSession()
    
    type Data = typeof productsCopy[0]
    const result =  Object.keys(products[0]).map((key) => {
      return {
        name: toCapitalize(key),
        uid: key,
      };
    });
    
    if (session?.user.id_rol==2){
      result.push({
        uid: "actions",
        name: "Actions",
      });
    } 
      
    const section = useContext(SectionProvider)
    const [rowSelected,setRowSelected] = useState<number>()

    const deleteFunction = async () =>{
      
      const delResPromise = await fetch(`/api/${section.toLowerCase()}/delete/${rowSelected}`,{
        method: 'DELETE'
      })
      const delRes = await delResPromise.json()

      if(!Object.keys(delRes).includes("id")) return Notify({message:`${section} row with id ${rowSelected} is called in another table`,backgroundColor:'#441729',color:'#F53859',extraStyles:{zIndex:'60'},duration:5000})

      if(section!="Users"){
        const reFetch = await fetchData(section.toLowerCase())
        setProducts(reFetch)
        setProductsCopy(reFetch)
      } 
      
      return Notify({message:`${section} deletion completed`,backgroundColor:'#183B2A',color:'#18C764'})
    }
    
    const {isOpen:isOpenDelete, onOpen: onOpenDelete, onOpenChange:onOpenChangeDelete} = useDisclosure();
    const {isOpen:isOpenUpdate, onOpen: onOpenUpdate, onOpenChange:onOpenChangeUpdate} = useDisclosure();
    
    const renderCell = useCallback((item: Data, columnKey: React.Key,id:number) => {
    const cellValue = item[columnKey as keyof Data];
    
     switch (columnKey) {
      case "actions":
        return (
          <div className="flex items-center justify-center gap-2">
            <Tooltip content={`Edit ${section}`}>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={()=>{setRowSelected(id);onOpenUpdate()}} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content={`Delete ${section}`}>
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={()=>{setRowSelected(id);onOpenDelete()}} />
              </span>
            </Tooltip>
          </div>
        );
        default:
        return cellValue;
     }
    }, [section]);
  
    return (
      <>
        <Table 
          isStriped
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
                />
            </div>
          }
          className="h-4/6 px-16"
          >
        <TableHeader columns={result}>
          {(column) => (
            <TableColumn key={column.uid} align="center">
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={productsPerPage}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey,item.id)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DeleteModal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete} deleteLogic={deleteFunction} description={`Do you really want to delete this ${section.slice(0, -1).toLowerCase()}?`}/> 
      <UpdateModal isOpen={isOpenUpdate} onOpenChange={onOpenChangeUpdate} id={rowSelected!} /> 
    </>
      );}