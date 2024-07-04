import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import CarsService from "../services/carService";
import { imageName } from "../utils/imageName";
import { UploadApiErrorResponse } from "cloudinary";

export const getCars = async (req: Request, res: Response) => {
  try {
    const cars = await new CarsService().get();

    const filteredCar = cars.filter((car) => car.isDeleted !== 1);

    return res.status(200).json({
      message: "Get all cars success",
      data: filteredCar,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCarsById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const cars = await new CarsService().getById(id);

    if (!cars) return res.status(404).json({ message: "Data not found" });

    return res.status(200).json({
      message: "Get cars by id success",
      data: cars,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCar = async (req: Request, res: Response) => {
  const payload = req.body;
  const image = req.file as Express.Multer.File;

  if (!payload.size_id || !payload.name || !payload.rentPerDay) {
    return res.status(400).json({ message: "Data not null" });
  }

  const filebase64 = image.buffer.toString("base64");
  const file = `data:${image.mimetype};base64,${filebase64}`;
  const img = await cloudinary.uploader.upload(file, { folder: "bcr-ch6" });

  const userAuth = (req as any).user;

  try {
    const body = {
      ...payload,
      img_url: img.url,
      createdBy: userAuth.id,
    };

    const addCar = await new CarsService().post(body);

    return res.status(200).json({
      message: "Created car success",
      data: addCar,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const payload = req.body;
  const img_url = req.file as Express.Multer.File;

  if (!payload.size_id || !payload.name || !payload.rentPerDay) {
    return res.status(400).json({ message: "Data not null" });
  }

  let imgUrl: string | undefined;
  if (img_url) {
    const filebase64 = img_url?.buffer.toString("base64");
    const file = `data:${img_url?.mimetype};base64,${filebase64}`;
    const img = await cloudinary.uploader.upload(file, { folder: "bcr-ch6" });
    imgUrl = img?.url;
  }

  const car = await new CarsService().getById(id);
  if (!car || car.isDeleted === 1) {
    return res.status(404).json({ message: "Data not found" });
  }

  const fileName = imageName(car?.img_url);
  const userAuth = (req as any).user;

  try {
    const body = {
      ...payload,
      img_url: imgUrl,
      updatedBy: userAuth.id,
      updatedAt: new Date(),
    };

    const editCar = await new CarsService().put(id, body);

    if (imgUrl) {
      await cloudinary.uploader.destroy(
        fileName,
        (err: UploadApiErrorResponse) => {
          if (!!err) {
            return res.status(400).json({ message: "Upload image failed" });
          }
        }
      );
    }

    return res.status(200).json({
      message: "Updated car success",
      data: {
        updated: editCar[0],
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const car = await new CarsService().getById(id);
  if (!car || car.isDeleted === 1) {
    return res.status(404).json({ message: "Data not found" });
  }

  const fileName = imageName(car?.img_url);
  const userAuth = (req as any).user;

  try {
    const body: any = {
      ...car,
      isDeleted: 1,
      deletedBy: userAuth.id,
    };

    const destroyCar = await new CarsService().delete(id, body);

    await cloudinary.uploader.destroy(
      fileName,
      (err: UploadApiErrorResponse) => {
        if (!!err) {
          return res.status(400).json({ message: "Upload image failed" });
        }
      }
    );

    return res.status(200).json({
      message: "Deleted car success",
      data: {
        deleted: destroyCar[0],
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
