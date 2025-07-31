// Mock implementation of bcrypt-ts for testing

export const hash = jest.fn().mockResolvedValue('$2b$10$mockHashValue');
export const compare = jest.fn().mockResolvedValue(true);
export const genSalt = jest.fn().mockResolvedValue('$2b$10$mockSaltValue');
export const hashSync = jest.fn().mockReturnValue('$2b$10$mockHashValue');
export const compareSync = jest.fn().mockReturnValue(true);
export const genSaltSync = jest.fn().mockReturnValue('$2b$10$mockSaltValue');
export const getRounds = jest.fn().mockReturnValue(10);
export const getSalt = jest.fn().mockReturnValue('$2b$10$mockSaltValue');