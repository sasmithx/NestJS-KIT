import { ExecutionContext, Injectable } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Reflector } from '@nestjs/core';
import { NO_CACHE_KEY } from '../../decorator/no-cache/no-cache.decorator';

@Injectable()
export class ApiCacheInterceptor extends CacheInterceptor {
  constructor(
    protected readonly cacheManager: any,
    protected readonly reflector: Reflector,
  ) {
    super(cacheManager, reflector);
  }

  protected isRequestCacheable(context: ExecutionContext): boolean {
    const noCache = this.reflector.getAllAndOverride<boolean>(NO_CACHE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (noCache) return false;
    return super.isRequestCacheable(context);
  }
}
