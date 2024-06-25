import { Request, Response } from "express";
import CarSizeService from "../services/carSizeService";

export const getSizes = async (req: Request, res: Response) => {
  try {
    const sizes = await new CarSizeService().get();

    return res.status(200).json({
      message: "Get all sizes success",
      data: sizes,
    });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getSizeById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const size = await new CarSizeService().getById(id);

    if (!size) return res.status(404).json({ message: "Data null" });

    return res.status(200).json({
      message: "Get size by id success",
      data: size,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSize = async (req: Request, res: Response) => {
  const payload = req.body;

  if (!payload.size) return res.status(400).json({ message: "Data not null" });

  try {
    const addSize = await new CarSizeService().post(payload);

    return res.status(200).json({
      message: "Create data success",
      data: addSize,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSize = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const payload = req.body;

  try {
    if (!payload.size)
      return res.status(400).json({ message: "Data not null" });

    const editSize = await new CarSizeService().put(id, payload);

    if (editSize[0] === 0)
      return res.status(404).json({ message: "Data not found" });

    return res.status(200).json({
      message: "Update data success",
      data: {
        updated: editSize[0],
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSize = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    if (!id) return res.status(400).json({ message: "Data not found" });

    const dropData = await new CarSizeService().delete(id);

    if (dropData === 0)
      return res.status(404).json({ message: "Data not found" });

    return res.status(200).json({
      message: "Delete data success",
      data: {
        deleted: dropData,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
