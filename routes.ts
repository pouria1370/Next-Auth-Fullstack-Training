/**
 * this is a public route for every unauthenticated
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
]

/**
 * these are the routed for redirecting to setting
 * @type {string[]}
 */
export const authRotes = [
    '/auth/login',
    '/auth/register'
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