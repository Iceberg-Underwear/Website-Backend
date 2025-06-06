import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { OrderService } from './order.service';
  import { JwtAuthGuard } from 'src/auth/jwt.guard';
  import { Roles } from 'src/auth/roles/roles.decorator';
  import { RolesGuard } from 'src/auth/roles/roles.guard';
  
  @Controller('orders')
  @UseGuards(RolesGuard)
  export class OrderController {
    constructor(private orderService: OrderService) {}
  
    @Post()
    async createOrder(
      @Request() req,
      @Body()
      body: {
        phone: string;
        shippingAddress: string;
        productIds: string[];
      },
    ) {
      return this.orderService.createOrder({
        userId: req.user.userId,
        phone: body.phone,
        shippingAddress: body.shippingAddress,
        productIds: body.productIds,
      });
    }
  
    @Get(':id')
    async getUserOrders(@Param("id") id: string) {
      return this.orderService.getOrdersByUser(id);
    }
  
    @Get()
    @Roles('admin')
    async getAllOrders() {
      return this.orderService.getAllOrders();
    }
  
    @Get(':orderId')
    async getOrder(@Param('orderId') orderId: string) {
      return this.orderService.getOrderById(orderId);
    }
  
    @Put(':orderId/status')
    @Roles('admin')
    async updateStatus(
      @Param('orderId') orderId: string,
      @Body('status') status: string,
    ) {
      return this.orderService.updateOrderStatus(orderId, status);
    }
  
    @Delete(':orderId')
    @Roles('admin')
    async deleteOrder(@Param('orderId') orderId: string) {
      return this.orderService.deleteOrder(orderId);
    }
  }
  