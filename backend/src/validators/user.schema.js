const { z } = require('zod');

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
});

module.exports = {
  createUserSchema,
};