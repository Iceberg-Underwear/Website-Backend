import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { ProductService } from './product.service';

@Controller('product')
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

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("admin")
    @Post()
    async createProduct(@Body() body: {name: string, price: number, description: string, sizes: string, colors: string, images: { url: string; altText: string }[], tags: string}) {
        return this.productService.createProduct(body);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("admin")
    @Put()
    async editProduct(@Body() body: {id: string, name: string, price: number, description: string, sizes: string, colors: string, images: { url: string; altText: string }[], tags: string}) {
        return this.productService.editProduct(body);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("admin")
    @Delete(":productId")
    async deleteProduct(@Param("productId") productId: string) {
        return this.productService.deleteProduct(productId);
    }
}
