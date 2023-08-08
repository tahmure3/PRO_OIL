import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  UseGuards,
  Query,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  UseInterceptors,
  UploadedFiles,
  Req,
  HttpException,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import {
  AddProductGuard,
  AddRoleGuard,
  AdminGuard,
  FindUsersGuard,
} from './guard/admin.guard';
import { FindUsersQuery } from './DTO/get-users.dto';
import {
  ParseChangeRolePipe,
  ParseFindUsersPipe,
  ParseIntAddProductPipe,
} from './pipe/admin.pipe';
import { ChangeRoleBody } from './DTO/add-role.dto';
import {
  IFindUsersReturnDTO,
  IGetUsersReturnDTO,
} from './interface/return.interface';
import { JoiValidationPipe } from 'src/viewer/pipe/viewer.pipe';
import { changeRoleSchema } from './schema/change-role.schema';
import { addProductSchema } from './schema/product.schema';
import { AddProductBody } from './DTO/add-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FormatImageEnum } from 'src/common/enum/format-image.enum';
import { extname } from 'path';
import { diskStorage } from 'multer';
const path = require('path');
@ApiTags('admin')
// @UseGuards(AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Post('add-product')
  @UseGuards(AddProductGuard)
  @UsePipes(new JoiValidationPipe(addProductSchema))
  @UsePipes(new ParseIntAddProductPipe())
  addProduct(@Body() addProductBody: AddProductBody) {
    return this.adminService.addProduct(addProductBody);
  }

  @Post('answer-ticket')
  answerTicket() {}

  @Put('edit-product')
  editProduct() {}

  @Put('add-company')
  addCompany(@Body() company) {
    return this.adminService.addCompany(company);
  }

  @Put('change-role')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(AddRoleGuard)
  @UsePipes(new JoiValidationPipe(changeRoleSchema))
  @UsePipes(new ParseChangeRolePipe())
  addRole(@Body() addRoleBody: ChangeRoleBody) {
    return this.adminService.changeRoles(addRoleBody);
  }
  // Object.values(FormatImageEnum).includes(
  //   path.extname(file.originalname).toLowerCase().split('.')[1],
  // )

  // diskStorage({
  //   destination: './files',
  //   filename: function (req, file, cb) {
  //     const uniqueSuffix =
  //       Date.now() + '-' + Math.round(Math.random() * 1e9);
  //     const ext = extname(file.originalname);
  //     const filename = `${filename.originalname}-${uniqueSuffix}${ext}`
  //   },
  // }),

  @Put('upload-img-product')
  @UseInterceptors(
    FilesInterceptor('imagesPro', 5, {
      storage: diskStorage({
        destination: 'public/images/product/',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
          cb(null, filename);
        },
      }),
    }),
  )
  uploadImageProduct(
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/png|image/jpeg',
        })
        .build({
          fileIsRequired: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    imagesPro: Array<Express.Multer.File>,
    @Query() a, @Body() body
  ) {
    console.log(imagesPro)
    return
  }

  @Get('get-users')
  getUsers(): Promise<IGetUsersReturnDTO> {
    return this.adminService.getUsers();
  }

  @Get('find-users')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(FindUsersGuard)
  findUsers(
    @Query('', ParseFindUsersPipe) findUsersQuery: FindUsersQuery,
  ): Promise<IFindUsersReturnDTO> {
    return this.adminService.findUsers(findUsersQuery);
  }

  @Get('get-sales')
  getSales() {}

  @Delete('delete-product')
  deleteProduct() {}
}
