/*/import { IsNotEmpty, IsEmpty, IsMongoId, isMongoId } from 'class-validator';
import { User } from 'src/auth/user.schema';
import { Resale } from 'src/resale/resale.model';

export class CreateBookMarkDto {
  @IsEmpty()
  readonly userId: User;

  @IsNotEmpty()
  readonly propertyId: Resale;

}
/*/
