const joi = require("joi");
const { TypeFood } = require("../../models");

//* Re-Useable Error message
const { success, failed, messageSuccess, messageFailed, messageEmpty } = {
  success: "success",
  failed: "failed",
  messageSuccess: (type, id) => `${type} Restaurant/es success${id ? ` id : ${id}` : ``}`,
  messageFailed: (type, id) => `${type} Restaurant/es fail${id ? ` id : ${id}` : ``}`,
  messageEmpty: `No data found`,
};

//* Re-Useable Error response
const errorResponse = (err, res) => {
  console.log(err);
  res.status(500).send({ error: { message: "Server Error" } });
};

//*--------------------- Add Type Food ---------------------*//
exports.addTypeFood = async (req, res) => {
  try {
    const dataTypeFood = await TypeFood.create({
      ...req.body,
      pictureFood: req.file.path,
      restoId: req.body.restoId,
    });

    const newDataTypeFood = await TypeFood.findOne({
      where: {
        id: dataTypeFood.id,
      },
    });

    res.status(200).send({
      status: success,
      message: messageSuccess("Add Type Food"),
      data: { newDataTypeFood },
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

//*--------------------- Update Type Food ---------------------*//
exports.updateTypeFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const dataTypeFood = await TypeFood.findOne({
      where: {
        id,
      },
    });

    if (!dataTypeFood) {
      return res.status(400).send({
        status: failed,
        message: messageEmpty,
        data: {
          dataTypeFood: [],
        },
      });
    }

    await TypeFood.update(
      { ...body },
      {
        where: {
          id,
        },
      }
    );

    const newDataTypeFood = await TypeFood.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: success,
      message: messageSuccess("Update Type Food", id),
      data: { newDataTypeFood },
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

//*--------------------- Delete Type Food ---------------------*//
exports.deleteTypeFood = async (req, res) => {
  try {
    const { id } = req.params;

    const dataTypeFood = await TypeFood.findOne({
      where: {
        id,
      },
    });

    if (!dataTypeFood) {
      return res.status(400).send({
        status: failed,
        message: messageEmpty,
        data: {
          dataTypeFood: [],
        },
      });
    }

    await TypeFood.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: success,
      message: messageSuccess("Delete Type Food", id),
      data: { dataTypeFood },
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

//*--------------------- Get Type Food By Id ---------------------*//
exports.getTypeFoodById = async (req, res) => {
  try {
    const { id } = req.params;

    const dataTypeFood = await TypeFood.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dataTypeFood) {
      return res.status(400).send({
        status: failed,
        message: messageEmpty,
        data: {
          dataTypeFood: [],
        },
      });
    }

    res.status(200).send({
      status: success,
      message: messageSuccess("Get Type Food", id),
      data: { dataTypeFood },
    });
  } catch (error) {
    errorResponse(error, res);
  }
};
