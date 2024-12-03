import centerImg from "./center.png";
import { OrbitingCircle } from "./OrbitingCircle";
import { OrbitingCirclesContainer } from "./OrbitingCirclesContainer";

const MOCK_ITEM_1 = {
  img: "https://cdn-icons-png.flaticon.com/128/5968/5968764.png",
};
const MOCK_ITEM_2 = {
  img: "https://cdn-icons-png.flaticon.com/128/5969/5969020.png",
};
const MOCK_ITEM_3 = {
  img: "https://cdn-icons-png.flaticon.com/128/5968/5968841.png",
};
const MOCK_ITEM_4 = {
  img: "https://cdn-icons-png.flaticon.com/128/1384/1384060.png",
};
const MOCK_ITEM_5 = {
  img: "https://cdn-icons-png.flaticon.com/128/281/281764.png",
};
const MOCK_ITEM_6 = {
  img: "https://cdn-icons-png.flaticon.com/128/174/174855.png",
};
const MOCK_ITEM_7 = {
  img: "https://cdn-icons-png.flaticon.com/128/732/732200.png",
};
const MOCK_ITEM_8 = {
  img: "https://cdn-icons-png.flaticon.com/128/5977/5977575.png",
};
const MOCK_ITEM_9 = {
  img: "https://cdn-icons-png.flaticon.com/128/2504/2504929.png",
};
const MOCK_ITEM_10 = {
  img: "https://cdn-icons-png.flaticon.com/128/5968/5968705.png",
};
const MOCK_ITEM_11 = {
  img: "https://cdn-icons-png.flaticon.com/128/174/174872.png",
};
const MOCK_ITEM_12 = {
  img: "https://cdn-icons-png.flaticon.com/128/5968/5968804.png",
};
const MOCK_ITEM_13 = {
  img: "https://cdn-icons-png.flaticon.com/128/1409/1409941.png",
};
const MOCK_ITEM_14 = {
  img: "https://cdn-icons-png.flaticon.com/128/3256/3256023.png",
};
const MOCK_ITEM_15 = {
  img: "https://cdn-icons-png.flaticon.com/128/5968/5968523.png",
};
const MOCK_ITEM_16 = {
  img: "https://cdn-icons-png.flaticon.com/128/5968/5968756.png",
};
const MOCK_ITEM_17 = {
  img: "https://cdn-icons-png.flaticon.com/128/5968/5968819.png",
};

const randomWidth = () => Math.floor(Math.random() * (45 - 32 + 1) + 32);

export const Example = () => {
  return (
    <OrbitingCirclesContainer
      maxRadius={240}
      centerNode={
        <img src={centerImg} style={{ maxWidth: 90, borderRadius: "100%" }} />
      }
      extraPadding={60}
    >
      <OrbitingCircle
        radius={90}
        duration={18}
        nodes={[
          {
            data: MOCK_ITEM_1,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_2,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_3,
            maxWidth: randomWidth(),
          },
        ]}
      />
      <OrbitingCircle
        radius={160}
        duration={54}
        nodes={[
          {
            data: MOCK_ITEM_4,
            reverse: true,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_5,
            reverse: true,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_6,
            reverse: true,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_7,
            reverse: true,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_8,
            reverse: true,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_9,
            reverse: true,
            maxWidth: randomWidth(),
          },
        ]}
      />
      <OrbitingCircle
        radius={230}
        duration={60}
        nodes={[
          {
            data: MOCK_ITEM_10,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_11,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_12,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_13,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_14,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_15,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_16,
            maxWidth: randomWidth(),
          },
          {
            data: MOCK_ITEM_17,
            maxWidth: randomWidth(),
          },
        ]}
      />
    </OrbitingCirclesContainer>
  );
};
