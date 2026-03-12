"use client"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./sidebar/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "../_common_/breadcrumb";
import React from "react";



const MainLayout = ({children}: {children: React.ReactNode}) => {
  const { breadcrumbs } = useBreadcrumbs();
  return (
    <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="min-w-0">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex min-w-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
         {breadcrumbs.length > 0 && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    return (
                      <React.Fragment key={`${item.title}-${index}`}>
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>{item.title}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink href={item.href}>
                              {item.title}
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                        {!isLast && <BreadcrumbSeparator />}
                      </React.Fragment>
                    );
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            )}
        </div>
      </header>
      <div className="flex min-w-0 flex-1 flex-col gap-4 p-4 pt-0">
        {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
  )
}

export default MainLayout;