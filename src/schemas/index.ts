/** @format */

import { z } from "zod";

export const CategoryEnum = z.enum([
    "ELECTRONICS",
    "FASHION",
    "GROCERY",
    "BOOKS",
    "HOME",
    "TOYS",
]);

export const OrderStatusEnum = z.enum([
    "CONFIRMED",
    "PENDING",
    "CANCELLED",
    "SHIPPED",
    "DELIVERED",
]);

export const PaymentStatusEnum = z.enum(["PAID", "UNPAID"]);

export const createProductSchema = z.object({
    userId: z.string(),
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().positive(),
    discount: z.number().min(0).max(100).optional(),
    category: CategoryEnum,
    image: z.string(),
    stock: z.number().int().nonnegative(),
});

export const ReviewSchema = z.object({
    id: z.string().optional(),
    userId: z.string(),
    productId: z.string(),
    rating: z.number().int().min(1).max(5),
    comment: z.string(),
    image: z.string().url().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const createShippingAddressSchema = z.object({
    orderId: z.string().optional(),
    userId: z.string(),
    division: z.string().min(1),
    district: z.string().min(1),
    upzila: z.string().min(1),
    postalCode: z.string().min(4).max(10),
    phoneNumber: z.string().min(10).max(15),
});

export const OrderSchema = z.object({
    id: z.string().optional(),
    userId: z.string(),
    shippingAddressId: z.string(),
    productIds: z.array(z.string()),
    quantity: z.number().int().positive(),
    totalAmount: z.number().positive(),
    orderStatus: OrderStatusEnum.optional(),
    paymentStatus: PaymentStatusEnum.optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

export const userIdSchema = z.string();

export const UserSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});
