import { useMeQuery } from "~/generated/graphql";
import { Button } from "~/ui";

export const User = () => {
  const [, meQuery] = useMeQuery({
    pause: true,
  });

  return (
    <Button type="primary" size="normal" onClick={meQuery}>
      Fetch me data
    </Button>
  );
};
