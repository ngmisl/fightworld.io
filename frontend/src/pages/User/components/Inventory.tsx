import { ReactNode, useState } from "react";
import { Slot, SlotsContainer, Tab, TabsContainer } from "~/ui";

const Inventory = () => {
  enum TabEnum {
    HEROES = "Heroes",
    WEAPONS = "Weapons",
  }
  const [toggleState, setToggleState] = useState<TabEnum>(TabEnum.HEROES);

  const heroes = [
    {
      id: "1",
    },
    {
      id: "2",
    },
  ];

  const weapons = [
    {
      id: "1",
    },
    {
      id: "2",
    },
    {
      id: "3",
    },
    {
      id: "4",
    },
    {
      id: "5",
    },
    {
      id: "6",
    },
    {
      id: "7",
    },
    {
      id: "8",
    },
    {
      id: "9",
    },
    {
      id: "10",
    },
    {
      id: "11",
    },
    {
      id: "12",
    },
  ];

  let slots: ReactNode;

  if (toggleState === TabEnum.HEROES) slots = heroes.map((hero) => <Slot key={hero.id}>{hero.id}</Slot>);

  if (toggleState === TabEnum.WEAPONS) slots = weapons.map((weapon) => <Slot key={weapon.id}>{weapon.id}</Slot>);

  return (
    <div className="w-1/2">
      <TabsContainer>
        <Tab active={toggleState === TabEnum.HEROES ? true : false} onClick={() => setToggleState(TabEnum.HEROES)}>
          {TabEnum.HEROES}
        </Tab>
        <Tab active={toggleState === TabEnum.WEAPONS ? true : false} onClick={() => setToggleState(TabEnum.WEAPONS)}>
          {TabEnum.WEAPONS}
        </Tab>
      </TabsContainer>

      <SlotsContainer>{slots}</SlotsContainer>
    </div>
  );
};

export default Inventory;
