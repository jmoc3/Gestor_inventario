'use client'

import { useProductStore } from "@/src/store/products";
import { useState, useMemo, useCallback } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, getKeyValue, Tooltip} from "@nextui-org/react";
import { EyeIcon } from "../UIComponents/EyeIcon";
import { DeleteIcon } from "../UIComponents/DeleteIcon";
import { EditIcon } from "../UIComponents/EditionIcon";
import { toCapitalize } from "@/src/helpers/string.helper";

export function TableMain():JSX.Element{
    const { products, productsCopy } = useProductStore()
    const [page, setPage] = useState(1);

    const rowsPerPage = 9;
    const pages = Math.ceil(productsCopy.length / rowsPerPage);

    const productsPerPage = useMemo(() => {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return productsCopy.slice(start, end);
    }, [page, productsCopy]);
    
    type Data = typeof productsCopy[0]
    const result =  Object.keys(products[0]).map((key,id) => {
      return {
        name: key.charAt(0).toUpperCase() + key.slice(1), // Capitaliza la primera letra
        uid: key,
      };
    });

    result.push({
      name: "Actions",
      uid: "actions",
    });
    console.log(result)
    const renderCell = useCallback((item: Data, columnKey: React.Key) => {
      const cellValue = item[columnKey as keyof Data];
      
      console.log(columnKey)
      switch (columnKey) {
        case "actions":
          return (
            <div className="flex items-center justify-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    }, []);
  
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
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
      );}