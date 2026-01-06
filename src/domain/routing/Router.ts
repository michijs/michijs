export interface Route {
  path: string;
  name: string;
}

export class RouterDomain {
  private routes: Map<string, Route> = new Map();

  addRoute(name: string, path: string): void {
    this.routes.set(name, { name, path });
  }

  getRoute(name: string): Route | undefined {
    return this.routes.get(name);
  }

  matchPath(pathname: string): Route | null {
    for (const route of Array.from(this.routes.values())) {
      if (this.pathMatches(route.path, pathname)) {
        return route;
      }
    }
    return null;
  }

  private pathMatches(routePath: string, currentPath: string): boolean {
    // Simple path matching - could be enhanced with param support
    return routePath === currentPath;
  }

  buildUrl(routeName: string, params?: Record<string, string>): string {
    const route = this.routes.get(routeName);
    if (!route) return "/";

    let url = route.path;
    if (params) {
      // Simple param replacement - could be enhanced
      Object.entries(params).forEach(([key, value]) => {
        url = url.replace(`:${key}`, value);
      });
    }
    return url;
  }
}
