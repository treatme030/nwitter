const date = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    const now = '' + year + (month < 10 ? `0${month}` : month) + (day < 10 ? `0${day}` : day)
    return now;
}

export default date;