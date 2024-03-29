import { ReactNode, useState } from "react";
import { Tab, TabsContainer } from "~/ui";

export const InventoryLayout = () => {
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

  if (toggleState === TabEnum.HEROES)
    slots = heroes.map((hero) => (
      <div className="w-16 h-16 bg-amber-500 p-2 border-amber-800 border-2 rounded-sm" key={hero.id}>
        {hero.id}
      </div>
    ));

  if (toggleState === TabEnum.WEAPONS)
    slots = weapons.map((weapon) => (
      <div className="w-16 h-16 bg-amber-500 p-2 border-amber-800 border-2 rounded-sm" key={weapon.id}>
        {weapon.id}
      </div>
    ));

  console.log(slots);
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

      <div className="bg-stone-900 min-h-[30rem] p-2 border-black rounded-sm">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] gap-1">{slots}</div>
      </div>
    </div>
  );
};
