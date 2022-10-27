// 인수로 전달된 값을 type이 SET_MEMBER인 액션 객체에 담아 리턴하는 함수

/*
action = {
    type : 'SET_MEMBERS',
    payload : 전달된 값
}
 */

export const  setMembers = (member) => {
    return {
        type : 'SET_MEMBERS',
        payload : member
    }
}

export const setYoutube = (data) => {
    return {
        type : 'SET_YOUTUBE',
        payload : data
    }
}