"use client";

import { Languages } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const LanguageSwitcher: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations("locales");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          {routing.locales.map((locale) => (
            <DropdownMenuItem key={locale} asChild>
              <Link href={pathname} locale={locale}>
                {t(locale)}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
