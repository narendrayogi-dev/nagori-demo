import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import { RootStackParamList } from './utils';


export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();


export function navigate(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never, params as never);
  }
}

export function replace(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.replace(name, params)
    );
  }
}

export function push(name: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      StackActions.push(name, params)
    );
  }
}

export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}


export function reset(routeName: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName, params }],
      })
    );
  }
}

export function resetToHome() {
  reset('Home');
}

/* ---------------------------------- */
/* Tab helpers                        */
/* ---------------------------------- */

export function jumpTo(tabName: string) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.navigate({
        name: tabName,
      })
    );
  }
}

/* ---------------------------------- */
/* Utility helpers                    */
/* ---------------------------------- */

export function getCurrentRouteName(): string | undefined {
  if (navigationRef.isReady()) {
    return navigationRef.getCurrentRoute()?.name;
  }
  return undefined;
}

export function isCurrentRoute(routeName: string): boolean {
  return getCurrentRouteName() === routeName;
}



export function navigateIfNotCurrent(
  routeName: string,
  params?: object
) {
  if (!isCurrentRoute(routeName)) {
    navigate(routeName, params);
  }
}


