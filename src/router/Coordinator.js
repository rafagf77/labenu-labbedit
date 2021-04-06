export const goToFeedPage = (history) => {
    history.push('/feed')
}

export const goToLoginPage = (history) => {
    history.push('/login')
}

export const goToPostPage = (history, id) => {
    history.push(`/post/${id}`)
}

export const goToSignUpPage = (history) => {
    history.push('/signup')
}