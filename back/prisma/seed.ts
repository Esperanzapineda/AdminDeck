// back/prisma/seed.ts

import { PrismaClient, ProductsStatus, OrderStatus, PaymentStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando el proceso de Seed (Semillas)...');

    // 1. Limpiar base de datos (Borrar datos viejos para no duplicar)
    await prisma.orderItem.deleteMany();
    await prisma.orderHistory.deleteMany();
    await prisma.order.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    console.log('Base de datos limpiada.');

    // 2. Crear Usuario Admin
    const user = await prisma.user.create({
        data: {
            email: 'admin@admindeck.com',
            password: '123', // En un caso real esto iría hasheado
            name: 'Admin Principal',
        },
    });

    // 3. Crear Categorías (Padres e Hijos)
    const catRopa = await prisma.category.create({
        data: { name: 'Ropa', position: 1 },
    });

    const catCalzado = await prisma.category.create({
        data: { name: 'Calzado', position: 2 },
    });

    const catCamisetas = await prisma.category.create({
        data: { name: 'Camisetas', parentId: catRopa.id, position: 1 },
    });

    const catPantalones = await prisma.category.create({
        data: { name: 'Pantalones', parentId: catRopa.id, position: 2 },
    });

    // 4. Crear Productos
    // Producto 1: Camiseta
    const p1 = await prisma.product.create({
        data: {
            name: 'Camiseta Básica Oversize',
            description: 'Camiseta de algodón 100% estilo urbano.',
            status: ProductsStatus.ACTIVE,
            gender: 'Unisex',
            categoryId: catCamisetas.id,
            variants: {
                create: [
                    { optionName: 'Talla', optionValue: 'M', price: 25.00, stock: 10 },
                    { optionName: 'Talla', optionValue: 'L', price: 25.00, stock: 5 },
                ],
            },
        },
    });

    // Producto 2: Pantalón
    const p2 = await prisma.product.create({
        data: {
            name: 'Jean Slim Fit Negro',
            description: 'Pantalón vaquero elástico.',
            status: ProductsStatus.ACTIVE,
            gender: 'Hombre',
            categoryId: catPantalones.id,
            variants: {
                create: [
                    { optionName: 'Talla', optionValue: '30', price: 45.50, stock: 20 },
                    { optionName: 'Talla', optionValue: '32', price: 45.50, stock: 15 },
                ],
            },
        },
    });

    // Producto 3: Zapatillas
    const p3 = await prisma.product.create({
        data: {
            name: 'Runner Pro 2025',
            description: 'Zapatillas deportivas de alto rendimiento.',
            status: ProductsStatus.ACTIVE,
            gender: 'Mujer',
            categoryId: catCalzado.id,
            variants: {
                create: [
                    { optionName: 'Talla', optionValue: '37', price: 89.99, stock: 8 },
                ],
            },
        },
    });

    // 5. Crear Ventas (Órdenes)
    // Venta 1: Completada
    await prisma.order.create({
        data: {
            orderNumber: 'ORD-001',
            clientName: 'Juan Pérez',
            clientEmail: 'juan@gmail.com',
            totalAmount: 70.50,
            status: OrderStatus.DELIVERED,
            paymentStatus: PaymentStatus.PAID,
            items: {
                create: [
                    { productId: p1.id, quantity: 1, price: 25.00 },
                    { productId: p2.id, quantity: 1, price: 45.50 },
                ],
            },
            history: {
                create: [
                    { status: OrderStatus.PENDING, note: 'Orden creada' },
                    { status: OrderStatus.PAID, note: 'Pago recibido' },
                    { status: OrderStatus.DELIVERED, note: 'Entregado al cliente' },
                ],
            },
        },
    });

    // Venta 2: Pendiente
    await prisma.order.create({
        data: {
            orderNumber: 'ORD-002',
            clientName: 'Maria Lopez',
            clientEmail: 'maria@hotmail.com',
            totalAmount: 89.99,
            status: OrderStatus.PENDING,
            paymentStatus: PaymentStatus.PENDING,
            items: {
                create: [
                    { productId: p3.id, quantity: 1, price: 89.99 },
                ],
            },
            history: {
                create: [
                    { status: OrderStatus.PENDING, note: 'Esperando pago' },
                ],
            },
        },
    });

    console.log('Seed completado exitosamente.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });