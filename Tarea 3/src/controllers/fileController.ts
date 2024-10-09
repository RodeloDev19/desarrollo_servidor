import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';


export const uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded" });
            return;
        }

        const file = req.file;
        res.status(200).json({
            filename: file.originalname,
            size: file.size,
            path: file.path,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const downloadFile = async (req: Request, res: Response): Promise<void> => {
    const fileName = req.query.file as string;
    const filePath = `./documents/${fileName}`;

    if (!fileName) {
        res.status(400).json({ message: 'File name is required' });
        return;
    }

    try {
        if (fs.existsSync(filePath)) {
            res.download(filePath);
        } else {
            res.status(404).json({ message: 'File not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
