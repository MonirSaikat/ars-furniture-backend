exports.validateRoute = (properties) => (req, res, next) => {
    const errors = [];
    const data = req.body;

    properties.forEach(property => {
      if(!data[property]) errors.push(`${property} is required`);
    });

    if (errors.length > 0)
    return res.json({ success: false, errors });

    next();
  };
