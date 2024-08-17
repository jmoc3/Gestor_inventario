'use client'

import { useProductStore } from "@/src/store/products";
import { BsFillTrash3Fill, BsFillPencilFill } from "react-icons/bs";
import { useState, useMemo } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue} from "@nextui-org/react";

function toCapitalize(text:string) {
  if (text.length === 0) return text; // Manejar cadenas vacías
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function TableMain():JSX.Element{

      const { products } = useProductStore()
      const [page, setPage] = useState(1);

      const rowsPerPage = 10;
    
      const pages = Math.ceil(products.length / rowsPerPage);

      const productsPerPage = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
    
        return products.slice(start, end);
      }, [page, products]);
    
      return (
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
          className="px-16"
        >
          <TableHeader>
            <TableColumn key="id">{toCapitalize("id")}</TableColumn>
            <TableColumn key="name">{toCapitalize("name")}</TableColumn>
            <TableColumn key="quantity">{toCapitalize("quantity")}</TableColumn>
            <TableColumn key="price">{`${toCapitalize("price")}`}</TableColumn>
            <TableColumn key="suplier_id">{toCapitalize("suplier_id")}</TableColumn>
          </TableHeader>
          <TableBody items={productsPerPage}>
            {(item) => (
              <TableRow key={item.name}>
                {(columnKey) => <TableCell>{`${getKeyValue(item, columnKey)} ${ columnKey=="price" ? "$" : " "}`}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      );}