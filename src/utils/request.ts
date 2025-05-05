/** @format */

export const badRequest = (res: any, message: string) => {
    return res.status(400).json({ message });
};

export const notFound = (res: any, message: string) => {
    return res.status(404).json({ message });
};

export const serverError = (res: any, message: string) => {
    return res.status(500).json({ message });
};

export const unauthorized = (res: any, message: string) => {
    return res.status(401).json({ message });
};

export const forbidden = (res: any, message: string) => {
    return res.status(403).json({ message });
};
