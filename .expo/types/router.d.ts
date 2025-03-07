/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/LessonScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screen/QuizScreen`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/challenge` | `/challenge`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/dictionary` | `/dictionary`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/home` | `/home`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/learn` | `/learn`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/QuizScreen` | `/QuizScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screen/communicate`; params?: Router.UnknownInputParams; } | { pathname: `/screen/home`; params?: Router.UnknownInputParams; } | { pathname: `/screen/homescreen`; params?: Router.UnknownInputParams; } | { pathname: `/screen/ModuleScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screen/Record`; params?: Router.UnknownInputParams; } | { pathname: `/screen/ResultScreen`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/LessonScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screen/QuizScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/challenge` | `/challenge`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/dictionary` | `/dictionary`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/home` | `/home`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/learn` | `/learn`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tabs)'}/QuizScreen` | `/QuizScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screen/communicate`; params?: Router.UnknownOutputParams; } | { pathname: `/screen/home`; params?: Router.UnknownOutputParams; } | { pathname: `/screen/homescreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screen/ModuleScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/screen/Record`; params?: Router.UnknownOutputParams; } | { pathname: `/screen/ResultScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/LessonScreen${`?${string}` | `#${string}` | ''}` | `/screen/QuizScreen${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/challenge${`?${string}` | `#${string}` | ''}` | `/challenge${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/dictionary${`?${string}` | `#${string}` | ''}` | `/dictionary${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/home${`?${string}` | `#${string}` | ''}` | `/home${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/learn${`?${string}` | `#${string}` | ''}` | `/learn${`?${string}` | `#${string}` | ''}` | `${'/(tabs)'}/QuizScreen${`?${string}` | `#${string}` | ''}` | `/QuizScreen${`?${string}` | `#${string}` | ''}` | `/screen/communicate${`?${string}` | `#${string}` | ''}` | `/screen/home${`?${string}` | `#${string}` | ''}` | `/screen/homescreen${`?${string}` | `#${string}` | ''}` | `/screen/ModuleScreen${`?${string}` | `#${string}` | ''}` | `/screen/Record${`?${string}` | `#${string}` | ''}` | `/screen/ResultScreen${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/LessonScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screen/QuizScreen`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/challenge` | `/challenge`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/dictionary` | `/dictionary`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/home` | `/home`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/learn` | `/learn`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tabs)'}/QuizScreen` | `/QuizScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screen/communicate`; params?: Router.UnknownInputParams; } | { pathname: `/screen/home`; params?: Router.UnknownInputParams; } | { pathname: `/screen/homescreen`; params?: Router.UnknownInputParams; } | { pathname: `/screen/ModuleScreen`; params?: Router.UnknownInputParams; } | { pathname: `/screen/Record`; params?: Router.UnknownInputParams; } | { pathname: `/screen/ResultScreen`; params?: Router.UnknownInputParams; } | `/+not-found` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
    }
  }
}
