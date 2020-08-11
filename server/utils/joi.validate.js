module.exports = (schema) => {
  return (req) => (res) => (next) => {
    const { error } = schema.validate(req["body"], { abortEarly: false });
    if (error) {
      return next(error);
    }
    return next();
  };
};
