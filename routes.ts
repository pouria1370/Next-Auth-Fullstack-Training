/**
 * this is a public route for every unauthenticated
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/auth/new-reset-password",
]

/**
 * these are the routed for redirecting to setting
 * @type {string[]}
 */
export const authRotes = [
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/reset'
]

/**
 * this is a prefix route for authenticating
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth'



/**
 * this is a default for redirecting in login 
 * page
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/setting'