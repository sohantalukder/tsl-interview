# 🗺️ Google Maps Setup Guide

## Issue Fix: "Unimplemented component: <RNMapsGoogleMapView>"

This error occurs because Google Maps API key is not configured. Follow these steps to fix it:

## 📱 Android Setup

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **Maps SDK for Android** API
4. Create credentials → API Key
5. Restrict the API key to Android apps (recommended)
6. Add your app's package name: `com.tslinterview`
7. Add your debug SHA-1 fingerprint

### 2. Get Debug SHA-1 Fingerprint

```bash
cd android
./gradlew signingReport
```

Look for the SHA1 fingerprint under `Variant: debug` and copy it.

### 3. Configure API Key

Replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` in `android/app/src/main/res/values/strings.xml` with your actual API key:

```xml
<resources>
    <string name="app_name">TSLInterview</string>
    <string name="google_maps_key">AIzaSyC4YourActualAPIKeyHere</string>
</resources>
```

## 🍎 iOS Setup (Optional - for Google Maps)

If you want to use Google Maps on iOS (currently using Apple Maps):

1. Add your iOS bundle ID to the same API key in Google Cloud Console
2. Enable **Maps SDK for iOS**
3. Add to `ios/TSLInterview/Info.plist`:

```xml
<key>GMSApiKey</key>
<string>AIzaSyC4YourActualAPIKeyHere</string>
```

## 🚀 After Setup

1. Clean and rebuild:

```bash
# Android
cd android && ./gradlew clean && cd ..
npx react-native run-android

# iOS
cd ios && rm -rf build && cd ..
npx react-native run-ios
```

## 🔄 Alternative: Use Platform Default Maps

If you prefer not to use Google Maps, the current implementation will use:

- **Android**: OpenStreetMap (default react-native-maps)
- **iOS**: Apple Maps (default react-native-maps)

This should work without API keys, but with limited styling options.

## 🆘 Troubleshooting

If you still get the error:

1. Make sure react-native-maps is properly installed:

```bash
npm ls react-native-maps
```

2. Clear Metro cache:

```bash
npx react-native start --reset-cache
```

3. For Android, make sure Google Play Services is available on your device/emulator

4. Check that the API key has the correct restrictions and the Maps SDK is enabled

## 📝 Current Configuration

The app is configured with:

- ✅ Location permissions (Android & iOS)
- ✅ react-native-maps integration
- ✅ Google Play Services dependency
- ✅ API key placeholder (needs real key)
- ✅ Fallback to platform default maps
