import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}

  load(isLoadingAsync: any, loadStartStop: (status: boolean) => void) {
    const promise = this.getPromiseFromInput(isLoadingAsync);
    this.startLoading(
      promise,
      () => loadStartStop(true),
      () => loadStartStop(false)
    );
  }

  private startLoading(
    promise: Promise<void>,
    loadStart: () => void,
    loadStop: () => void
  ): void {
    loadStart();
    if (promise.finally) {
      promise.finally(loadStop);
    } else {
      promise.then(loadStop).catch(loadStop);
    }
  }

  private getPromiseFromInput(isLoadingAsync: any): any {
    if (isLoadingAsync instanceof Observable) {
      throw new TypeError(
        'O valor para "Loading" deve ser uma instância de Subscription e não um Observable'
      );
    } else if (isLoadingAsync instanceof Subscription) {
      return new Promise<void>((resolve) => {
        (isLoadingAsync as Subscription).add(resolve);
      });
    } else if (this.isObjectAPromise(isLoadingAsync)) {
      return isLoadingAsync;
    }
  }

  private isObjectAPromise(promise: any): boolean {
    return (
      promise instanceof Promise ||
      (promise !== null &&
        typeof promise === 'object' &&
        typeof promise.then === 'function' &&
        typeof promise.catch === 'function')
    );
  }
}
