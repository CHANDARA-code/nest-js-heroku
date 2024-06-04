import { PartialType } from '@nestjs/swagger';
import { CreateFirebaseAdminDto } from './create-firebase-admin.dto';

export class UpdateFirebaseAdminDto extends PartialType(CreateFirebaseAdminDto) {}
