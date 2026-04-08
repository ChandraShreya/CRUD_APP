export  const endpoints={
    auth:{
        signIn:`/auth/login`,
        signUp : `/auth/register`,
        verifyOtp : `/auth/verify-otp`,
        updatePassword : `/auth/update-password`,
        resetEmail: `/auth/reset-password-link`,
        resetLink:`/auth/reset-password`,
        profileDetails:`/auth/profile`
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
    endpoints.product.delete,
    endpoints.auth.resetEmail,
    endpoints.auth.resetLink,
    endpoints.auth.updatePassword,
    endpoints.auth.profileDetails


]