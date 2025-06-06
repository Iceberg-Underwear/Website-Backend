import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(RolesGuard)
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    async getAllProducts() {
        return this.productService.getProducts();
    }

    @Get(":productId")
    async getProduct(@Param("productId") productId: string) {
        return this.productService.getProductById(productId);
    }

    @Post()
    @Roles("admin")
    async createProduct(@Body() body: {name: string, price: number, description: string, sizes: string, colors: string, images: { url: string; altText: string }[]}) {
        return this.productService.createProduct(body);
    }

    @Put()
    @Roles("admin")
    async editProduct(@Body() body: {id: string, name: string, price: number, description: string, sizes: string, colors: string, images: { url: string; altText: string }[]}) {
        return this.productService.editProduct(body);
    }

    @Delete(":productId")
    @Roles("admin")
    async deleteProduct(@Param("productId") productId: string) {
        return this.productService.deleteProduct(productId);
    }
}
