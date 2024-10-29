import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy'; // Import the JWT strategy
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // Your JWT Guard

@Module({
  imports: [
    PassportModule, // Register the JWT strategy
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use the same secret as the strategy
      signOptions: { expiresIn: '60m' }, // Token expiration settings
    }),
  ],
  providers: [JwtStrategy], // Register JwtStrategy here
  //exports: [AuthService], // Export AuthService if needed
})
export class AuthModule {}
