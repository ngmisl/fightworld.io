import { useMeQuery } from "~/generated/graphql";
import { InventoryLayout } from "~/layouts/inventoryLayout/InventoryLayout";

const Inventory = () => {
  const [{ data }] = useMeQuery({});
  const userCharacters = data?.me.characters;
  return (
    <div>
      {userCharacters &&
        userCharacters.map((character) => (
          <div key={character.id}>
            <span>{character.level}</span>
          </div>
        ))}
      <InventoryLayout></InventoryLayout>
    </div>
  );
};

export default Inventory;
