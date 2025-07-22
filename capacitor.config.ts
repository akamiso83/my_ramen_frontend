import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.delica',
  appName: 'delica_mobile',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    // 参考：https://github.com/capacitor-community/sqlite/tree/master
    CapacitorSQLite: {
      androidIsEncryption: true,
      androidBiometric: {
        biometricAuth: false,
        // biometricTitle : "Biometric login for capacitor sqlite",
        // biometricSubTitle : "Log in using your biometric"
      },
    },
  },
};

export default config;
