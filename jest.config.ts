// 型定義のインポート
import { Config } from '@jest/types';

// オプションを設定
const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  testEnvironment: 'jsdom',
  collectCoverage: true,
};

// 設定を default エクスポートします
export default config;
