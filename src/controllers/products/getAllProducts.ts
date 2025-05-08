/** @format */

import { Request, Response } from "express";
import { getAllProducts as getListOfProducts } from "../../services/products";
import { Category } from "@prisma/client";
import getPagination from "../../utils/pagination";
import { defaults } from "../../config/defaults";

const getAllProducts = async (req: Request, res: Response) => {
    let { page, limit, category, sortType } = req.query;
    try {
        const Limit = Number(limit) || defaults.limit;
        const Page = Number(page) || defaults.page;
        const Category = (category as Category) || undefined;
        if (!sortType) sortType = defaults.sortType;

        const products = await getListOfProducts({
            limit: Limit,
            page: Page,
            category: Category,
            sortType: sortType as "asc" | "desc",
        });
        if (!products) {
            return res.status(404).json({ message: "No products found" });
        }

        const totalItems = products.length;
        const pagination = getPagination(totalItems, Limit, Page);

        res.status(200).json({
            message: "A List of Products retive Successfully",
            data: products,
            pagination,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ messge: "Internal Server Error", err });
    }
};

export default getAllProducts;
