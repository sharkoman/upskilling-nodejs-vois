// Mock implementation of mongoose for testing

interface MockSchemaInstance {
  add: jest.MockedFunction<any>;
  index: jest.MockedFunction<any>;
  plugin: jest.MockedFunction<any>;
  pre: jest.MockedFunction<any>;
  post: jest.MockedFunction<any>;
  virtual: jest.MockedFunction<any>;
  set: jest.MockedFunction<any>;
}

interface MockSchemaTypes {
  ObjectId: string;
  String: string;
  Number: string;
  Date: string;
  Buffer: string;
  Boolean: string;
  Mixed: string;
  Array: string;
}

const mockSchema = jest.fn().mockImplementation((): MockSchemaInstance => ({
  add: jest.fn(),
  index: jest.fn(),
  plugin: jest.fn(),
  pre: jest.fn(),
  post: jest.fn(),
  virtual: jest.fn(),
  set: jest.fn()
}));

// Add Schema.Types.ObjectId
(mockSchema as any).Types = {
  ObjectId: 'ObjectId',
  String: 'String',
  Number: 'Number',
  Date: 'Date',
  Buffer: 'Buffer',
  Boolean: 'Boolean',
  Mixed: 'Mixed',
  Array: 'Array'
};

interface MockMongoose {
  connect: jest.MockedFunction<any>;
  disconnect: jest.MockedFunction<any>;
  connection: {
    readyState: number;
  };
  Schema: typeof mockSchema;
  model: jest.MockedFunction<any>;
}

const mongoose: MockMongoose = {
  connect: jest.fn().mockResolvedValue({}),
  disconnect: jest.fn().mockResolvedValue({}),
  connection: {
    readyState: 1
  },
  Schema: mockSchema,
  model: jest.fn()
};

export default mongoose;