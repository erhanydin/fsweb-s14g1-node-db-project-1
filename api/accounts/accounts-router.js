const router = require('express').Router()
const accountsModel = require("./accounts-model");
const middleware = require("./accounts-middleware");


router.get('/', async (req, res, next) => {
  // KODLAR BURAYA
  try {
    const allAccounts = await accountsModel.getAll();    
    res.status(200).json(allAccounts);
  } catch (error) {
    next(error);
  }
})

router.get('/:id', middleware.checkAccountId ,async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let existedAccount = req.Account;
    res.json(existedAccount)
  } catch (error) {
    next(error);
  }
})

router.post('/', middleware.checkAccountPayload, middleware.checkAccountNameUnique ,async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let insertedAccount = await accountsModel.create(req.body);
    res.status(201).json(insertedAccount);
  } catch (error) {
    next(error ); 
  }
})

router.put('/:id', middleware.checkAccountPayload, middleware.checkAccountId, middleware.checkAccountNameUnique ,async (req, res, next) => {
  // KODLAR BURAYA
  try {
    let updatedAccount = await accountsModel.updateById(req.params.id, req.body);
    res.json(updatedAccount);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', middleware.checkAccountId ,async (req, res, next) => {
  // KODLAR BURAYA
  try {
    await accountsModel.deleteById(req.params.id);
    res.json(req.Account);
  } catch (error) {
    next(error);
  }

})

router.use((err, req, res, next) => { // eslint-disable-line
  // KODLAR BURAYA
})


router.use((err, res, req) => {
  res.status(err.status || 400).json({
    customMessage: "Bir haata oluştu",
    message: err.message
  });
});

module.exports = router;
