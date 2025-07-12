import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface ProductInput {
  name: string;
  price: number;
  description: string;
  sizes: string;
  colors: string;
  images?: { url: string; altText: string }[];
  tags: string;
  amount: number;
}

interface ProductUpdateInput extends ProductInput {
  id: string;
}

interface ProductNoImage {
  id: string;
  name: string;
  price: number;
  description: string;
  sizes: string;
  colors: string;
  tags: string;
  amount: number;
}


@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(product: ProductInput) {
    return this.prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        description: product.description,
        sizes: product.sizes,
        colors: product.colors,
        images: product.images
          ? {
              create: product.images.map((image) => ({
                url: image.url,
                altText: image.altText,
              })),
            }
          : undefined,
        tags: product.tags,
        amount: product.amount
      },
      include: { images: true },
    });
  }

  async editProductImages(product: ProductUpdateInput) {
    // remove existing images
    await this.prisma.productImage.deleteMany({
      where: { productId: product.id },
    });

    return this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        name: product.name,
        price: product.price,
        description: product.description,
        sizes: product.sizes,
        colors: product.colors,
        images: {
          create: product.images?.map(image => ({
            url: image.url,
            altText: image.altText,
          })) || [],
        },
        tags: product.tags,
        amount: product.amount
      },
      include: { images: true },
    });
  }

  async editProduct(product: ProductNoImage) {

    return this.prisma.product.update({
      where: {
        id: product.id,
      },
      data: {
        name: product.name,
        price: product.price,
        description: product.description,
        sizes: product.sizes,
        colors: product.colors,
        tags: product.tags,
        amount: product.amount
      },
      include: { images: true },
    });
  }

  async getProducts() {
    return this.prisma.product.findMany({
      include: { images: true },
    });
  }

  async deleteProduct(productId: string) {
    return this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }

  async getProductById(productId: string) {
    return this.prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: { images: true },
    });
  }
}
