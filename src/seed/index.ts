/** @format */

import seedProducts from "./product";
import seedReviews from "./review";
import seedShippingAddresses from "./shippingAddress";
import seedOrders from "./order";

async function main() {
    await seedProducts();
    await seedReviews();
    await seedShippingAddresses();
    await seedOrders();
    console.log("🌱 Seeded successfully");
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
