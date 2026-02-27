"use client";
import { HeroUIProvider as HeroUIProviderComponent } from "@heroui/react";
import { I18nProvider } from "@react-aria/i18n";
const HeroUIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nProvider locale="vi-VN">
      <HeroUIProviderComponent>{children}</HeroUIProviderComponent>
    </I18nProvider>
  );
};
export default HeroUIProvider;
