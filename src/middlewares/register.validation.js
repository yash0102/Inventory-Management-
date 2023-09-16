import { body, validationResult } from "express-validator";

const validateRegister = async ( req, res, next) => {
    // 1. Setup rules for validation.
    console.log("req.body => ",req.body); 
    const rules = [
        body('name').notEmpty().withMessage("Name is required"),
        body('email').isEmail().withMessage("Email is required"),
        body('password')
        .notEmpty().withMessage("Password is required")
        .isLength({min:8}).withMessage("Password must be at least 8 characters long.")
        .isStrongPassword().withMessage("Password must contain at least one lowercase letter, one uppercase letter, and one number."),
    ];

    // 2. run those rules
        await Promise.all(
            rules.map((rule)=> rule.run(req))
        );

    // 3. check if there are any errors after running the rules.
    var validationErrors = validationResult(req);

    // 4. if errors, return the error message
    if (!validationErrors.isEmpty()){
        return res.render('register', {
            errorMessage: validationErrors.array()[0].msg,
        })
    }
    next();
}

export default validateRegister;