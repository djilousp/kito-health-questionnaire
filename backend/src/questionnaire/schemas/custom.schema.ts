import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const objectIdSchema = z
  .string()
  .refine((value) => ObjectId.isValid(value), {
    message: 'Invalid ObjectId',
  });
