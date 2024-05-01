import { applyDecorators, UseGuards } from '@nestjs/common';
import AdminGuard from '../guards/admin.guard';
import { Roles } from './roles.decorator';
import { UserRole } from '../../user/enums/user-role.enum';

const Admin = () => applyDecorators(UseGuards(AdminGuard), Roles(UserRole.ADMIN));

export default Admin;
