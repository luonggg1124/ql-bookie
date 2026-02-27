"use client";

import { useEffect } from "react";
import { useBreadcrumbs } from "./use-breadcrumbs";
import type { Breadcrumb } from "./use-breadcrumbs";

type BreadcrumbManagerProps = {
  items: Breadcrumb[];
};

const BreadcrumbManager = ({ items }: BreadcrumbManagerProps) => {
  const { setBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    setBreadcrumbs(items);
  }, [setBreadcrumbs, items]);

  return null;
};
export * from "./use-breadcrumbs";
export default BreadcrumbManager;

