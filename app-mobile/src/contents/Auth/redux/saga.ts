import loginSaga from '@contents/Auth/containers/Index/Login/redux/saga';
import registerSaga from '@contents/Auth/containers/EmployeeAuth/Register/redux/saga';
export default [...loginSaga, ...registerSaga];
