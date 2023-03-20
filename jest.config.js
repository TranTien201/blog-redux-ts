module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  // Thêm phần này
  moduleDirectories: [
    'node_modules',
    // Thêm đường dẫn của thư mục chứa component của bạn vào đây
    'src'
  ]
}
