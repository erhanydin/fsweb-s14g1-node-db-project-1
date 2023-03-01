const accountsModel = require("./accounts-model");
const yup = require("yup");

const AccountsSchema = yup.object().shape({
  name: yup.string()
    .required("name and budget are required")
    .min(3, "name of account must be between 3 and 100")
    .max(100, "name of account must be between 3 and 100"),
  budget: yup.number("budget of account must be a number")
    .required("name and budget are required")
    .min(0, "budget of account is too large or too small")
    .max(1000000, "budget of account is too large or too small")
});

exports.checkAccountPayload = async (req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.

  try {
    if (req.body && req.body.name)
      req.body.name = req.body.name.trim();

    await AccountsSchema.validate(req.body);
  } catch (error) {
    res.status(400).json({ message: error.message || "Hata oluştu" });
  }
  next();
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    if (req.body && req.body.name)
      req.body.name = req.body.name.trim();
    
    await AccountsSchema.validate(req.body);
    let allAccounts = await accountsModel.getAll();
    let isFound = false;
    for (let i = 0; i < allAccounts.length; i++) {
      if (allAccounts[i].name === req.body.name) {
        isFound = true;
        break;
      }
    }
    if (isFound) {
      res.status(400).json({ message: "that name is taken" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  next();
}

exports.checkAccountId = async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let isExist = await accountsModel.getById(req.params.id);
    if (isExist === null) {
      res.status(404).json({ message: "account not found" });
    }
    req.Account = isExist;
  } catch (error) {
    res.status(500).json({ message: "checkAccountId has error" });
  }
  next();
}
