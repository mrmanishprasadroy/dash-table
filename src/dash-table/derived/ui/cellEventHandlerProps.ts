
import { memoizeOneFactory } from 'core/memoizer';
import { ICellFactoryOptions } from 'dash-table/components/Table/props';
import cellEventHandler, { Handler } from 'dash-table/derived/ui/cellEventHandler';
import { ICellHandlerProps } from 'dash-table/components/CellInput/props';

type CacheArgs = [number, number];

export type CacheFn = (...args: CacheArgs) => ICellHandlerProps;
export type HandlerFn = (...args: any[]) => any;

const getter = (propsFn: () => ICellFactoryOptions): CacheFn => {
    const derivedHandlers = cellEventHandler()(propsFn);

    return (...args: CacheArgs) => {
        let [
            rowIndex,
            columnIndex
        ] = args;

        return {
            onChange: derivedHandlers(Handler.Change, rowIndex, columnIndex),
            onClick: derivedHandlers(Handler.Click, rowIndex, columnIndex),
            onDoubleClick: derivedHandlers(Handler.DoubleClick, rowIndex, columnIndex),
            onPaste: derivedHandlers(Handler.Paste, rowIndex, columnIndex)
        } as ICellHandlerProps;
    };
};

export default memoizeOneFactory(getter);