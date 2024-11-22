import DateEntry from "./DateEntry.js";

export const addDateEntry = async (req, res) => {
  try {
    const doc = new DateEntry({
      date: req.body.date,
      calories: req.body.calories,
      user_id: req.body.user_id,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    // console.log(err);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};

export const getAllSortedById = async (req, res) => {
  try {
    let id = req.params.user_id;
    // console.log("idid"+id)
    var arr=id.split(":")
    // console.log("arr"+arr)

    if (arr.length > 1) await getAllSortedByIdAndDate(req, res, id);
    else {
      // console.log("-------------------------------------------------------" + id);

      const entries = await DateEntry.find({
        user_id: id,
      }).exec();

      res.json(entries);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const getAllSortedByIdAndDate = async (req, res, idAndDate) => {
  try {
    let arr = idAndDate.split(":");

    const entries = await DateEntry.find({
      user_id: arr[0],
    })
      .find({ date: arr[1] })
      .exec();

    console.log(entries);

    res.json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить статьи",
    });
  }
};

export const update = async (req, res) => {
  try {
    const date = req.params.date;

    // console.log(
    //   "-------------------------------------------------------" + date
    // );
    if (date == `add`) addDateEntry(req, res);
    else if (typeof date === String) getAllSortedById(req, res);
    else {
      await DateEntry.updateOne(
        { date: date },
        {
          date: date,
          calories: req.body.calories,
          user_id: req.body.user_id,
        }
      );

      res.json({
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};

export const deleteFoodEntry = async (req, res) => {
  try {
    const date = req.params.date;

    console.log(
      "-------------------------------------------------------" + date
    );
    if (date == `add`) addDateEntry(req, res);
    else if (typeof date === String) getAllSortedById(req, res);
    else {
      await DateEntry.updateOne(
        { date: date },
        {
          date: date,
          calories: req.body.calories,
          user_id: req.body.user_id,
        }
      );

      res.json({
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};
