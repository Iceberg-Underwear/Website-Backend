import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @Roles("admin")
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Delete(":userId")
    @Roles("admin")
    async deleteUser(@Param('userId')  userId : string) {
        return this.userService.deleteUser(userId);
    }
}
