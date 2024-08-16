import {faker} from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const supliersData = Array.from({length:100}).map(()=>({
  name: faker.company.name(),
  location: faker.location.streetAddress()
})) 

const customersData = Array.from({length: 100}).map(()=>({
    cc:`${faker.number.int({min:10000000000,max:999999999999})}`,
    name:faker.person.fullName(),
    age:`${faker.number.int({min:18,max:120})}`,
    email:faker.internet.exampleEmail()
}))

const productsData = Array.from({length: 100}).map(()=>({
    name:faker.commerce.product(),
    quantity:faker.number.int({min:0,max:100}),
    price: +faker.commerce.price({dec:2}),
    suplier_id:faker.number.int({min:1,max:100})
}))

const billsData = Array.from({length:500}).map(()=>({
    customer_id:faker.number.int({min:1,max:100})
}))

const detailsData = Array.from({length:1000}).map(()=>({
    product_id:faker.number.int({min:1,max:100}),
    quantity:faker.number.int({min:1,max:100}),
    price:+faker.commerce.price({dec:2}),
    bill_id:faker.number.int({min:1,max:100})
}))

const prisma = new PrismaClient()

async function main() {

    await prisma.details.deleteMany({})
    await prisma.products.deleteMany({})
    await prisma.bills.deleteMany({})
    await prisma.customers.deleteMany({})
    await prisma.supliers.deleteMany({})

    await prisma.supliers.createMany({ data:supliersData, skipDuplicates:true })

    await prisma.customers.createMany({ data:customersData, skipDuplicates:true})

    await prisma.products.createMany({ data:productsData, skipDuplicates:true })

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