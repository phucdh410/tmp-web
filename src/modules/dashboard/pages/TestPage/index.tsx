import imgRoot from "@assets/images/menus/menu-root.png";
import { Stack } from "@mui/material";

const MOCK = [
  { id: "1", label: "Item 1" },
  { id: "2", label: "Item 2" },
  { id: "3", label: "Item 3" },
  { id: "4", label: "Item 4" },
  { id: "5", label: "Item 5" },
  { id: "6", label: "Item 6" },
  { id: "7", label: "Item 7" },
  { id: "8", label: "Item 8" },
  { id: "9", label: "Item 9" },
];

const radius = 250;

function calculatePositions(n, r) {
  const positions = [];
  for (let i = 0; i < n; i++) {
    const angle = ((2 * Math.PI) / n) * i;
    const x = r * Math.cos(angle);
    const y = r * Math.sin(angle);
    positions.push({ x, y });
  }
  return positions;
}

const TestPage = () => {
  const n = MOCK.length;

  const positions = calculatePositions(n, radius);
  console.log(positions);
  return (
    <Stack
      height="100%"
      alignItems="center"
      justifyContent="center"
      position="relative"
      borderRadius="100%"
    >
      <img
        src={imgRoot}
        alt=""
        style={{ borderRadius: "inherit", width: 150, height: 150 }}
      />
      {MOCK.map((item, index) => (
        <Stack
          key={item.id}
          position="absolute"
          maxWidth={120}
          maxHeight={120}
          borderRadius="100%"
          overflow="hidden"
          sx={{
            transform: `translate(${positions[index].x}px, ${positions[index].y}px)`,
          }}
        >
          <img
            src={`https://picsum.photos/id/${Math.round(
              Math.random() * 99
            )}/150`}
            alt=""
          />
          {/* {item.label} */}
        </Stack>
      ))}
    </Stack>
  );
};
export default TestPage;
