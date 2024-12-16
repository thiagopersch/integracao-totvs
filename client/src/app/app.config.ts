import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from "@angular/common/http";
import { MatPaginatorIntl } from "@angular/material/paginator";
import {
  provideClientHydration,
  withEventReplay,
} from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { routes } from "./app.routes";
import { LoadingInterceptor } from "./components/loading/loading.interceptor";
import { getPtBrPaginatorIntl } from "./components/table/paginator-pt-br";
import { AuthInterceptor } from "./services/auth/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: MatPaginatorIntl, useValue: getPtBrPaginatorIntl() },
  ],
};
