const joi = require("joi");
const { Resto } = require("../../models");
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

//*--------------------- Add Restaurant ---------------------*//
exports.addResto = async (req, res) => {
  try {
    const dataResto = await Resto.create({
      ...req.body,
      picture: req.file.path,
    });

    const schema = joi.object({
      namaResto: joi.string().required(),
      openDate: joi.date().required(),
      picture: joi.string().required(),
      addressResto: joi.string().required(),
      locationResto: joi.string().required(),
    });

    const { error } = schema.validate(dataResto);

    if (error) {
      return res.status(400).send({
        status: failed,
        message: error.details[0].message,
      });
    }

    const newDataResto = await Resto.findOne({
      where: {
        id: dataResto.id,
      },
    });

    res.status(200).send({
      status: success,
      message: messageSuccess("Add Restaurant"),
      data: { newDataResto },
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

//*--------------------- Update Restaurant ---------------------*//
exports.updateResto = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const dataResto = await Resto.findOne({
      where: {
        id,
      },
    });

    if (!dataResto) {
      res.status(404).send({
        status: failed,
        message: messageFailed("Update Restaurant", id),
        data: {
          dataResto: [],
        },
      });
    }

    await Resto.update(
      { ...body },
      {
        where: {
          id,
        },
      }
    );

    const newDataResto = await Resto.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
      status: success,
      message: messageSuccess("Update Restaurant", id),
      data: { newDataResto },
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

//*--------------------- Delete Restaurant ---------------------*//
exports.deleteResto = async (req, res) => {
  try {
    const { id } = req.params;

    const isResto = await Resto.findOne({
      where: {
        id,
      },
    });

    if (!isResto) {
      res.status(404).send({
        status: failed,
        message: messageFailed("Delete Restaurant", id),
        data: {
          dataResto: [],
        },
      });
    }
    await Resto.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: success,
      message: messageSuccess("Delete Restaurant", id),
      data: {},
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

//*--------------------- Get By Id Restaurant ---------------------*//
exports.getRestoById = async (req, res) => {
  try {
    const { id } = req.params;

    const dataResto = await Resto.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dataResto) {
      res.status(404).send({
        status: failed,
        message: messageFailed("Get Restaurant", id),
        data: {
          dataResto: [],
        },
      });
    }

    res.status(200).send({
      status: success,
      message: messageSuccess("Get Restaurant", id),
      data: { dataResto },
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

//*--------------------- Get All Restaurant ---------------------*//
exports.getAllResto = async (req, res) => {
  try {
    const dataResto = await Resto.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!dataResto.length) {
      res.status(404).send({
        status: failed,
        message: messageEmpty,
        data: {
          dataResto: [],
        },
      });
    }

    res.status(200).send({
      status: success,
      message: messageSuccess("Get All Restaurant"),
      data: { dataResto },
    });
  } catch (error) {
    errorResponse(error, res);
  }
};
