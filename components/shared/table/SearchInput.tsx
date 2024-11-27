"use client"

import { useDebounce } from "use-debounce";
import { useSearchParams } from "next/navigation";
import { useState, useCallback, useEffect } from "react";
import useCostomSearchParams from "@/hooks/use-searchParams";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";


function SearchInput({searchKey}:{searchKey:string}) {
  const searchParams = useSearchParams();
  const t = useTranslations("shared");
  const { createQueryString, pathname, router } = useCostomSearchParams();
  const search =
    typeof searchParams?.get("search") === "string"
      ? searchParams?.get("search")
      : "";
  const [query, setQuery] = useState(search);
  const [value] = useDebounce(query, 1000);

  //as we search by single word as first_name or last_name no the fullname
  useEffect(() => {
    router.replace(`${pathname}?${createQueryString("search", value?.trim() ?? "")}`, {
      scroll: false,
    });
  }, [createQueryString, pathname, router, value]);

  const handleSearchByName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    },
    [],
  );
  return (
    <Input
    placeholder={t("search")}
    value={query || ""}
    onChange={handleSearchByName}
    className="w-full md:max-w-sm"
  />
  );
}

export default SearchInput;
