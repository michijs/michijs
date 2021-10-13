import { LSRoute } from '../components/LSRoute';
import { EmptyObject, FC, GetElementProps } from '../types';

export type ComponentFunction<S extends { [key: string]: any } = undefined, H extends `#${string}` | '' = undefined> = (searchParamsAndHash?: { searchParams?: S, hash?: { [k in H]?: boolean } }) => JSX.Element;
export type UrlFunction<S extends { [key: string]: any } = undefined, H extends `#${string}` | '' = undefined> = (searchParamsAndHash?: { searchParams?: S, hash?: H }) => URL;

export type CommonRouteProps = {
    title?: string,
    // preserveState?: boolean,
}

export type SyncRoute = {
    component?: JSX.Element,
} & CommonRouteProps

export type AsyncRoute<O extends object = EmptyObject> = {
    promise: () => Promise<O>,
    key: keyof O,
    loadingComponent?: JSX.Element
} & CommonRouteProps

export type RedirectRoute = {
    redirectTo?: string,
}

export type Route<O extends object = EmptyObject> = SyncRoute | RedirectRoute | AsyncRoute<O>;
export type CreateRouteResult<S extends { [key: string]: any } = undefined, H extends `#${string}` | '' = undefined> = Route & {
    componentFn: ComponentFunction<S, H>,
    urlFn: UrlFunction<S, H>
}

export type Routes = {
    [routeName: string]: CreateRouteResult
}

export type registerRoutesReturnType<T extends Routes> = {
    urls: {
        [k in keyof T]: T[k]['urlFn']
    },
    Router: FC<GetElementProps<typeof LSRoute>>,
    components: {
        [k in keyof T]: (fn: T[k]['componentFn']) => () => JSX.Element
    }
}