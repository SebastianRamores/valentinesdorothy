
import { z } from 'zod';
import { insertResponseSchema, responses } from './schema';

export const api = {
  response: {
    create: {
      method: 'POST' as const,
      path: '/api/response' as const,
      input: insertResponseSchema,
      responses: {
        201: z.custom<typeof responses.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    getStats: {
      method: 'GET' as const,
      path: '/api/response/stats' as const,
      responses: {
        200: z.array(z.custom<typeof responses.$inferSelect>()),
      },
    },
  },
};
