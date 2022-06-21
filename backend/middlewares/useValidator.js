const { body } = require("express-validator");

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatorio.")
            .isLength({ min: 3})
            .withMessage("O nome tem que ter mais de 3 caracteres"),
        body("email")
            .isString()
            .withMessage("O E-mail é obrigatorio")
            .isEmail()
            .withMessage("Digite um email valido"),
        body("password")
            .isString()
            .withMessage("Senha obrigatorio")
            .isLength({min:4})
            .withMessage("A senha tem que possuir mais de 4 caracteres"),
            body("confirmPassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatorio")
            .custom((value,{req}) => {
                if(value != req.body.password){
                    throw new Error("As senhas não são iguais.")
                }
                return true;
            }),
        
    ]
} 
const loginValidation = () => {
    return[
        body("email")
            .isString()
            .withMessage("O E-mail é obrigatorio.")
            .isEmail()
            .withMessage("Insira um e-mail válido"),
        body("password")
            .isString()
            .withMessage("A senha é obrigatorio"),
    ]
}
const userUpdateValidation = () => {

    return[
        body('name')
            .optional()
            .isLength({min:3})
            .withMessage("O nome precisa de pelo menos 3 caracteres."),
        body("password")
            .optional()
            .isLength({min : 5})
            .withMessage("Asenha precisa ter no mínimo 5 caracteres.")
    ]
}

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
}