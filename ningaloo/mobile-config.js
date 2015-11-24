App.accessRule("blob:*");
App.info({
  name: 'Ningaloo',
  description: 'Tracking turtle nests one at a time.',
  author: 'TurtleTown',
  email: 'aviocollective@gmail.com',
  website: 'http://aviocollective.com',
  version: '0.0.1'
});

App.icons({
  'iphone': 'resources/icons/icon-120x120.png',
  'iphone_2x': 'resources/icons/icon-120x120@2x.png',
  'iphone_3x': 'resources/icons/icon-120x120@3x.png',
});

App.launchScreens({
  'iphone_2x': 'resources/splash/splash-640x960@2x.png',
  'iphone5': 'resources/splash/splash-640x1136@2x.png',
  'iphone6': 'resources/splash/splash-750x1334@2x.png',
  'iphone6p_portrait': 'resources/splash/splash-1242x2208@3x.png',
});

App.setPreference('StatusBarOverlaysWebView', true);
App.setPreference('StatusBarStyle', 'default');
App.setPreference('StatusBarBackgroundColor', '#00000');

// App.icons({
  // iOS
  // 'iphone': 'resources/icons/icon-60x60.png',
  // 'iphone_2x': 'resources/icons/icon-60x60@2x.png',
  // 'ipad': 'resources/icons/icon-76x76.png',
  // 'ipad_2x': 'resources/icons/icon-76x76@2x.png',

  // Android
  // 'android_ldpi': 'resources/icons/icon-36x36.png',
  // 'android_mdpi': 'resources/icons/icon-48x48.png',
  // 'android_hdpi': 'resources/icons/icon-72x72.png',
  // 'android_xhdpi': 'resources/icons/icon-96x96.png'
// });

// App.launchScreens({
  // iOS
  // 'iphone': 'resources/splash/splash-320x480.png',
  // 'iphone_2x': 'resources/splash/splash-320x480@2x.png',
  // 'iphone5': 'resources/splash/splash-320x568@2x.png',
  // 'ipad_portrait': 'resources/splash/splash-768x1024.png',
  // 'ipad_portrait_2x': 'resources/splash/splash-768x1024@2x.png',
  // 'ipad_landscape': 'resources/splash/splash-1024x768.png',
  // 'ipad_landscape_2x': 'resources/splash/splash-1024x768@2x.png',

//   // Android
//   'android_ldpi_portrait': 'resources/splash/splash-200x320.png',
//   'android_ldpi_landscape': 'resources/splash/splash-320x200.png',
//   'android_mdpi_portrait': 'resources/splash/splash-320x480.png',
//   'android_mdpi_landscape': 'resources/splash/splash-480x320.png',
//   'android_hdpi_portrait': 'resources/splash/splash-480x800.png',
//   'android_hdpi_landscape': 'resources/splash/splash-800x480.png',
//   'android_xhdpi_portrait': 'resources/splash/splash-720x1280.png',
//   'android_xhdpi_landscape': 'resources/splash/splash-1280x720.png'
// });