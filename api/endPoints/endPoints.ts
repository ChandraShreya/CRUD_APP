export  const endpoints={
    auth:{
        signIn:`/auth/login`,
        signUp : `/auth/register`,
        verifyOtp : `/auth/verify-otp`

    },
    product:{
        create:`/api/post/create`,
        list:`/api/post/list`,
        update:`/api/post/update`,
        delete:`/api/delete`

    }
}

export const points =[
    endpoints.auth.signIn,
    endpoints.auth.signUp,
    endpoints.auth.verifyOtp,
    endpoints.product.create,
    endpoints.product.list,
    endpoints.product.update,
    endpoints.product.delete


]