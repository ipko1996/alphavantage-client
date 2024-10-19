import Link from "next/link";
import { Button, Container, Text, Title } from "@mantine/core";
import { TrendingDown } from "lucide-react";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center justify-center text-center">
      <TrendingDown className="mb-4 h-12 w-12 text-red-500" />
      <Title order={1} className="mb-2 text-4xl font-bold">
        Stock Not Found
      </Title>
      <Text size="lg" className="mb-4">
        We couldn&apos;t find the stock you&apos;re looking for. Please check
        the symbol and try again.
      </Text>
      <Button component={Link} href="/" size="lg" className="mt-6">
        Return Home
      </Button>
    </Container>
  );
}
