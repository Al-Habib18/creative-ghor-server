/** @format */

import prisma from "../schemas/prisma";

export const createShippingAddress = async (data: any) => {
    const shippingAddress = await prisma.shippingAddress.create({ data });
    return shippingAddress;
};

export const getShippingAddressById = async (id: string) => {
    const shippingAddress = await prisma.shippingAddress.findUnique({
        where: { id },
    });
    return shippingAddress;
};

export const deleteShippingAddressById = async (id: string) => {
    const shippingAddress = await prisma.shippingAddress.delete({
        where: { id },
    });
    return shippingAddress;
};

export const updateShippingAddressById = async (id: string, data: any) => {
    const shippingAddress = await prisma.shippingAddress.update({
        where: { id },
        data,
    });
    return shippingAddress;
};

/* export const getAllShippingAddresses = async () => {
    const shippingAddresses = await prisma.shippingAddress.findMany();
    return shippingAddresses;
}; */

export const getAllShippingAddressesOfUser = async (id: string) => {
    const shippingAddresses = await prisma.shippingAddress.findMany({
        where: { userId: id },
    });
    return shippingAddresses;
};
