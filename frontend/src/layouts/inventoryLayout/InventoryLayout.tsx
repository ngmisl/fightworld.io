import { useState } from "react";
import { Tab, TabsContainer } from "~/ui";

export const InventoryLayout = () => {
  enum TabEnum {
    HEROES = "Heroes",
    WEAPONS = "Weapons",
  }
  const [toggleState, setToggleState] = useState<TabEnum>(TabEnum.HEROES);

  const slots = [
    {
      id: "abc",
    },
    {
      id: "123",
    },
  ];

  return (
    <div className="w-1/2">
      <TabsContainer>
        <Tab active={toggleState === TabEnum.HEROES ? true : false} onClick={() => setToggleState(TabEnum.HEROES)}>
          Heroes
        </Tab>
        <Tab active={toggleState === TabEnum.WEAPONS ? true : false} onClick={() => setToggleState(TabEnum.WEAPONS)}>
          Weapons
        </Tab>
      </TabsContainer>
      <div className="bg-stone-900 min-h-[30rem] p-2 border-black border-2 rounded-sm">
        <div className="flex gap-1">
          {slots.map((slot) => (
            <div className="w-16 h-16 bg-amber-500 p-2 border-amber-800 border-2  rounded-sm" key={slot.id}>
              {slot.id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
