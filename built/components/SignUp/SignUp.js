"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var FormikFunctions_1 = require("../../util/Formik/FormikFunctions");
var formik_1 = require("formik");
var yup = require("yup");
var core_1 = require("@material-ui/core");
var reactstrap_1 = require("reactstrap");
var firebase_utils_1 = require("../../firebase/firebase.utils");
var validationSchema = yup.object({
    displayName: yup.string().min(2, 'Too short').max(20, 'Too long').required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Required')
});
var SignUp = function () {
    return (<div>
      <formik_1.Formik initialValues={{
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }} validationSchema={validationSchema} onSubmit={function (data) {
        var displayName = data.displayName, email = data.email, password = data.password;
        try { // async?
            var user = firebase_utils_1.auth.createUserWithEmailAndPassword(email, password).user;
            firebase_utils_1.createUserProfileDocument(user, { displayName: displayName });
        }
        catch (error) {
            console.log(error);
        }
    }}>
        {function () { return (<>
            <p className="h3 text-center">I do not have an account</p>
            <p className="h6 text-center my-3">Sign up with your email and password</p>

            <formik_1.Form className="w-100 d-flex flex-column justify-content-center">
              <div className="p-2">
                <FormikFunctions_1.MyTextField type="text" name="displayName" placeholder="display name" as={core_1.TextField}/>
              </div>

              <div className="p-2">
                <FormikFunctions_1.MyTextField type="text" name="email" placeholder="email" as={core_1.TextField}/>
              </div>

              <div className="p-2">
                <FormikFunctions_1.MyTextField type="password" name="password" placeholder="password" as={core_1.TextField}/>
              </div>

              <div className="p-2">
                <FormikFunctions_1.MyTextField type="password" name="confirmPassword" placeholder="confirm password" as={core_1.TextField}/>
              </div>

              <reactstrap_1.Button type='submit' block className="d-flex justify-content-center my-3" color="primary">
                Sign up
                </reactstrap_1.Button>
            </formik_1.Form>
          </>); }}
      </formik_1.Formik>
    </div>);
};
exports.default = SignUp;
