const articleModel = require('./model');

const createArticle = obj =>
  new Promise((resolve, reject) => {
    articleModel
      .create(obj)
      .then(article => resolve(article))
      .catch(err => reject(err));
  });

const getAllArticles = page =>
  new Promise((resolve, reject) => {
    articleModel
      .find({ active: true })
      .sort({
        createdAt: -1
      })
      .skip((page - 1) * 10)
      .limit(10)
      .select('_id title description content createdBy')
      .exec()
      .then(articles => resolve(articles))
      .catch(err => reject(err));
  });

const getOneArticle = id =>
  new Promise((resolve, reject) => {
    articleModel
      .find({ _id: id, active: true })
      .select('_id title description content createdBy')
      .exec()
      .then(article => resolve(article))
      .catch(err => reject(err));
  });

const updateOneArticle = (id, obj) =>
  new Promise((resolve, reject) => {
    console.log('obj', obj);
    articleModel
      .findOneAndUpdate({ _id: id, active: true }, { $set: obj }, { new: true })
      .then(data => resolve(data))
      .catch(err => reject(err));
  });

const deleteOneArticle = id =>
  new Promise((resolve, reject) =>
    articleModel
      .findOneAndUpdate({ _id: id, active: true }, { $set: { active: false } }, { new: true })
      .then(data => resolve(data))
      .catch(err => reject(err))
  );

module.exports = {
  createArticle,
  getAllArticles,
  getOneArticle,
  updateOneArticle,
  deleteOneArticle
};
