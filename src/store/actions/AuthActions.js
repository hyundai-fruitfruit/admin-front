/**
 * @author 최성혁
 * @email [cinemay33@gmail.com]
 * @create date 2024-03-01 15:27:16
 * @modify date 2024-03-01 15:27:30
 * @desc 로그인 
 */
import {
    formatError,
    login,
    runLogoutTimer,
    saveTokenInLocalStorage,
    signUp,
} from '../../services/AuthService';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';  
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';
export const NAVTOGGLE = 'NAVTOGGLE';

export function signupAction(email, password, navigate) {	
    return (dispatch) => {
        signUp(email, password)
        .then((response) => {
            saveTokenInLocalStorage(response.data);
            runLogoutTimer(
                dispatch,
                response.data.expiresIn * 1000,
                //history,
            );
            dispatch(confirmedSignupAction(response.data));
            navigate('/dashboard');
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function Logout(navigate) {
	localStorage.removeItem('userDetails');
    navigate('/login');
    
	return {
        type: LOGOUT_ACTION,
    };
}

export function loginAction(email, password, navigate) {
    const mockData = {displayName: "", email: "demo@demo.com", expireDate: "2025-02-29T10:37:16.590Z", expiresIn: "3600", idToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImExODE4ZjQ0ODk0MjI1ZjQ2MWQyMmI1NjA4NDcyMDM3MTc2MGY1OWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcmVhY3QtY291cnNlLWI3OThlIiwiYXVkIjoicmVhY3QtY291cnNlLWI3OThlIiwiYXV0aF90aW1lIjoxNzA5MTk5NDM2LCJ1c2VyX2lkIjoiMmlRaFBzNGdPR1NvQlhRTnRGMmlQdmNLMHI3MyIsInN1YiI6IjJpUWhQczRnT0dTb0JYUU50RjJpUHZjSzByNzMiLCJpYXQiOjE3MDkxOTk0MzYsImV4cCI6MTcwOTIwMzAzNiwiZW1haWwiOiJkZW1vQGRlbW8uY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRlbW9AZGVtby5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.GPE61RkCq6KcFP4Y7bcaelY6-LBLTRYfEnKbdOkQhJpeEJfo1a_WRgenE2o_Le-yBMC9bBymwQ4b2PyX-FRbgDasIaUfhda2Ci-EhdwZy0DibB_jsgx7VYvg_XQ05ofu1KA8Ka157E0vYQf74qExDTCNWCbdw7J3qbPu4B3SJCwIt7XCrq7SVu_m1QovlUnx5ELYrhxg6CiFG0MFci1Uk5cy7aQPsH8LEPmPNdzZ8zlSu2OrEaxq0207N1oiiumm2WyU1ykS3jCkajAruKuYof63HGZe4gBY2CBlbGdclOIDuAvhS4eXi_hLaf865-06EwOXozGhT-ces99XI_lS6g", kind: "identitytoolkit#VerifyPasswordResponse", localId: "2iQhPs4gOGSoBXQNtF2iPvcK0r73", refreshToken:"AMf-vBxZRp6yyQ0cQrqQOuP6hrojlpDXZP-2_RHAFvdUuFctTGCqIZWzUOLhfyXdRRKQGF55w6CYvEMG-ZKTa9OdASxOftqu3zMAEZIDD8n_D2pizhqIPYrSW9-K5LRGhTt2YNm0GTA9uP-zXMbijM4l7NDSGDAkI9zr2Gypq1hL1RHrjjdOHWfxPI_h-D81WW0RBv50KTVknha6-cQflAQnjQInyrPEhg", registered: true}
    return (dispatch) => {
        saveTokenInLocalStorage(mockData);
                runLogoutTimer(
                    dispatch,
                    mockData.expiresIn * 1000,
                    navigate,
                );
                dispatch(loginConfirmedAction(mockData));			              
				navigate('/dashboard');     
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
export const navtoggle = () => {    
    return {        
      type: 'NAVTOGGLE',
    };
};