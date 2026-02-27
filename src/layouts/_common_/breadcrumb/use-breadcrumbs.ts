"use client";

import { useAtom } from "jotai";

import { atom } from "jotai";
import paths from "@/paths";

export type Breadcrumb = {
  title: string;
  href: string;
};

/** Breadcrumb mặc định cho clinic (chỉ phục vụ clinic). */
export const initialBreadcrumbs: Breadcrumb[] = [
  {
    title: paths.dashboard.title,
    href: paths.dashboard.path,
  },
];

export const breadcrumbAtom = atom<Breadcrumb[]>(initialBreadcrumbs);

type SetBreadcrumbsInput = Breadcrumb[];

export function useBreadcrumbs() {
  const [breadcrumbs, setBreadcrumbsState] = useAtom(breadcrumbAtom);

  const setBreadcrumbs = (next: SetBreadcrumbsInput) => {
    setBreadcrumbsState(next);
  };

  const appendBreadcrumb = (item: Breadcrumb) => {
    setBreadcrumbsState((prev) => [...prev, item]);
  };

  const popBreadcrumb = () => {
    setBreadcrumbsState((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const resetBreadcrumbs = () => {
    setBreadcrumbsState(initialBreadcrumbs);
  };

  return {
    breadcrumbs,
    setBreadcrumbs,
    appendBreadcrumb,
    popBreadcrumb,
    resetBreadcrumbs,
  };
}



