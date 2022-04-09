/* eslint-disable import/prefer-default-export */
import { Platform } from 'react-native';

export function createShadow(color: string) {
  return (
    Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: color,
        shadowOffset: { height: 2, width: 2 },
        shadowOpacity: 1,
        shadowRadius: 1,
        elevation: 4,
      },
    })
  );
}
