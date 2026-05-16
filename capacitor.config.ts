import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ustad.orchestrator',
  appName: 'Ustad',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
