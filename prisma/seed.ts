import {faker} from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const suppliersData = Array.from({length:500}).map(()=>({
  name: faker.company.name(),
  location: faker.location.streetAddress()
})) 

const uniquesuppliersData = suppliersData.filter((supplier, index, self) => 
    index === self.findIndex((t) => t.name === supplier.name)
  );


const customersData = Array.from({length: 500}).map(()=>({
    cc:`${faker.number.int({min:10000000000,max:999999999999})}`,
    name:faker.person.fullName(),
    age:`${faker.number.int({min:10,max:90})}`,
    email:faker.internet.exampleEmail()
}))

const uniqueCustomersData = customersData.filter((supplier, index, self) => 
    index === self.findIndex((t) => t.name === supplier.name)
  );

const productsData = Array.from({length: 500}).map(()=>({
    name:faker.commerce.product(),
    quantity:faker.number.int({min:0,max:100}),
    price: +faker.commerce.price({dec:2}),
    supplier_id:faker.number.int({min:1,max:40})
}))

const uniqueProductsData = productsData.filter((supplier, index, self) => 
    index === self.findIndex((t) => t.name === supplier.name)
  );

const billsData = Array.from({length:200}).map(()=>({
    customer_id:faker.number.int({min:1,max:499}),
    createdAt: faker.date.between({from:'2016-01-01', to:new Date()}) // Genera una fecha entre 2016 y la fecha actual
}))

const detailsData = Array.from({length:20}).map(()=>({
    product_id:faker.number.int({min:1,max:20}),
    quantity:faker.number.int({min:1,max:100}),
    price:+faker.commerce.price({dec:2}),
    bill_id:faker.number.int({min:1,max:20})
}))

const prisma = new PrismaClient()

async function main() {

    await prisma.details.deleteMany({})
    await prisma.products.deleteMany({})
    await prisma.bills.deleteMany({})
    await prisma.customers.deleteMany({})
    await prisma.suppliers.deleteMany({})

    await prisma.suppliers.createMany({ data:uniquesuppliersData, skipDuplicates:true })

    await prisma.customers.createMany({ data:uniqueCustomersData, skipDuplicates:true})

    await prisma.products.createMany({ data:uniqueProductsData, skipDuplicates:true })

    await prisma.bills.createMany({ data:billsData, skipDuplicates:true })

    await prisma.details.createMany({ data:detailsData, skipDuplicates:true})

}

main()
    .catch((e)=>{
        console.log(e)
        process.exit(1)
    })
    .finally(()=>{
        prisma.$disconnect
    })