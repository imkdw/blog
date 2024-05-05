import { applyDecorators, UseGuards } from '@nestjs/common';
import AdminGuard from '../guards/admin.guard';
import { Roles } from './roles.decorator';
import { UserRoles } from '../../user/enums/user-role.enum';

const Admin = () => applyDecorators(UseGuards(AdminGuard), Roles(UserRoles.ADMIN));

export default Admin;
