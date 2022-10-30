const Article = require('../modles/article');
const NotFoundError = require('../errors/not-found-error');
const ForbiddenError = require('../errors/forbidden-error');

module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail(() => {
      throw new NotFoundError('No articles found');
    })
    .then((articles) => {
      res.send(articles);
    })
    .catch((err) => next(err));
};

module.exports.createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id
  })
    .then((article) => res.send(article))
    .catch((err) => next(err));
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(() => {
      throw new NotFoundError('No Article with that id');
    })
    .then((usersArticle) => {
      if (req.user._id !== usersArticle.owner.valueOf()) {
        throw new ForbiddenError('Forbidden Error');
      }
      Article.findByIdAndDelete(req.params.articleId)
        .orFail(() => {
          throw new NotFoundError('No Article with that id');
        })
        .then((article) => {
          res.send({ article });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};