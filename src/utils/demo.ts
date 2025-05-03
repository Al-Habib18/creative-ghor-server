/** @format */

const demo = (data: any) => {
    data.userId = "user_1";
    data.name = "Wireless Mouse";
    data.description = "A smooth wireless mouse";
    data.price = 25.99;
    data.discount = 5.0;
    data.category = "ELECTRONICS";
    data.images = ["https://example.com/mouse1.png"];
    data.stock = 100;
    data.rating = 4.5;
    data.reviewsCount = 2;

    return data;
};

export default demo;
