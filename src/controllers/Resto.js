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
    const dataResto = await Resto.create(req.body);

    res.status(200).send({
      status: success,
      message: messageSuccess("Add Restaurant"),
      data: { dataResto },
    });
  } catch (error) {
    errorResponse(error, res);
  }
};

//*--------------------- Update Restaurant ---------------------*//
exports.updateResto = async (req, res) => {
  try {
    const { id } = req.params;
    

    

  } catch (error) {
    errorResponse(error, res);
  }
};

//*--------------------- Delete Restaurant ---------------------*//
//*--------------------- Get By Id Restaurant ---------------------*//
