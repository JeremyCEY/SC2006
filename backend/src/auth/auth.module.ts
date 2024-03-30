import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './auth.constant';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { BookmarkService } from 'src/bookmark v2/bookmark.service';
import { BookmarkController } from 'src/bookmark v2/bookmark.controller';
import { FrequentAddressController } from 'src/frequentaddress/frequentaddress.controller';
import { FrequentAddressService } from 'src/frequentaddress/frequentaddress.service';


@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      global:true,
      secret: jwtConstants.secret,
      signOptions:{expiresIn: jwtConstants.expire},
    })

  ],
  controllers: [AuthController, BookmarkController, FrequentAddressController],
  providers: [AuthService, JwtStrategy, BookmarkService, FrequentAddressService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
