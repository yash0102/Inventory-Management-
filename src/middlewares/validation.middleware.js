const validateProduct = ( req, res, next) => {
    // validate data
    const { name, price, imageUrl } = req.body;
    let errors = [];
    if (!name || name.trim() == "") {
    errors.push("Name is required");
    }

    if (!price || parseFloat(price) < 1) {
    errors.push("Price must be positive number");
    }

    try {
    const validUrl = new URL(imageUrl);
    } catch (err) {
    errors.push("URL is invalid");
    }

    if (errors.length > 0) {
    return res.render("new-product", {
        errorMessage: errors[0],
    });
    }
}

export default validateProduct;