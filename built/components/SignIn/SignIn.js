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
    email: yup.string().email('Invalid email').required('Required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});
var SignIn = function () {
    return (<div>
      <formik_1.Formik initialValues={{
        email: '',
        password: ''
    }} validationSchema={validationSchema} onSubmit={function (data) {
        var email = data.email, password = data.password;
        try { // async?
            firebase_utils_1.auth.signInWithEmailAndPassword(email, password);
        }
        catch (error) {
            console.log(error);
        }
    }}>
        {function () { return (<>
            <p className="h3 text-center">I already have an account</p>
            <p className="h6 text-center my-3">Sign in with your email and password</p>

            <formik_1.Form className="w-100 d-flex flex-column justify-content-center">
              <div className="p-2">
                <FormikFunctions_1.MyTextField type="text" name="email" placeholder="email" as={core_1.TextField}/>
              </div>

              <div className="p-2">
                <FormikFunctions_1.MyTextField type="text" name="password" placeholder="password" as={core_1.TextField}/>
              </div>

              <div className="d-flex justify-content-between my-3 w-100">
                <reactstrap_1.Button type='submit' block className="text-center w-50 mr-2" color="primary">
                  Sign in
              </reactstrap_1.Button>
                <reactstrap_1.Button className="text-center w-50 ml-2" onClick={firebase_utils_1.signInWithGoogle}>
                  Sign in with Google
              </reactstrap_1.Button>
              </div>
            </formik_1.Form>
          </>); }}
      </formik_1.Formik>
    </div>);
};
exports.default = SignIn;
