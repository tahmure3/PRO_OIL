import { Controller, Put, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('member')
@Controller('member')
export class MemberController {
    @Put('change-password')
    changePassword() {}

    @Get('get-products')
    getProducts() {}

    @Get('search-products')
    searchProducts() {}
}
