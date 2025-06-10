//const { getDefaultConfig } = require('@expo/metro-config');

import { getDefaultConfig } from '@expo/metro-config';


const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
