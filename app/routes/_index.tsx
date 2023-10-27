import { Box } from "@chakra-ui/react";
import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <Box bg="tomato" w="100%" p={4} color="white">
      <Link to="/table">Table</Link>
    </Box>
  );
}
