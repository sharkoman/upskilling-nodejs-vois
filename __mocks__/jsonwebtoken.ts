// Mock implementation of jsonwebtoken for testing

export const sign = jest.fn().mockReturnValue('mock.jwt.token');
export const verify = jest.fn().mockReturnValue({ 
  id: '507f1f77bcf86cd799439011', 
  email: 'test@example.com' 
});
export const decode = jest.fn().mockReturnValue({ 
  id: '507f1f77bcf86cd799439011', 
  email: 'test@example.com' 
});

// Default export for compatibility
const jwt = { sign, verify, decode };
export default jwt;