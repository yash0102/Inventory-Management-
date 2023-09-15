import { body, validationResult } from "express-validator";

const validateProduct = async ( req, res, next) => {
    // 1. Setup rules for validation.
    console.log("req.body => ",req.body); 
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('price').isFloat({gt:0}).withMessage("Price sholud be a positive value"), // gt:0 , means greater than 0
        // body('imageUrl').isURL().withMessage('Invalid url')
        body('imageUrl').custom((value , {req})=> {
            if(!req.file) {
                throw new Error('Image is required');
            }
            return true;
        }),
    ];

    // 2. run those rules
        await Promise.all(
            rules.map((rule)=> rule.run(req))
        );

    // 3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req);

    // 4. if errors, return the error message
    if (!validationErrors.isEmpty()){
        return res.render('new-product', {
            errorMessage: validationErrors.array()[0].msg,
        })
    }
    next();
}

export default validateProduct;