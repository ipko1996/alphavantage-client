"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Autocomplete,
  AutocompleteProps,
  Avatar,
  Group,
  Text,
} from "@mantine/core";
import { LatestPost } from "~/app/_components/post";
import { HydrateClient } from "~/trpc/server";
import { api } from "~/trpc/react";

export default function Home() {
  const [value, setValue] = useState("");
  const { data, error } = api.search.keywordQuery.useQuery({
    keyword: "tesco",
  });
  console.log(data);

  const renderAutocompleteOption: AutocompleteProps["renderOption"] = ({
    option,
  }) => (
    <Group gap="sm">
      <div>
        <Link href={`/stock/${option.value.split(" ").at(-1)}`}>
          <Text size="sm">{option.value}</Text>
        </Link>
      </div>
    </Group>
  );

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-1/2">
        <Autocomplete
          label="Search for a stock ..."
          renderOption={renderAutocompleteOption}
          error={error ? "Something went wrong" : ""}
          data={
            data?.bestMatches.map((match) => `${match.name} ${match.symbol}`) ??
            []
          }
          value={value}
          onChange={setValue}
        />
      </div>
    </main>
  );
}
