declare module 'react-native-config' {
  export interface NativeConfig {
    GOOGLE_MAPS_API_KEY?: string;
    API_URL?: string;
    APP_NAME?: string;
    VERSION_CODE?: string;
    APP_ID?: string;
    NODE_ENV?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
