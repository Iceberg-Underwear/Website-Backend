import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
    constructor(private prisma: PrismaService) {}

    async createProduct(product: {name: string, price: number, description: string, sizes: string, colors: string}) {
        return this.prisma.product.create({
            data: {
                name: product.name,
                price: product.price,
                description: product.description,
                sizes: product.sizes,
                colors: product.colors
            }
        })
    }

    async editProduct(product: {id: string, name: string, price: number, description: string, sizes: string, colors: string}) {
        return this.prisma.product.update(
            {
            where: {
                id: product.id
            },
            data: {
                name: product.name,
                price: product.price,
                description: product.description,
                sizes: product.sizes,
                colors: product.colors
            }
        })
    }

    async getProducts() {
        return this.prisma.product.findMany();
    }

    async deleteProduct(productId: string) {
        return this.prisma.product.delete({
            where: {
                id: productId
            }
        })
    }

    async getProductById(productId: string) {
        return this.prisma.product.findUnique({
            where: {
                id: productId
            }
        })
    }
}
