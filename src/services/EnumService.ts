import React from 'react';
import {Model} from 'react3l/core';
import {commonService} from 'react3l/services/common-service';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

export const enumService = {
  useEnumList<T extends Model>(
    getList: () => Observable<T[]>,
  ): [
    T[],
    boolean,
  ] {
    const [subscription] = commonService.useSubscription();

    const [loading, , handleTurnOnLoading, handleTurnOffLoading] = commonService.useBooleanState(false);

    const [enumList, setEnumList] = React.useState<T[]>([]);

    React.useEffect(
      () => {
        handleTurnOnLoading();
        subscription
          .add(
            getList()
              .pipe(
                finalize(
                  () => {
                    handleTurnOffLoading();
                  },
                ),
              )
              .subscribe((list) => {
                setEnumList(list);
              }),
          );
      },
      [getList, handleTurnOffLoading, handleTurnOnLoading, subscription],
    );

    return [enumList, loading];
  },
};
