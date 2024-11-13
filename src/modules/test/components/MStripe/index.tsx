// import { PropsWithChildren } from "react";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51PH1OXRw1UarTArZBd8g5xdWdjLP7agt0laHh3HDEATHM2iUnMOlltZ9F91vmFmcAC5nRmiWapGbgNqqtPqjF7WP000kNeeu3J"
// );

// const StripeProvider: React.FunctionComponent<PropsWithChildren> = ({
//   children,
// }) => {
//   return <Elements stripe={stripePromise}>{children}</Elements>;
// };
// export default StripeProvider;

//!=========================================

// import { apiInstance } from "@axios/index";
// import { CButton } from "@controls";
// import { Paper, Stack } from "@mui/material";
// import { useStripe } from "@stripe/react-stripe-js";
// import { useQuery } from "@tanstack/react-query";

// const MTestPage = () => {
//   const stripe = useStripe();

//   const { data: products = [] } = useQuery({
//     queryKey: ["products"],
//     queryFn: () => apiInstance.get("http://localhost:3001/products"),
//     select: (response) => response?.data,
//   });

//   const onSubmit = async () => {
//     const res = await apiInstance.post(
//       "http://localhost:3001/create-checkout-session",
//       { id: "id nè", quantity: 2, currency: "vnd" }
//     );
//     console.log("🚀 ~ onSubmit ~ res:", res);

//     const { url } = res.data;

//     if (stripe && url) {
//       window.location.href = url;
//     }
//   };

//   return (
//     <Paper sx={{ p: 2, maxWidth: 400 }}>
//       <CButton
//         onClick={async () => {
//           const res = await apiInstance.get("http://localhost:3001/products");
//           console.log("🤣 res at line 25 🤣:", res);
//         }}
//       >
//         Get products
//       </CButton>
//       <Stack gap={2}>
//         {products?.map((e) => (
//           <Stack key={e.id} direction="row" gap={2}>
//             <img
//               src={e?.image}
//               alt=""
//               style={{ height: 100, width: 100, objectFit: "cover" }}
//             />
//             <Stack gap={1}>
//               <h3>{e.name}</h3>
//               <h5>{`${e.price.toLocaleString()} VNĐ`}</h5>
//             </Stack>
//           </Stack>
//         ))}

//         <CButton onClick={onSubmit}>Checkout</CButton>
//       </Stack>
//     </Paper>
//   );
// };
// export default MTestPage;
