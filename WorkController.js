import WorkEntry from "./WorkEntry.js";

export const addWorkEntry = async (req, res) => {
  try {
    const doc = new WorkEntry({
      date: req.body.date,
      workHours: req.body.workHours,
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
 
    const entries = await WorkEntry.find({
      user_id: id,
    }).exec();

    res.json(entries);
  } catch (err) {
    // console.log(err);
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
    if (date == `add`) addWorkEntry(req,res);
    else if (typeof date === String) getAllSortedById(req,res);
    
    else {
      await WorkEntry.updateOne(
        { date: date },
        {
          date: date,
          workHours: req.body.workHours,
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
 