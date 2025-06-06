import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createOrder(data: {
    userId: string;
    phone: string;
    shippingAddress: string;
    productIds: string[];
  }) {
    const totalPrice = await this.calculateTotalPrice(data.productIds);

    const order = await this.prisma.order.create({
      data: {
        userId: data.userId,
        phone: data.phone,
        shippingAddress: data.shippingAddress,
        status: 'pending',
        price: totalPrice,
        products: {
          create: data.productIds.map((productId) => ({
            Product: { connect: { id: productId } },
          })),
        },
      },
      include: {
        products: {
          include: { Product: true },
        },
      },
    });

    return order;
  }

  async getOrdersByUser(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        products: {
          include: { Product: true },
        },
      },
    });
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        products: {
          include: { Product: true },
        },
        user: true,
      },
    });
  }

  async getOrderById(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        products: {
          include: { Product: true },
        },
        user: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrderStatus(orderId: string, status: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: status },
    });
  }

  async deleteOrder(orderId: string) {
    return this.prisma.order.delete({
      where: { id: orderId },
    });
  }

  private async calculateTotalPrice(productIds: string[]): Promise<number> {
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    return products.reduce((sum, product) => sum + product.price, 0);
  }
}
