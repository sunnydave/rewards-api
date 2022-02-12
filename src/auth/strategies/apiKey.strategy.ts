import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private authService: AuthService) {
    super(
      {
        header: 'X-REWARDS-API-SECRET',
        prefix: '',
      },
      true,
      async (apiSecret, done, request) => {
        const apiKey = request.header('X-REWARDS-API-KEY');
        return this.validate(apiKey, apiSecret, done);
      },
    );
  }

  public validate = async (apiKey: string, apiSecret: string, done) => {
    const { isValid, tenantId } = await this.authService.validateApiKey(
      apiKey,
      apiSecret,
    );
    if (isValid) {
      done(null, tenantId);
    }
    done(new UnauthorizedException(), null);
  };
}
