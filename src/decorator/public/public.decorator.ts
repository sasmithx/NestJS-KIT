import { SetMetadata } from '@nestjs/common';

export const PUBLIC_DEC_KEY = 'public';
export const Public = () => SetMetadata(PUBLIC_DEC_KEY, true);
